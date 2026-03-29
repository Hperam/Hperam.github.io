import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import OpenAI from "openai";

import catalog from "./src/data/catalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const HAS_OPENAI = Boolean(process.env.OPENAI_API_KEY);

const app = express();
const openai = HAS_OPENAI ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

app.use(express.json({ limit: "12mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    model: MODEL,
    aiEnabled: HAS_OPENAI,
    productCount: catalog.length
  });
});

app.get("/api/catalog", (_req, res) => {
  res.json({
    products: catalog
  });
});

app.post("/api/recommendations", async (req, res) => {
  try {
    const payload = normalizeRequest(req.body);
    const candidates = rankProducts(payload).slice(0, 6);

    if (candidates.length === 0) {
      return res.status(400).json({
        error: "Please add a clearer shopping request so I can match you with products."
      });
    }

    const groundedResponse = HAS_OPENAI
      ? await generateWithOpenAI(payload, candidates)
      : buildFallbackResponse(payload, candidates);

    res.json({
      ...groundedResponse,
      meta: {
        aiEnabled: HAS_OPENAI,
        model: MODEL,
        candidateIds: candidates.map((item) => item.id)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Something went wrong while generating recommendations. Please try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Commerce Copilot running at http://localhost:${PORT}`);
});

function normalizeRequest(body = {}) {
  const query = String(body.query || "").trim();
  const budgetMax =
    body.budgetMax === null || body.budgetMax === undefined || body.budgetMax === ""
      ? null
      : Number(body.budgetMax);
  const preferredCategories = Array.isArray(body.preferredCategories)
    ? body.preferredCategories.map((value) => String(value).trim()).filter(Boolean)
    : [];
  const imageDataUrl = typeof body.imageDataUrl === "string" ? body.imageDataUrl : "";
  const imageName = typeof body.imageName === "string" ? body.imageName : "";
  const transcript = typeof body.transcript === "string" ? body.transcript.trim() : "";

  const combinedQuery = [query, transcript].filter(Boolean).join(". ").trim();

  if (!combinedQuery) {
    throw new Error("Missing query");
  }

  return {
    query: combinedQuery,
    budgetMax,
    preferredCategories,
    imageDataUrl,
    imageName,
    transcript
  };
}

function rankProducts({ query, budgetMax, preferredCategories }) {
  const queryTokens = tokenize(query);
  const categorySet = new Set(preferredCategories.map((item) => item.toLowerCase()));

  return catalog
    .map((product) => {
      const haystack = tokenize(
        [
          product.name,
          product.brand,
          product.category,
          product.summary,
          product.tags.join(" "),
          product.useCases.join(" "),
          product.highlights.join(" ")
        ].join(" ")
      );

      let score = overlapScore(queryTokens, haystack);

      if (categorySet.size > 0 && categorySet.has(product.category.toLowerCase())) {
        score += 35;
      } else if (categorySet.size > 0) {
        score -= 24;
      }

      if (budgetMax !== null) {
        if (product.price <= budgetMax) {
          score += 20;
        } else {
          const overage = product.price - budgetMax;
          score -= Math.min(22, Math.round(overage / 40));
        }
      }

      if (query.toLowerCase().includes("cheap") || query.toLowerCase().includes("budget")) {
        score += Math.max(0, 16 - Math.round(product.price / 100));
      }

      if (query.toLowerCase().includes("premium") || query.toLowerCase().includes("best")) {
        score += Math.min(14, Math.round(product.rating * 3));
      }

      return {
        ...product,
        retrievalScore: score
      };
    })
    .sort((a, b) => b.retrievalScore - a.retrievalScore);
}

function tokenize(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((item) => item.length > 1);
}

function overlapScore(queryTokens, haystackTokens) {
  const haystack = new Set(haystackTokens);
  return queryTokens.reduce((total, token) => total + (haystack.has(token) ? 10 : 0), 0);
}

async function generateWithOpenAI(payload, candidates) {
  const schema = {
    type: "object",
    additionalProperties: false,
    required: [
      "headline",
      "summary",
      "imageInsights",
      "recommendations",
      "followUpQuestions",
      "shareCard"
    ],
    properties: {
      headline: { type: "string" },
      summary: { type: "string" },
      imageInsights: {
        type: "array",
        items: { type: "string" }
      },
      recommendations: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "productId",
            "matchLabel",
            "reason",
            "tradeoff",
            "bestFor"
          ],
          properties: {
            productId: { type: "string", enum: candidates.map((item) => item.id) },
            matchLabel: { type: "string" },
            reason: { type: "string" },
            tradeoff: { type: "string" },
            bestFor: { type: "string" }
          }
        }
      },
      followUpQuestions: {
        type: "array",
        items: { type: "string" }
      },
      shareCard: {
        type: "object",
        additionalProperties: false,
        required: ["title", "bullets", "cta"],
        properties: {
          title: { type: "string" },
          bullets: {
            type: "array",
            items: { type: "string" }
          },
          cta: { type: "string" }
        }
      }
    }
  };

  const content = [
    {
      type: "input_text",
      text: [
        "You are Commerce Copilot, an honest shopping assistant.",
        "Return JSON only.",
        "Ground every recommendation in the provided catalog candidates.",
        "Never invent products or specs.",
        "If the image suggests a style or form factor, use it only as a soft cue."
      ].join(" ")
    }
  ];

  if (payload.imageDataUrl) {
    content.push({
      type: "input_image",
      image_url: payload.imageDataUrl,
      detail: "low"
    });
  }

  content.push({
    type: "input_text",
    text: JSON.stringify(
      {
        shopperRequest: payload.query,
        budgetMax: payload.budgetMax,
        preferredCategories: payload.preferredCategories,
        imageName: payload.imageName,
        candidates: candidates.map((item) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          category: item.category,
          price: item.price,
          rating: item.rating,
          summary: item.summary,
          highlights: item.highlights,
          tags: item.tags,
          useCases: item.useCases
        }))
      },
      null,
      2
    )
  });

  const response = await openai.responses.create({
    model: MODEL,
    input: [
      {
        role: "user",
        content
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "commerce_copilot_response",
        strict: true,
        schema
      }
    }
  });

  const parsed = JSON.parse(response.output_text);

  return {
    ...parsed,
      recommendations: parsed.recommendations.map((recommendation) => {
        const product = candidates.find((item) => item.id === recommendation.productId) || null;
        return {
          ...recommendation,
          product
        };
      })
  };
}

