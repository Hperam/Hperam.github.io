const SESSION_KEY = "commerceCopilotApiKey";
const OPENAI_MODEL = "gpt-4.1-mini";

const state = {
  apiKey: sessionStorage.getItem(SESSION_KEY) || "",
  catalog: [],
  mode: "text",
  selectedCategories: new Set(),
  imageDataUrl: "",
  imageName: "",
  lastResponse: null,
  lastCandidates: [],
  transcript: ""
};

const elements = {
  apiKeyInput: document.querySelector("#apiKeyInput"),
  saveKeyButton: document.querySelector("#saveKeyButton"),
  clearKeyButton: document.querySelector("#clearKeyButton"),
  sessionKeyStatus: document.querySelector("#sessionKeyStatus"),
  sessionBanner: document.querySelector("#sessionBanner"),
  sessionModeBadge: document.querySelector("#sessionModeBadge"),
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
  voiceTranscript: document.querySelector("#voiceTranscript"),
  submitButton: document.querySelector("#submitButton"),
  candidateState: document.querySelector("#candidateState"),
  candidateGrid: document.querySelector("#candidateGrid"),
  retrievalMeta: document.querySelector("#retrievalMeta"),
  recommendationState: document.querySelector("#recommendationState"),
  recommendationContent: document.querySelector("#recommendationContent"),
  resultsCard: document.querySelector("#resultsCard"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  sampleButtons: [...document.querySelectorAll("[data-sample]")],
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  modePanels: [...document.querySelectorAll("[data-mode-panel]")],
  modeHelper: document.querySelector("#modeHelper"),
  pipelineSteps: [...document.querySelectorAll("[data-pipeline-step]")],
  architectureModal: document.querySelector("#architectureModal"),
  openArchitectureButtons: [
    document.querySelector("#openArchitectureTop"),
    document.querySelector("#openArchitectureWorkspace")
  ].filter(Boolean),
  closeArchitectureButton: document.querySelector("#closeArchitecture")
};

let recognition = null;
let isListening = false;

bootstrap().catch((error) => {
  console.error(error);
  elements.sessionBanner.textContent =
    "Unable to load the product catalog right now.";
});

async function bootstrap() {
  bindEvents();
  setupSpeechRecognition();

  state.catalog = await fetchJson("./catalog.json");

  renderCategoryChips();
  renderSessionState();
  renderModeState();
  renderEmptyCandidateState();
  renderEmptyRecommendationState();
  setPipelineStage("input");

  if (window.location.hash === "#architecture") {
    openArchitectureModal();
  }
}

function bindEvents() {
  elements.recommendationForm.addEventListener("submit", handleSubmit);
  elements.imageInput.addEventListener("change", handleImageSelection);
  elements.clearImageButton.addEventListener("click", clearImageSelection);
  elements.copySummaryButton.addEventListener("click", copySummary);
  elements.saveKeyButton.addEventListener("click", saveSessionKey);
  elements.clearKeyButton.addEventListener("click", clearSessionKey);
  elements.recommendationContent.addEventListener("click", handleRecommendationActions);

  elements.sampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      elements.queryInput.value = button.dataset.sample || "";
      setMode(button.textContent.toLowerCase().includes("image") ? "image" : "text");
      elements.queryInput.focus();
      window.scrollTo({ top: elements.queryInput.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
    });
  });

  elements.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      if (mode) {
        setMode(mode);
      }
    });
  });

  if (elements.voiceButton) {
    elements.voiceButton.addEventListener("click", toggleVoiceCapture);
  }

  elements.openArchitectureButtons.forEach((button) => {
    button.addEventListener("click", openArchitectureModal);
  });

  elements.closeArchitectureButton?.addEventListener("click", closeArchitectureModal);
  elements.architectureModal?.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
      closeArchitectureModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeArchitectureModal();
    }
  });
}

function setupSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition || !elements.voiceButton) {
    if (elements.voiceButton) {
      elements.voiceButton.disabled = true;
      elements.voiceButton.textContent = "Voice unavailable";
    }
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("result", (event) => {
    const transcript = Array.from(event.results)
      .map((item) => item[0]?.transcript || "")
      .join(" ")
      .trim();

    state.transcript = transcript;
    renderVoiceTranscript();

    if (!event.results[event.results.length - 1]?.isFinal) {
      return;
    }

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

function setMode(mode) {
  state.mode = mode;
  renderModeState();
}

function renderModeState() {
  const copyByMode = {
    text:
      "Type a request and Commerce Copilot will translate it into a grounded retrieval intent.",
    voice:
      "Capture natural speech, then blend it with text filters before candidate retrieval.",
    image:
      "Use an uploaded image plus a short prompt to simulate style-aware multimodal discovery."
  };

  elements.modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });

  elements.modePanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.modePanel !== state.mode);
  });

  elements.modeHelper.textContent = copyByMode[state.mode] || copyByMode.text;
}

function renderVoiceTranscript() {
  if (!elements.voiceTranscript) {
    return;
  }

  const text = state.transcript || "No transcript captured yet.";
  elements.voiceTranscript.textContent = text;
  elements.voiceTranscript.classList.toggle("is-live", Boolean(state.transcript));
}

function saveSessionKey() {
  const value = elements.apiKeyInput.value.trim();
  if (!value) {
    elements.apiKeyInput.focus();
    return;
  }

  state.apiKey = value;
  sessionStorage.setItem(SESSION_KEY, value);
  elements.apiKeyInput.value = "";
  renderSessionState();
}

function clearSessionKey() {
  state.apiKey = "";
  sessionStorage.removeItem(SESSION_KEY);
  elements.apiKeyInput.value = "";
  renderSessionState();
}

function renderSessionState() {
  const hasKey = Boolean(state.apiKey);

  elements.sessionBanner.className = `session-banner${hasKey ? "" : " is-catalog"}`;
  elements.sessionModeBadge.className = `mode-pill${hasKey ? " is-ai" : ""}`;
  elements.sessionModeBadge.textContent = hasKey ? "AI mode" : "Catalog mode";

  elements.sessionBanner.innerHTML = hasKey
    ? "<strong>AI mode is active.</strong> Your API key is used only for this live session in your browser and is not saved by this demo."
    : "<strong>Catalog mode is active.</strong> You can still search, rank, and inspect grounded candidates without enabling AI.";

  elements.sessionKeyStatus.textContent = hasKey
    ? "Session key loaded. It will be cleared when this tab session ends or when you click Clear session."
    : "Your API key is used only for this live session in your browser and is not saved by this demo.";
}

async function handleSubmit(event) {
  event.preventDefault();

  const query = elements.queryInput.value.trim();
  if (!query && !state.imageDataUrl && !state.transcript) {
    elements.queryInput.focus();
    return;
  }

  setLoading(true);
  setPipelineStage("retrieval");

  try {
    const payload = {
      mode: state.mode,
      query,
      budgetMax: elements.budgetInput.value ? Number(elements.budgetInput.value) : null,
      preferredCategories: [...state.selectedCategories],
      imageDataUrl: state.imageDataUrl,
      imageName: state.imageName,
      transcript: state.transcript
    };

    const intent = deriveIntent(payload);
    const candidates = rankProducts(payload, intent).slice(0, 6);

    if (!candidates.length) {
      throw new Error("Try a more specific request so the retrieval stage can rank better matches.");
    }

    state.lastCandidates = candidates;
    renderCandidates(candidates, payload, intent);
    setPipelineStage("grounded");

    const response = state.apiKey
      ? await generateWithOpenAI(payload, intent, candidates)
      : buildCatalogPreview(payload, intent, candidates);

    state.lastResponse = response;
    renderRecommendationPanel(response, candidates, payload, intent);
    setPipelineStage("summary");
  } catch (error) {
    console.error(error);
    renderRecommendationError(error.message || "Something went wrong while generating recommendations.");
  } finally {
    setLoading(false);
  }
}

