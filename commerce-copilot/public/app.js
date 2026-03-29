const state = {
  catalog: [],
  selectedCategories: new Set(),
  imageDataUrl: "",
  imageName: "",
  lastResponse: null,
  transcript: ""
};

const elements = {
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
    "Unable to load catalog or health data right now.";
});

async function bootstrap() {
  bindEvents();
  setupSpeechRecognition();

  const [catalogResponse, healthResponse] = await Promise.all([
    fetchJson("/api/catalog"),
    fetchJson("/api/health")
  ]);

  state.catalog = catalogResponse.products;
  renderCatalog();
  renderCategoryChips();
  renderHealth(healthResponse);
}

function bindEvents() {
  elements.recommendationForm.addEventListener("submit", handleSubmit);
  elements.imageInput.addEventListener("change", handleImageSelection);
  elements.clearImageButton.addEventListener("click", clearImageSelection);
  elements.copySummaryButton.addEventListener("click", copySummary);
  elements.voiceButton.addEventListener("click", toggleVoiceCapture);
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

    const response = await fetchJson("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

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

function renderHealth(health) {
  elements.healthBanner.innerHTML = health.aiEnabled
    ? `AI mode is <strong>on</strong> using <strong>${health.model}</strong>.`
    : `AI mode is <strong>off</strong>. Add <strong>OPENAI_API_KEY</strong> to enable multimodal reasoning.`;
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
            ${product.highlights.slice(0, 3).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
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
        ${highlights.slice(0, 2).map((item) => `<span class="feature-pill">${escapeHtml(item)}</span>`).join("")}
      </div>
      <p><strong>Why it fits:</strong> ${escapeHtml(recommendation.reason)}</p>
      <p class="tradeoff"><strong>Tradeoff:</strong> ${escapeHtml(recommendation.tradeoff)}</p>
      <p><strong>Best for:</strong> ${escapeHtml(recommendation.bestFor)}</p>
    </article>
  `;
}

async function copySummary() {
  if (!state.lastResponse) {
    return;
  }

  if (!navigator.clipboard) {
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
  elements.resultsCard?.classList?.toggle?.("loading", isLoading);
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
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
