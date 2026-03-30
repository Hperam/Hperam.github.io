const SESSION_KEY = "commerceCopilotApiKey";
const OPENAI_MODEL = "gpt-4.1-mini";

const state = {
  apiKey: sessionStorage.getItem(SESSION_KEY) || "",
  catalog: [],
  selectedCategories: new Set(),
  imageDataUrl: "",
  imageName: "",
  lastResponse: null,
  transcript: ""
};

const elements = {
  apiKeyInput: document.querySelector("#apiKeyInput"),
  saveKeyButton: document.querySelector("#saveKeyButton"),
  clearKeyButton: document.querySelector("#clearKeyButton"),
  sessionKeyStatus: document.querySelector("#sessionKeyStatus"),
  catalogGrid: document.querySelector("#catalogGrid"),
  categoryChips: document.querySelector("#categoryChips"),
  recommendationForm: document.querySelector("#recommendationForm"),
  queryInput: document.querySelector("#queryInput"),
  budgetInput: document.querySelector("#budgetInput"),
  imageInput: document.querySelector("#imageInput"),
  imagePreview: document.querySelector("#imagePreview"),
  previewImage: document.querySelector("#previewImage"),
  previewName: document.querySelector("#previewName"),
  clearImageButton: document.querySelector("#clearImageButton"),
  voiceButton: document.querySelector("#voiceButton"),
  submitButton: document.querySelector("#submitButton"),
  resultsCard: document.querySelector("#resultsCard"),
  resultsState: document.querySelector("#resultsState"),
  resultsContent: document.querySelector("#resultsContent"),
  healthBanner: document.querySelector("#healthBanner"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  sampleButtons: [...document.querySelectorAll("[data-sample]")]
};

let recognition = null;
let isListening = false;

bootstrap().catch((error) => {
  console.error(error);
  elements.healthBanner.textContent =
    "Unable to load the product catalog right now.";
});

async function bootstrap() {
  bindEvents();
  setupSpeechRecognition();

  const catalogResponse = await fetchJson("./catalog.json");
  state.catalog = catalogResponse;

  renderCategoryChips();
  renderCatalog();
  renderSecurityState();
}

function bindEvents() {
  elements.recommendationForm.addEventListener("submit", handleSubmit);
  elements.imageInput.addEventListener("change", handleImageSelection);
  elements.clearImageButton.addEventListener("click", clearImageSelection);
  elements.copySummaryButton.addEventListener("click", copySummary);
  elements.voiceButton.addEventListener("click", toggleVoiceCapture);
  elements.saveKeyButton.addEventListener("click", saveSessionKey);
  elements.clearKeyButton.addEventListener("click", clearSessionKey);

  elements.sampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      elements.queryInput.value = button.dataset.sample || "";
      elements.queryInput.focus();
    });
  });
}

function setupSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    elements.voiceButton.disabled = true;
    elements.voiceButton.textContent = "Voice unavailable";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("result", (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript?.trim() || "";
    if (!transcript) {
      return;
    }

    state.transcript = transcript;
    elements.queryInput.value = elements.queryInput.value
      ? `${elements.queryInput.value.trim()} ${transcript}`
      : transcript;
  });

  recognition.addEventListener("end", () => {
    isListening = false;
    updateVoiceButton();
  });

  recognition.addEventListener("error", () => {
    isListening = false;
    updateVoiceButton();
  });
}

async function handleSubmit(event) {
  event.preventDefault();

  const query = elements.queryInput.value.trim();
  if (!query) {
    elements.queryInput.focus();
    return;
  }

  setLoading(true);

  try {
    const payload = {
      query,
      budgetMax: elements.budgetInput.value ? Number(elements.budgetInput.value) : null,
      preferredCategories: [...state.selectedCategories],
      imageDataUrl: state.imageDataUrl,
      imageName: state.imageName,
      transcript: state.transcript
    };

    const candidates = rankProducts(payload).slice(0, 6);

    if (candidates.length === 0) {
      throw new Error("Try a more specific request so I can match products.");
    }

    const response = state.apiKey
      ? await generateWithOpenAI(payload, candidates)
      : buildFallbackResponse(payload, candidates);

    state.lastResponse = response;
    renderResults(response);
  } catch (error) {
    console.error(error);
    elements.resultsState.textContent =
      error.message || "Something went wrong while fetching recommendations.";
    elements.resultsState.classList.remove("hidden");
    elements.resultsContent.classList.add("hidden");
    elements.copySummaryButton.disabled = true;
  } finally {
    setLoading(false);
  }
}