function deriveIntent(payload) {
  const combinedQuery = [payload.query, payload.transcript, payload.imageName]
    .filter(Boolean)
    .join(" ");

  const tokens = tokenize(combinedQuery);
  const wantsBudget = tokens.some((token) =>
    ["budget", "cheap", "value", "under", "affordable"].includes(token)
  );
  const wantsPremium = tokens.some((token) =>
    ["premium", "luxury", "best", "flagship", "high", "pro"].includes(token)
  );
  const wantsTravel = tokens.includes("travel") || tokens.includes("trip");

  return {
    combinedQuery,
    tokens,
    wantsBudget,
    wantsPremium,
    wantsTravel,
    categories: payload.preferredCategories
  };
}

function rankProducts(payload, intent) {
  const categorySet = new Set(intent.categories.map((item) => item.toLowerCase()));

  return state.catalog
    .map((product) => {
      const fields = [
        product.name,
        product.title,
        product.brand,
        product.category,
        product.summary,
        product.description,
        product.tags.join(" "),
        product.useCases.join(" "),
        product.attributes.join(" "),
        product.highlights.join(" ")
      ].join(" ");

      const haystackTokens = tokenize(fields);
      const haystackSet = new Set(haystackTokens);
      const matchedTerms = intent.tokens.filter((token) => haystackSet.has(token));

      let score = overlapScore(intent.tokens, haystackTokens);

      if (categorySet.size > 0 && categorySet.has(product.category.toLowerCase())) {
        score += 24;
      } else if (categorySet.size > 0) {
        score -= 12;
      }

      if (payload.budgetMax !== null) {
        if (product.price <= payload.budgetMax) {
          score += 16;
        } else {
          score -= Math.min(20, Math.round((product.price - payload.budgetMax) / 35));
        }
      }

      if (intent.wantsBudget) {
        score += Math.max(0, 18 - Math.round(product.price / 90));
      }

      if (intent.wantsPremium) {
        score += Math.round(product.rating * 3) + Math.min(8, Math.round(product.price / 250));
      }

      if (intent.wantsTravel && haystackSet.has("travel")) {
        score += 10;
      }

      if (payload.mode === "voice") {
        score += 2;
      }

      if (payload.mode === "image" && payload.imageName) {
        score += imageNameBoost(payload.imageName, product);
      }

      score += Math.round(product.rating * 4);

      return {
        ...product,
        retrievalScore: score,
        matchedTerms: [...new Set(matchedTerms)].slice(0, 4)
      };
    })
    .sort((a, b) => b.retrievalScore - a.retrievalScore)
    .map((product, index, list) => {
      const topScore = list[0]?.retrievalScore || 1;
      const normalized = Math.max(
        42,
        Math.min(97, Math.round((product.retrievalScore / topScore) * 100))
      );

      return {
        ...product,
        relevance: normalized,
        rank: index + 1
      };
    });
}

function imageNameBoost(imageName, product) {
  const imageTokens = tokenize(imageName);
  const productTokens = tokenize(
    [product.name, product.category, product.tags.join(" "), product.attributes.join(" ")].join(" ")
  );
  return overlapScore(imageTokens, productTokens) / 2;
}