function buildFallbackResponse(payload, candidates) {
  const scoreFloor = Math.max((candidates[0]?.retrievalScore || 0) - 45, 40);
  const top = candidates.filter((product) => product.retrievalScore >= scoreFloor).slice(0, 3);

  return {
    headline: "Grounded recommendations from your curated catalog",
    summary:
      "AI mode is currently off, so these recommendations are based on product metadata, category fit, and your budget or preference signals.",
    imageInsights: payload.imageDataUrl
      ? [
          "Image-aware reasoning is available after setting OPENAI_API_KEY.",
          "Your uploaded image is saved only in browser memory for the current request."
        ]
      : [
          "Add an image to help the app infer style, form factor, or product category.",
          "You can also use voice input for more natural shopping prompts."
        ],
    recommendations: top.map((product, index) => ({
      productId: product.id,
      matchLabel: index === 0 ? "Best match" : index === 1 ? "Balanced pick" : "Worth a look",
      reason: buildFallbackReason(payload, product),
      tradeoff: buildFallbackTradeoff(payload, product),
      bestFor: product.useCases[0],
      product
    })),
    followUpQuestions: [
      "Do you want lighter, cheaper, or more premium options?",
      "Should I narrow this down by category, travel use, or battery life?",
      "Do you want accessories or alternatives that complement the top pick?"
    ],
    shareCard: {
      title: `Top pick: ${top[0]?.name || "Catalog recommendation"}`,
      bullets: top.slice(0, 3).map((item) => `${item.name} at $${item.price}`),
      cta: "Set OPENAI_API_KEY to unlock multimodal AI reasoning."
    }
  };
}

function buildFallbackReason(payload, product) {
  const reasons = [
    `${product.name} aligns with your request for ${product.tags.slice(0, 2).join(" and ")}.`,
    `${product.brand} positions this as a strong ${product.category.toLowerCase()} option for ${product.useCases[0]}.`
  ];

  if (payload.budgetMax !== null && product.price <= payload.budgetMax) {
    reasons.push(`It stays within your stated budget of $${payload.budgetMax}.`);
  }

  return reasons.join(" ");
}

function buildFallbackTradeoff(payload, product) {
  if (payload.budgetMax !== null && product.price > payload.budgetMax) {
    return `It is above your target budget by $${product.price - payload.budgetMax}.`;
  }

  return `Compared with cheaper alternatives, you are paying for ${product.highlights[0].toLowerCase()}.`;
}
