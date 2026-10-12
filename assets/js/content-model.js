(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PortfolioModel = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const blockTypes = new Set(["paragraph", "bullets", "cards", "steps", "gallery"]);
  const frameworks = {
    internships: ["overview", "business", "goals", "work", "results", "collaboration", "review"],
    projects: ["overview", "problem", "goals", "solution", "ai-choice", "build", "test", "result", "review"]
  };

  function validatePortfolioData(data) {
    const errors = [];
    if (!data || typeof data !== "object") return ["portfolio data must be an object"];
    for (const key of ["profile", "internships", "projects"]) {
      if (!(key in data) || data[key] == null) errors.push(`missing ${key}`);
    }
    for (const collectionKey of ["internships", "projects"]) {
      const entries = data[collectionKey];
      if (!Array.isArray(entries)) continue;
      const ids = new Set();
      entries.forEach((entry, entryIndex) => {
        const prefix = `${collectionKey}[${entryIndex}]`;
        if (!entry || typeof entry !== "object") { errors.push(`${prefix} must be an object`); return; }
        for (const field of ["id", "navLabel", "title"]) if (!entry[field]) errors.push(`${prefix} missing ${field}`);
        if (!Array.isArray(entry.sections) || entry.sections.length === 0) errors.push(`${prefix} sections must be non-empty`);
        if (entry.id && ids.has(entry.id)) errors.push(`${prefix} duplicate entry id: ${entry.id}`);
        if (entry.id) ids.add(entry.id);
        if (entry.links !== undefined) {
          if (!Array.isArray(entry.links)) errors.push(`${prefix} links must be an array`);
          else entry.links.forEach((link, linkIndex) => {
            if (!link || !link.label || !/^https:\/\//i.test(link.href || "")) {
              errors.push(`${prefix}.links[${linkIndex}] needs a label and HTTPS URL`);
            }
          });
        }
        const sectionIds = new Set();
        let previous = -1;
        (Array.isArray(entry.sections) ? entry.sections : []).forEach((section, sectionIndex) => {
          const sp = `${prefix}.sections[${sectionIndex}]`;
          if (!section || typeof section !== "object") { errors.push(`${sp} must be an object`); return; }
          if (!section.id) errors.push(`${sp} missing id`);
          if (section.id && sectionIds.has(section.id)) errors.push(`${sp} duplicate section id: ${section.id}`);
          if (section.id) sectionIds.add(section.id);
          const order = frameworks[collectionKey];
          const current = order.indexOf(section.id);
          if (current < 0) errors.push(`${sp} unsupported section id: ${section.id}`);
          else if (current < previous) errors.push(`${sp} sections do not follow framework order`);
          else previous = current;
          if (!Array.isArray(section.blocks) || section.blocks.length === 0) errors.push(`${sp} blocks must be non-empty`);
          (Array.isArray(section.blocks) ? section.blocks : []).forEach((block, blockIndex) => {
            const bp = `${sp}.blocks[${blockIndex}]`;
            if (!blockTypes.has(block && block.type)) { errors.push(`${bp} unsupported block type: ${block && block.type}`); return; }
            if (block.type === "gallery") {
              if (!Array.isArray(block.images) || block.images.length === 0) {
                errors.push(`${bp} gallery images must be a non-empty array`);
              } else {
                block.images.forEach((image, imageIndex) => {
                  if (!image || !image.src) errors.push(`${bp}.images[${imageIndex}] missing src`);
                  if (!image || !image.alt) errors.push(`${bp}.images[${imageIndex}] missing alt`);
                });
              }
            }
          });
        });
      });
    }
    return errors;
  }

  function normalizeViewHash(hash) {
    const raw = String(hash || "");
    const value = (raw.includes("#") ? raw.slice(raw.lastIndexOf("#") + 1) : raw).replace(/^#/, "").split(/[/?&]/)[0];
    return value === "internship" || value === "project" ? value : "home";
  }

  function getVisibleEntries(data, collectionKey) {
    if (!data || !Array.isArray(data[collectionKey])) return [];
    return data[collectionKey].filter((entry) => entry && entry.hidden !== true);
  }

  function findEntry(data, collectionKey, id) {
    if (!data || !Array.isArray(data[collectionKey])) return null;
    return data[collectionKey].find((entry) => entry && entry.id === id) || null;
  }

  return { validatePortfolioData, normalizeViewHash, getVisibleEntries, findEntry };
});