function renderCandidates(candidates, payload, intent) {
  elements.candidateState.classList.add("hidden");
  elements.candidateGrid.classList.remove("hidden");

  const queryLabel =
    payload.query || payload.transcript || payload.imageName || "the current request";
  elements.retrievalMeta.innerHTML = `
    <strong>Grounded retrieval ready.</strong> Ranked ${candidates.length} catalog candidates for
    <span class="retrieval-query">${escapeHtml(queryLabel)}</span>${payload.budgetMax ? ` under $${payload.budgetMax}` : ""}.
  `;

  elements.candidateGrid.innerHTML = candidates
    .map(
      (product) => `
        <article class="candidate-card">
          <div class="candidate-top">
            ${renderProductVisual(product)}
            <div>
              <div class="pick-card-top">
                <span class="candidate-badge">#${product.rank} grounded</span>
                <span class="score-pill">${product.relevance}% match</span>
              </div>
              <h4 class="candidate-title">${escapeHtml(product.name)}</h4>
              <p class="candidate-summary">${escapeHtml(product.summary)}</p>
            </div>
          </div>

          <div class="candidate-meta">
            <span class="feature-pill">${escapeHtml(product.brand)}</span>
            <span class="feature-pill">${escapeHtml(product.category)}</span>
            <span class="feature-pill">$${product.price} · ★ ${product.rating}</span>
          </div>

          <div class="candidate-attribute-row">
            ${product.matchedTerms.length
              ? product.matchedTerms
                  .map((term) => `<span class="match-chip">Matched: ${escapeHtml(term)}</span>`)
                  .join("")
              : `<span class="match-chip">Mode: ${escapeHtml(intent.combinedQuery ? state.mode : "catalog")}</span>`}
          </div>

          <p class="candidate-description">${escapeHtml(product.description)}</p>
        </article>
      `
    )
    .join("");
}

function buildCatalogPreview(payload, intent, candidates) {
  const overall = candidates[0] || null;
  const runnerUp = candidates[1] || overall;
  const budgetPool =
    payload.budgetMax !== null
      ? candidates.filter((product) => product.price <= payload.budgetMax)
      : candidates;
  const budgetPick =
    budgetPool.sort((a, b) => a.price - b.price)[0] || candidates[0] || null;
  const premiumPick =
    [...candidates].sort((a, b) => b.rating - a.rating || b.price - a.price)[0] || overall;

  return {
    headline: "Grounded candidates are ready",
    intentSummary:
      "Catalog mode ranks products locally using query overlap, category fit, budget signals, and metadata relevance.",
    confidenceNote:
      "AI reasoning is locked until the user enables a session key for this tab.",
    bestOverallId: overall?.id || "",
    runnerUpId: runnerUp?.id || "",
    budgetPickId: budgetPick?.id || "",
    premiumPickId: premiumPick?.id || "",
    whyTheseMatch: [
      `The shortlist is grounded in ${candidates.length} retrieved catalog items rather than model invention.`,
      payload.budgetMax !== null
        ? `Budget awareness is applied before ranking so over-budget products are penalized.`
        : `Without a budget cap, ranking leans on category fit, tags, use cases, and retrieval overlap.`,
      payload.imageDataUrl
        ? `Your uploaded image is treated as a browser-only cue and is not stored outside the current session.`
        : `Add an image or voice input next to make the multimodal pipeline stronger.`
    ],
    tradeoffs: [
      {
        dimension: "Price",
        winnerId: budgetPick?.id || overall?.id || "",
        note: "Best value usually trades away premium materials or flagship specs."
      },
      {
        dimension: "Performance",
        winnerId: premiumPick?.id || overall?.id || "",
        note: "Higher-performing options often cost more or prioritize capability over portability."
      },
      {
        dimension: "Versatility",
        winnerId: overall?.id || "",
        note: "The best overall pick balances intent fit, metadata strength, and broad day-to-day usefulness."
      }
    ],
    shareSummary: buildShareSummary(payload, overall, runnerUp, budgetPick),
    followUpQuestions: [
      "Do you want lighter, cheaper, or more premium alternatives?",
      "Should I narrow the shortlist by travel, desk setup, battery life, or design?",
      "Would you like a similar option from another category or brand?"
    ],
    meta: {
      aiEnabled: false
    }
  };
}

