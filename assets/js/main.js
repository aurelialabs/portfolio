(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  const model = window.PortfolioModel;
  const selectedIds = { internships: null, projects: null };
  const viewNames = ["home", "internship", "project"];
  const collectionLabels = { internships: "实习经历条目", projects: "项目作品条目" };
  const warnedBlockTypes = new Set();

  const reduceMotion = typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");
  let lightboxTrigger = null;
  const pendingFallbackHashWrites = [];

  function getValidationErrors() {
    if (!data) return ["portfolio data is unavailable"];
    if (!model || typeof model.validatePortfolioData !== "function") return ["portfolio model is unavailable"];
    try {
      const errors = model.validatePortfolioData(data);
      return Array.isArray(errors) ? errors : ["portfolio validation result is invalid"];
    } catch (error) {
      return [`portfolio validation failed: ${error && error.message ? error.message : String(error)}`];
    }
  }

  const validationErrors = getValidationErrors();
  const contentIsValid = validationErrors.length === 0;

  function openLightbox(image, trigger) {
    if (!lightbox || !lightboxImage || !lightboxCaption || !image) return false;
    lightboxImage.src = image.src || "";
    lightboxImage.alt = image.alt || "";
    lightboxCaption.textContent = image.caption || "";
    lightboxTrigger = trigger || null;
    if (!lightbox.open) lightbox.showModal();
    return true;
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.open) return false;
    lightbox.close();
    return true;
  }

  function getNonEmptyString(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function setText(selector, value) {
    const text = getNonEmptyString(value);
    if (!text) return false;
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = text;
    });
    return true;
  }

  function renderProfile() {
    const profile = (data && typeof data.profile === "object" && data.profile) || {};
    setText("[data-profile-name]", profile.name);
    setText("[data-profile-target-role]", profile.targetRole);
    setText("[data-profile-summary]", profile.summary);
    setText("[data-profile-internship-summary]", profile.internshipSummary);
    setText("[data-profile-project-summary]", profile.projectSummary);
    setText("[data-profile-school]", profile.school);
    setText("[data-profile-education]", profile.education);
    setText("[data-profile-background]", profile.background);
    setText("[data-profile-city]", profile.city);

    const email = document.querySelector("[data-profile-email]");
    const emailValue = getNonEmptyString(profile.email);
    if (email && emailValue) {
      email.textContent = emailValue;
      email.href = `mailto:${emailValue}`;
    }

    const phone = document.querySelector("[data-profile-phone]");
    const phoneValue = getNonEmptyString(profile.phone);
    if (phone && phoneValue) {
      phone.textContent = phoneValue;
      phone.href = `tel:${phoneValue}`;
    }

    const portrait = document.querySelector("[data-profile-portrait]");
    if (portrait) {
      const portraitPath = getNonEmptyString(profile.portrait);
      const profileName = getNonEmptyString(profile.name);
      if (portraitPath) portrait.src = portraitPath;
      if (profileName) portrait.alt = `${profileName}职业照`;
    }
  }

  function appendTextElement(parent, tagName, text, className) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text || "";
    parent.append(element);
    return element;
  }

  function renderBlock(block) {
    if (!block || typeof block !== "object") return null;

    if (block.type === "paragraph") {
      const paragraph = document.createElement("p");
      paragraph.className = "detail-paragraph";
      paragraph.textContent = block.text || "";
      return paragraph;
    }

    if (block.type === "bullets") {
      const list = document.createElement("ul");
      list.className = "detail-bullets";
      (Array.isArray(block.items) ? block.items : []).forEach((item) => {
        appendTextElement(list, "li", item);
      });
      return list;
    }

    if (block.type === "cards") {
      const grid = document.createElement("div");
      grid.className = "block-cards";
      (Array.isArray(block.items) ? block.items : []).forEach((item) => {
        const card = document.createElement("article");
        card.className = "block-card";
        if (item && /^[a-z0-9-]+$/i.test(item.tone || "")) card.classList.add(`tone-${item.tone}`);
        appendTextElement(card, "h4", item && item.title);
        appendTextElement(card, "p", item && item.text);
        grid.append(card);
      });
      return grid;
    }

    if (block.type === "steps") {
      const list = document.createElement("ol");
      list.className = "process-steps";
      (Array.isArray(block.items) ? block.items : []).forEach((item) => {
        const step = document.createElement("li");
        appendTextElement(step, "span", item && item.label, "step-label");
        appendTextElement(step, "h4", item && item.title);
        appendTextElement(step, "p", item && item.text);
        list.append(step);
      });
      return list;
    }

    if (block.type === "gallery") {
      const gallery = document.createElement("div");
      gallery.className = "gallery-grid";
      (Array.isArray(block.images) ? block.images : []).forEach((image) => {
        const figure = document.createElement("figure");
        const button = document.createElement("button");
        const picture = document.createElement("img");
        const caption = document.createElement("figcaption");
        button.type = "button";
        button.className = "gallery-button";
        button.setAttribute("aria-label", image && image.caption ? `查看大图：${image.caption}` : "查看大图");
        picture.src = (image && image.src) || "";
        picture.alt = (image && image.alt) || "";
        picture.loading = "lazy";
        picture.decoding = "async";
        caption.textContent = (image && image.caption) || "";
        button.addEventListener("click", () => openLightbox(image, button));
        let imageRemoved = false;
        picture.addEventListener("error", () => {
          if (imageRemoved) return;
          imageRemoved = true;
          figure.remove();
          console.warn(`Gallery image unavailable: ${(image && image.src) || "unknown"}`);
        });
        button.append(picture);
        figure.append(button, caption);
        gallery.append(figure);
      });
      return gallery;
    }

    const type = String(block.type || "unknown");
    if (!warnedBlockTypes.has(type)) {
      warnedBlockTypes.add(type);
      console.warn(`Skipped unsupported block type: ${type}`);
    }
    return null;
  }

  function renderEntryArticle(entry) {
    const article = document.createElement("div");
    article.className = "entry-article";

    const header = document.createElement("header");
    header.className = "detail-header";
    appendTextElement(header, "p", entry.eyebrow, "eyebrow");
    const heading = appendTextElement(header, "h2", entry.title);
    heading.tabIndex = -1;
    heading.setAttribute("data-entry-heading", "");
    appendTextElement(header, "p", entry.subtitle, "detail-subtitle");
    if (entry.status) appendTextElement(header, "p", entry.status, "status-label");

    if (Array.isArray(entry.links) && entry.links.length) {
      const actions = document.createElement("div");
      actions.className = "detail-actions";
      entry.links.forEach((link) => {
        if (!link || !link.label || !/^https:\/\//i.test(link.href || "")) return;
        const anchor = document.createElement("a");
        anchor.href = link.href;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.textContent = link.label;
        actions.append(anchor);
      });
      if (actions.childElementCount) header.append(actions);
    }

    const metadata = document.createElement("dl");
    metadata.className = "entry-meta";
    (Array.isArray(entry.meta) ? entry.meta : []).forEach((item) => {
      const group = document.createElement("div");
      appendTextElement(group, "dt", item && item.label);
      appendTextElement(group, "dd", item && item.value);
      metadata.append(group);
    });
    header.append(metadata);
    article.append(header);

    const sections = [];
    (Array.isArray(entry.sections) ? entry.sections : []).forEach((sectionData) => {
      const section = document.createElement("section");
      section.className = "detail-section";
      section.id = `${entry.id}-${sectionData.id}`;
      appendTextElement(section, "h3", sectionData.title);
      (Array.isArray(sectionData.blocks) ? sectionData.blocks : []).forEach((block) => {
        const rendered = renderBlock(block);
        if (rendered) section.append(rendered);
      });
      sections.push({ data: sectionData, element: section });
    });

    const chapterNav = document.createElement("nav");
    chapterNav.className = "chapter-nav";
    chapterNav.setAttribute("data-chapter-nav", "");
    chapterNav.setAttribute("aria-label", "文章章节");
    sections.forEach(({ data: sectionData, element: section }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = sectionData.navLabel || sectionData.title || "";
      button.addEventListener("click", () => {
        section.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
      });
      chapterNav.append(button);
    });
    article.append(chapterNav);
    sections.forEach(({ element }) => article.append(element));
    return article;
  }

  function getSelectedEntry(collectionKey) {
    if (!contentIsValid) return null;
    const entries = model.getVisibleEntries(data, collectionKey);
    if (!entries.length) return null;
    const selected = model.findEntry(data, collectionKey, selectedIds[collectionKey]);
    if (selected && selected.hidden !== true) return selected;
    selectedIds[collectionKey] = entries[0].id;
    return entries[0];
  }

  function getEntryPanelId(collectionKey) {
    return `${collectionKey}-panel`;
  }

  function getEntryTabId(collectionKey, entryId) {
    return `entry-tab-${collectionKey}-${encodeURIComponent(String(entryId))}`;
  }

  function handleEntryTabKeydown(event, collectionKey, navigation) {
    const tabs = Array.from(navigation.querySelectorAll("[data-entry-id]"));
    const currentIndex = tabs.indexOf(event.currentTarget);
    if (currentIndex < 0 || tabs.length === 0) return;

    let nextIndex = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    const nextId = nextTab.getAttribute("data-entry-id");
    if (nextId !== selectedIds[collectionKey]) {
      selectEntry(collectionKey, nextId, { focusHeading: false });
    }
    nextTab.focus({ preventScroll: true });
  }

  function renderEntryNavigation(collectionKey, entries) {
    const navigation = document.querySelector(`[data-entry-nav="${collectionKey}"]`);
    if (!navigation) return null;
    navigation.replaceChildren();
    navigation.className = "entry-nav";
    navigation.setAttribute("role", "tablist");
    navigation.setAttribute("aria-label", collectionLabels[collectionKey] || "作品条目");
    const panelId = getEntryPanelId(collectionKey);

    (Array.isArray(entries) ? entries : []).forEach((entry) => {
      const button = document.createElement("button");
      const label = document.createElement("span");
      const metadata = document.createElement("small");
      const compactMeta = (Array.isArray(entry.meta) ? entry.meta : [])
        .slice(0, 2)
        .map((item) => item && item.value)
        .filter(Boolean)
        .join(" · ");
      button.type = "button";
      button.setAttribute("data-entry-id", entry.id);
      button.setAttribute("id", getEntryTabId(collectionKey, entry.id));
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", panelId);
      button.setAttribute("aria-selected", String(entry.id === selectedIds[collectionKey]));
      button.tabIndex = entry.id === selectedIds[collectionKey] ? 0 : -1;
      label.textContent = entry.navLabel || "";
      metadata.textContent = compactMeta;
      button.append(label, metadata);
      button.addEventListener("click", () => selectEntry(collectionKey, entry.id));
      button.addEventListener("keydown", (event) => handleEntryTabKeydown(event, collectionKey, navigation));
      navigation.append(button);
    });
    updateEntryNavigation(collectionKey);
    return navigation;
  }

  function updateEntryNavigation(collectionKey) {
    const navigation = document.querySelector(`[data-entry-nav="${collectionKey}"]`);
    if (!navigation) return;
    let activeTabId = "";
    navigation.querySelectorAll("[data-entry-id]").forEach((button) => {
      const isSelected = button.getAttribute("data-entry-id") === selectedIds[collectionKey];
      button.setAttribute("aria-selected", String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
      if (isSelected) activeTabId = button.getAttribute("id") || "";
    });

    const detail = document.querySelector(`[data-entry-detail="${collectionKey}"]`);
    if (!detail) return;
    detail.setAttribute("role", "tabpanel");
    detail.setAttribute("id", getEntryPanelId(collectionKey));
    if (activeTabId) detail.setAttribute("aria-labelledby", activeTabId);
    else detail.removeAttribute("aria-labelledby");
  }

  function renderSelectedEntry(collectionKey) {
    const detail = document.querySelector(`[data-entry-detail="${collectionKey}"]`);
    const entry = getSelectedEntry(collectionKey);
    if (!detail) return null;

    detail.setAttribute("role", "tabpanel");
    detail.setAttribute("id", getEntryPanelId(collectionKey));

    detail.replaceChildren();
    if (!entry) {
      detail.textContent = "暂无可展示内容。";
      return null;
    }

    detail.append(renderEntryArticle(entry));
    return entry;
  }

  function selectEntry(collectionKey, id, { focusHeading = true } = {}) {
    if (!contentIsValid) return null;
    const entries = model.getVisibleEntries(data, collectionKey);
    const entry = entries.find((item) => item.id === id) || entries[0] || null;
    if (!entry) return null;
    selectedIds[collectionKey] = entry.id;
    renderSelectedEntry(collectionKey);
    updateEntryNavigation(collectionKey);

    const detailScroll = document.querySelector(`[data-entry-detail="${collectionKey}"]`);
    if (detailScroll) {
      detailScroll.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      if (focusHeading) {
        const heading = detailScroll.querySelector("[data-entry-heading]");
        if (heading) heading.focus({ preventScroll: true });
      }
    }
    return entry;
  }

  function syncViewHash(nextView, { replace = false, focus = true } = {}) {
    const nextHash = `#${nextView}`;
    if (window.location.hash === nextHash) return false;

    const method = replace ? "replaceState" : "pushState";
    if (window.history && typeof window.history[method] === "function") {
      try {
        window.history[method](null, "", nextHash);
        return false;
      } catch (_error) {
        // Fall through for browsers that restrict History API calls on local files.
      }
    }

    pendingFallbackHashWrites.push({ hash: nextHash, focus });
    window.location.hash = nextView;
    return true;
  }

  function setView(view, { updateHash = true, focus = true, replaceHash = false } = {}) {
    const nextView = contentIsValid && model && typeof model.normalizeViewHash === "function"
      ? model.normalizeViewHash(view)
      : "home";
    viewNames.forEach((name) => {
      const section = document.querySelector(`[data-view="${name}"]`);
      if (section) section.hidden = name !== nextView;
    });

    document.querySelectorAll("[data-view-target]").forEach((button) => {
      if (button.dataset.viewTarget === nextView) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });

    const deferFocus = updateHash && syncViewHash(nextView, { replace: replaceHash, focus });

    const heading = document.querySelector(`[data-view="${nextView}"] [data-view-heading]`);
    if (focus && !deferFocus) {
      const announcement = document.querySelector("[data-view-announcement]");
      if (announcement && heading) announcement.textContent = heading.textContent || "";
      if (heading) heading.focus({ preventScroll: true });
    }

    return nextView;
  }

  function bindEvents() {
    document.querySelectorAll("[data-view-target]").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.viewTarget));
    });

    document.querySelectorAll("[data-entry-view]").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.entryView));
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightbox) {
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
      });
      lightbox.addEventListener("close", () => {
        const trigger = lightboxTrigger;
        lightboxTrigger = null;
        if (trigger) trigger.focus({ preventScroll: true });
      });
    }

    window.addEventListener("hashchange", (event) => {
      const newURL = event && typeof event.newURL === "string" ? event.newURL : "";
      const hashIndex = newURL.lastIndexOf("#");
      const eventHash = newURL ? (hashIndex >= 0 ? newURL.slice(hashIndex) : "") : window.location.hash;
      const pendingWrite = pendingFallbackHashWrites[0];
      if (pendingWrite && pendingWrite.hash === eventHash) {
        pendingFallbackHashWrites.shift();
        setView(eventHash, { updateHash: false, focus: pendingWrite.focus });
        return;
      }
      setView(eventHash, { updateHash: false });
    });
  }

  function applyContentState(errors) {
    const hasErrors = errors.length > 0;
    const errorRegion = document.querySelector("[data-content-error]");
    if (errorRegion) {
      errorRegion.hidden = !hasErrors;
      errorRegion.textContent = hasErrors ? "部分作品内容暂时无法显示，请稍后再试。" : "";
    }

    document.querySelectorAll("[data-entry-view]").forEach((button) => {
      button.disabled = hasErrors;
    });
    document.querySelectorAll("[data-view-target]").forEach((button) => {
      button.disabled = hasErrors && button.dataset.viewTarget !== "home";
    });

    errors.forEach((error) => console.error("Portfolio content validation error:", error));
  }

  function renderCollection(collectionKey) {
    const entries = model.getVisibleEntries(data, collectionKey);
    getSelectedEntry(collectionKey);
    renderEntryNavigation(collectionKey, entries);
    renderSelectedEntry(collectionKey);
  }

  renderProfile();
  applyContentState(validationErrors);
  if (contentIsValid) {
    renderCollection("internships");
    renderCollection("projects");
  }
  bindEvents();
  setView(contentIsValid ? window.location.hash : "home", { focus: false, replaceHash: true });

  window.PortfolioApp = {
    setView,
    selectEntry,
    renderSelectedEntry,
    renderEntryNavigation,
    renderEntryArticle,
    renderBlock,
    openLightbox,
    closeLightbox
  };
})();