async function handleImageSelection(event) {
  const file = event.target.files?.[0];
  if (!file) {
    clearImageSelection();
    return;
  }

  state.imageDataUrl = await fileToDataUrl(file);
  state.imageName = file.name;

  elements.previewImage.src = state.imageDataUrl;
  elements.previewName.textContent = file.name;
  elements.imagePreview.classList.remove("hidden");
}

function clearImageSelection() {
  state.imageDataUrl = "";
  state.imageName = "";
  elements.imageInput.value = "";
  elements.imagePreview.classList.add("hidden");
}

function saveSessionKey() {
  const value = elements.apiKeyInput.value.trim();
  if (!value) {
    return;
  }

  state.apiKey = value;
  sessionStorage.setItem(SESSION_KEY, value);
  elements.apiKeyInput.value = "";
  renderSecurityState();
}

function clearSessionKey() {
  state.apiKey = "";
  sessionStorage.removeItem(SESSION_KEY);
  elements.apiKeyInput.value = "";
  renderSecurityState();
}

function renderSecurityState() {
  const hasKey = Boolean(state.apiKey);

  elements.healthBanner.innerHTML = hasKey
    ? "<strong>AI mode is active.</strong> Your key is stored only for this tab session and sent directly to OpenAI when you request recommendations."
    : "<strong>Catalog mode is active.</strong> Add a key for this tab to enable OpenAI-powered multimodal reasoning.";

  elements.sessionKeyStatus.textContent = hasKey
    ? "Session key loaded. It will be forgotten when this tab session ends or when you click Forget key."
    : "No key loaded for this tab yet.";
}

function toggleVoiceCapture() {
  if (!recognition) {
    return;
  }

  if (isListening) {
    recognition.stop();
    return;
  }

  state.transcript = "";
  isListening = true;
  updateVoiceButton();
  recognition.start();
}

function updateVoiceButton() {
  elements.voiceButton.textContent = isListening
    ? "Listening..."
    : "Start voice input";
}

function renderCategoryChips() {
  const categories = [...new Set(state.catalog.map((product) => product.category))];

  elements.categoryChips.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.textContent = category;
    button.addEventListener("click", () => {
      if (state.selectedCategories.has(category)) {
        state.selectedCategories.delete(category);
        button.classList.remove("is-selected");
      } else {
        state.selectedCategories.add(category);
        button.classList.add("is-selected");
      }
    });
    elements.categoryChips.appendChild(button);
  });
}