async function generateWithOpenAI(payload, intent, candidates) {
  setPipelineStage("reasoning");

  const candidateIds = candidates.map((item) => item.id);
  const schema = {
    type: "object",
    additionalProperties: false,
    required: [
      "headline",
      "intentSummary",
      "confidenceNote",
      "bestOverallId",
      "runnerUpId",
      "budgetPickId",
      "premiumPickId",
      "whyTheseMatch",
      "tradeoffs",
      "shareSummary",
      "followUpQuestions"
    ],
    properties: {
      headline: { type: "string" },
      intentSummary: { type: "string" },
      confidenceNote: { type: "string" },
      bestOverallId: { type: "string", enum: candidateIds },
      runnerUpId: { type: "string", enum: candidateIds },
      budgetPickId: { type: "string", enum: candidateIds },
      premiumPickId: { type: "string", enum: ["", ...candidateIds] },
      whyTheseMatch: {
        type: "array",
        items: { type: "string" }
      },
      tradeoffs: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["dimension", "winnerId", "note"],
          properties: {
            dimension: { type: "string" },
            winnerId: { type: "string", enum: candidateIds },
            note: { type: "string" }
          }
        }
      },
      shareSummary: { type: "string" },
      followUpQuestions: {
        type: "array",
        items: { type: "string" }
      }
    }
  };

  const content = [
    {
      type: "input_text",
      text: [
        "You are Commerce Copilot, an honest multimodal commerce assistant.",
        "Return JSON only.",
        "Recommend only from the provided candidates.",
        "Do not invent products, prices, specs, or capabilities.",
        "Explain tradeoffs with concrete reasoning from the candidate metadata.",
        "If premiumPickId is not relevant, return an empty string."
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
        userIntent: payload.query || payload.transcript || payload.imageName,
        mode: payload.mode,
        transcript: payload.transcript,
        imageName: payload.imageName,
        budgetMax: payload.budgetMax,
        preferredCategories: payload.preferredCategories,
        hints: {
          wantsBudget: intent.wantsBudget,
          wantsPremium: intent.wantsPremium,
          wantsTravel: intent.wantsTravel
        },
        candidates: candidates.map((item) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          category: item.category,
          price: item.price,
          rating: item.rating,
          summary: item.summary,
          description: item.description,
          attributes: item.attributes,
          highlights: item.highlights,
          tags: item.tags,
          useCases: item.useCases,
          relevance: item.relevance
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

  return {
    ...JSON.parse(extractOutputText(data)),
    meta: {
      aiEnabled: true,
      model: OPENAI_MODEL
    }
  };
}

function renderRecommendationPanel(response, candidates) {
  elements.recommendationState.classList.add("hidden");
  elements.recommendationContent.classList.remove("hidden");
  elements.copySummaryButton.disabled = false;

  const overall = findProduct(response.bestOverallId, candidates);
  const runnerUp = findProduct(response.runnerUpId, candidates);
  const budgetPick = findProduct(response.budgetPickId, candidates);
  const premiumPick = findProduct(response.premiumPickId, candidates);
  const aiEnabled = Boolean(response.meta?.aiEnabled);

  elements.recommendationContent.innerHTML = `
    ${aiEnabled
      ? `<section class="summary-banner">
          <p class="eyebrow">AI reasoning enabled</p>
          <p class="summary-headline">${escapeHtml(response.headline)}</p>
          <p class="summary-copy">${escapeHtml(response.intentSummary)}</p>
        </section>`
      : `<section class="lock-banner">
          <p class="eyebrow">AI preview locked</p>
          <p class="summary-headline">${escapeHtml(response.headline)}</p>
          <p class="summary-copy">${escapeHtml(response.intentSummary)}</p>
          <button class="primary-button" type="button" data-action="focus-api">
            Enable AI features
          </button>
        </section>`}

    <section class="pick-grid">
      ${renderPickCard("Best overall", overall)}
      ${renderPickCard("Runner-up", runnerUp)}
      ${renderPickCard("Best budget", budgetPick)}
      ${premiumPick ? renderPickCard("Best premium", premiumPick) : ""}
    </section>

    <section class="summary-card">
      <div class="share-header">
        <div>
          <p class="eyebrow">Why these match</p>
          <h4>Grounded recommendation logic</h4>
        </div>
        <span class="summary-badge">${aiEnabled ? "AI mode" : "Catalog preview"}</span>
      </div>
      <ul class="why-list">
        ${(response.whyTheseMatch || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>

    <section class="summary-card">
      <div class="share-header">
        <div>
          <p class="eyebrow">Tradeoff analysis</p>
          <h4>Where each option wins</h4>
        </div>
        <span class="summary-badge">${aiEnabled ? "AI tradeoffs" : "Catalog tradeoffs"}</span>
      </div>
      <p class="summary-copy">${escapeHtml(response.confidenceNote)}</p>
      <div class="comparison-table">
        ${(response.tradeoffs || [])
          .map((item) => renderTradeoffRow(item, candidates))
          .join("")}
      </div>
    </section>

    <section class="summary-card">
      <div class="share-header">
        <div>
          <p class="eyebrow">Share-ready summary</p>
          <h4>Copy this recommendation</h4>
        </div>
        <span class="summary-badge">${aiEnabled ? OPENAI_MODEL : "grounded catalog"}</span>
      </div>
      <p class="share-summary-text">${escapeHtml(response.shareSummary)}</p>
    </section>

    <section class="summary-card">
      <p class="eyebrow">Suggested follow-ups</p>
      <ul class="followup-list">
        ${(response.followUpQuestions || [])
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}
      </ul>
    </section>
  `;
}

function renderPickCard(label, product) {
  if (!product) {
    return "";
  }

  return `
    <article class="pick-card">
      <div class="pick-card-top">
        <p class="recommendation-label">${escapeHtml(label)}</p>
        <span class="feature-pill">$${product.price}</span>
      </div>
      <h4>${escapeHtml(product.name)}</h4>
      <p>${escapeHtml(product.summary)}</p>
      <div class="candidate-attribute-row">
        <span class="feature-pill">${escapeHtml(product.brand)}</span>
        <span class="feature-pill">${escapeHtml(product.category)}</span>
        <span class="feature-pill">★ ${product.rating}</span>
      </div>
    </article>
  `;
}

function renderTradeoffRow(item, candidates) {
  const winner = findProduct(item.winnerId, candidates);
  return `
    <article class="comparison-row">
      <div>
        <p class="comparison-label">${escapeHtml(item.dimension)}</p>
        <strong>${escapeHtml(winner?.name || "Candidate")}</strong>
      </div>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `;
}

function renderEmptyCandidateState() {
  elements.candidateState.classList.remove("hidden");
  elements.candidateGrid.classList.add("hidden");
}

function renderEmptyRecommendationState() {
  elements.recommendationState.classList.remove("hidden");
  elements.recommendationContent.classList.add("hidden");
  elements.copySummaryButton.disabled = true;
}

function renderRecommendationError(message) {
  renderEmptyRecommendationState();
  elements.recommendationState.textContent = message;
}

function handleRecommendationActions(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.dataset.action === "focus-api") {
    elements.apiKeyInput.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleImageSelection(event) {
  const file = event.target.files?.[0];
  if (!file) {
    clearImageSelection();
    return;
  }

  fileToDataUrl(file).then((dataUrl) => {
    state.imageDataUrl = dataUrl;
    state.imageName = file.name;
    elements.previewImage.src = dataUrl;
    elements.previewName.textContent = file.name;
    elements.imagePreview.classList.remove("hidden");
    if (state.mode !== "image") {
      setMode("image");
    }
  });
}

function clearImageSelection() {
  state.imageDataUrl = "";
  state.imageName = "";
  elements.imageInput.value = "";
  elements.imagePreview.classList.add("hidden");
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
  renderVoiceTranscript();
  isListening = true;
  updateVoiceButton();
  recognition.start();
}

function updateVoiceButton() {
  if (!elements.voiceButton) {
    return;
  }

  elements.voiceButton.textContent = isListening ? "Listening..." : "Start voice input";
}

function renderCategoryChips() {
  const categories = [...new Set(state.catalog.map((product) => product.category))].sort();

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

function buildShareSummary(payload, overall, runnerUp, budgetPick) {
  const request = payload.query || payload.transcript || payload.imageName || "the request";
  const parts = [
    `For "${request}", the strongest grounded pick is ${overall?.name || "the top candidate"}.`
  ];

  if (runnerUp && runnerUp.id !== overall?.id) {
    parts.push(`${runnerUp.name} is the strongest alternative if you want a different balance of price and features.`);
  }

  if (budgetPick && budgetPick.id !== overall?.id) {
    parts.push(`${budgetPick.name} is the best value-oriented option from the current shortlist.`);
  }

  return parts.join(" ");
}

function setLoading(isLoading) {
  elements.submitButton.disabled = isLoading;
  elements.submitButton.textContent = isLoading
    ? state.apiKey
      ? "Retrieving and reasoning..."
      : "Running grounded retrieval..."
    : "Run retrieval pipeline";
  elements.resultsCard.classList.toggle("loading", isLoading);
}

function setPipelineStage(stage) {
  const order = ["input", "retrieval", "grounded", "reasoning", "summary"];
  const activeIndex = order.indexOf(stage);

  elements.pipelineSteps.forEach((step) => {
    const index = order.indexOf(step.dataset.pipelineStep);
    let stateValue = "idle";

    if (index < activeIndex) {
      stateValue = "done";
    } else if (index === activeIndex) {
      stateValue = "active";
    }

    step.dataset.state = stateValue;
  });
}

function openArchitectureModal() {
  elements.architectureModal.classList.remove("hidden");
  elements.architectureModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (window.location.hash !== "#architecture") {
    window.history.replaceState(null, "", "#architecture");
  }
}

function closeArchitectureModal() {
  if (!elements.architectureModal || elements.architectureModal.classList.contains("hidden")) {
    return;
  }

  elements.architectureModal.classList.add("hidden");
  elements.architectureModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (window.location.hash === "#architecture") {
    const nextUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", nextUrl);
  }
}

async function copySummary() {
  if (!state.lastResponse || !navigator.clipboard) {
    return;
  }

  const picks = [
    findProduct(state.lastResponse.bestOverallId, state.lastCandidates)?.name,
    findProduct(state.lastResponse.runnerUpId, state.lastCandidates)?.name,
    findProduct(state.lastResponse.budgetPickId, state.lastCandidates)?.name
  ].filter(Boolean);

  const text = [
    state.lastResponse.headline,
    state.lastResponse.shareSummary,
    picks.length ? `Picks: ${picks.join(", ")}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");

  await navigator.clipboard.writeText(text);
  elements.copySummaryButton.textContent = "Copied";
  window.setTimeout(() => {
    elements.copySummaryButton.textContent = "Copy summary";
  }, 1400);
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
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

function tokenize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((item) => item.length > 1);
}

function overlapScore(queryTokens, haystackTokens) {
  const haystack = new Set(haystackTokens);
  return queryTokens.reduce((total, token) => total + (haystack.has(token) ? 8 : 0), 0);
}

function findProduct(id, candidates) {
  if (!id) {
    return null;
  }

  return candidates.find((item) => item.id === id) || null;
}

function renderProductVisual(product) {
  return `
    <div class="product-media" data-visual="${escapeHtml(product.image || product.category.toLowerCase())}">
      <span class="media-label">${escapeHtml(product.brand)}</span>
    </div>
  `;
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