function renderCatalog() {
  elements.catalogGrid.innerHTML = state.catalog
    .map(
      (product) => `
        <article class="product-card">
          <p class="product-category">${escapeHtml(product.category)}</p>
          <h4>${escapeHtml(product.name)}</h4>
          <p>${escapeHtml(product.summary)}</p>
          <div class="product-price-row">
            <span class="price-pill">$${product.price}</span>
            <span class="rating">★ ${product.rating}</span>
          </div>
          <ul class="product-points">
            ${product.highlights
              .slice(0, 3)
              .map((point) => `<li>${escapeHtml(point)}</li>`)
              .join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderResults(response) {
  const summaryBullets = response.shareCard?.bullets || [];
  const followUps = response.followUpQuestions || [];
  const imageInsights = response.imageInsights || [];
  const recommendations = response.recommendations || [];

  elements.resultsState.classList.add("hidden");
  elements.resultsContent.classList.remove("hidden");
  elements.copySummaryButton.disabled = false;

  elements.resultsContent.innerHTML = `
    <section class="summary-panel">
      <p class="eyebrow">Overview</p>
      <h4>${escapeHtml(response.headline)}</h4>
      <p class="summary-copy">${escapeHtml(response.summary)}</p>
    </section>

    <section class="insights-panel">
      <h4>Image and context insights</h4>
      <ul class="insight-list">
        ${imageInsights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>

    <section class="recommendations-grid">
      ${recommendations.map(renderRecommendationCard).join("")}
    </section>

    <section class="share-card">
      <div class="share-card-header">
        <div>
          <p class="eyebrow">Share card</p>
          <h4>${escapeHtml(response.shareCard.title)}</h4>
        </div>
        <span class="feature-pill">${response.meta?.aiEnabled ? "AI mode" : "Catalog mode"}</span>
      </div>
      <ul class="share-list">
        ${summaryBullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <p>${escapeHtml(response.shareCard.cta)}</p>
    </section>

    <section class="insights-panel">
      <h4>Suggested follow-ups</h4>
      <ul class="followup-list">
        ${followUps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderRecommendationCard(recommendation) {
  const product = recommendation.product || {};
  const highlights = product.highlights || [];

  return `
    <article class="recommendation-card">
      <div class="recommendation-topline">
        <span class="recommendation-badge">${escapeHtml(recommendation.matchLabel)}</span>
        <span class="price-pill">$${product.price ?? "?"}</span>
      </div>
      <h4>${escapeHtml(product.name || recommendation.productId)}</h4>
      <p>${escapeHtml(product.summary || "")}</p>
      <div class="recommendation-meta">
        <span class="feature-pill">${escapeHtml(product.brand || "Catalog item")}</span>
        <span class="feature-pill">${escapeHtml(product.category || "Product")}</span>
        ${highlights
          .slice(0, 2)
          .map((item) => `<span class="feature-pill">${escapeHtml(item)}</span>`)
          .join("")}
      </div>
      <p><strong>Why it fits:</strong> ${escapeHtml(recommendation.reason)}</p>
      <p class="tradeoff"><strong>Tradeoff:</strong> ${escapeHtml(recommendation.tradeoff)}</p>
      <p><strong>Best for:</strong> ${escapeHtml(recommendation.bestFor)}</p>
    </article>
  `;
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
          required: ["productId", "matchLabel", "reason", "tradeoff", "bestFor"],
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

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.apiKey}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
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
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI request failed");
  }

  const parsed = JSON.parse(extractOutputText(data));

  return {
    ...parsed,
    recommendations: parsed.recommendations.map((recommendation) => {
      const product = candidates.find((item) => item.id === recommendation.productId) || null;
      return {
        ...recommendation,
        product
      };
    }),
    meta: {
      aiEnabled: true,
      model: OPENAI_MODEL
    }
  };
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text) {
    return data.output_text;
  }

  const messageText = data.output
    ?.flatMap((item) => item.content || [])
    ?.find((item) => item.type === "output_text")?.text;

  if (!messageText) {
    throw new Error("Model response did not include output text.");
  }

  return messageText;
}

function rankProducts({ query, budgetMax, preferredCategories }) {
  const queryTokens = tokenize(query);
  const categorySet = new Set(preferredCategories.map((item) => item.toLowerCase()));

  return state.catalog
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

function buildFallbackResponse(payload, candidates) {
  const scoreFloor = Math.max((candidates[0]?.retrievalScore || 0) - 45, 40);
  const top = candidates.filter((product) => product.retrievalScore >= scoreFloor).slice(0, 3);

  return {
    headline: "Grounded recommendations from your curated catalog",
    summary:
      "AI mode is currently off, so these recommendations are based on product metadata, category fit, and your budget or preference signals.",
    imageInsights: payload.imageDataUrl
      ? [
          "An image was uploaded, but image-aware AI reasoning is only used after you load a session key.",
          "Your uploaded image stays in browser memory for the current tab session."
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
      cta: "Load a session key to unlock multimodal AI reasoning in this tab."
    },
    meta: {
      aiEnabled: false,
      model: "catalog-only"
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

async function copySummary() {
  if (!state.lastResponse || !navigator.clipboard) {
    return;
  }

  const text = [
    state.lastResponse.shareCard.title,
    ...state.lastResponse.shareCard.bullets,
    state.lastResponse.shareCard.cta
  ].join("\n");

  await navigator.clipboard.writeText(text);
  elements.copySummaryButton.textContent = "Copied";
  window.setTimeout(() => {
    elements.copySummaryButton.textContent = "Copy summary";
  }, 1400);
}

function setLoading(isLoading) {
  elements.submitButton.disabled = isLoading;
  elements.submitButton.textContent = isLoading
    ? "Generating..."
    : "Get recommendations";
  elements.resultsCard.classList.toggle("loading", isLoading);
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
