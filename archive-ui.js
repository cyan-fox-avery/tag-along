/* Tag Along — Wild Archive UI (v0.20.0 module split).
   Extracted from script.js (push size limit). Loaded after archive-data.js,
   before script.js. Owns the Archive tab renderer + license URL registry. */
/* ---------- Wild Archive (v0.17.0, progressive since v0.24.0) ----------
   Real-world photography and footage of every tagged species. Unlocks
   per-tag from the first tag (Mira-approved v0.24.0); previously win-gated. All media was hand-curated by Avery + Mira — mostly Wikimedia
   Commons (CC BY / CC BY-SA / CC0 / public domain), plus select iNaturalist
   photographs (CC BY-NC, with the project non-commercial notice);
   attribution is shown per asset, with the true source labeled.
   Species not yet in the live roster stay hidden until they're added. */
/* v1.5.11: Archive tab is always visible (stable 8-tab layout). Until
   unlocked it is greyed out and unclickable; Sarah's intro text enables it. */
function updateArchiveTab() {
  const btn = document.querySelector('.tab[data-tab="archive"]');
  if (!btn) return;
  const locked = !state.archiveUnlocked;
  btn.classList.toggle("tab-locked", locked);
  btn.disabled = locked;
  btn.setAttribute("aria-disabled", locked ? "true" : "false");
}
/* v0.17.0 review fix: canonical license URLs so the Archive's credit line
   links the license itself, not just names it. Public-domain assets get no
   CC link (and no copyright symbol — "Credit:" instead of "©"). */
const LICENSE_URLS = {
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
  "CC BY 3.0 AU": "https://creativecommons.org/licenses/by/3.0/au/",
  "CC BY-SA 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  /* v0.20.0: NC licenses allowed for exceptional images (project policy:
     Tag Along is free and non-commercial; NC assets carry a licenseNote and
     would be removed/replaced before any commercial use). */
  "CC BY-NC 4.0": "https://creativecommons.org/licenses/by-nc/4.0/"
};
function archiveAssetHtml(a, isPrimary) {
  const label = a.label ? `<span class="archive-label">${esc(a.label)}</span>` : "";
  const isPD = /public domain/i.test(a.license || "") || a.license === "CC0";
  const licUrl = LICENSE_URLS[a.license];
  const licHtml = licUrl
    ? `<a href="${licUrl}" target="_blank" rel="noopener">${esc(a.license)}</a>`
    : esc(a.license);
  const trimNote = a.trimmed ? " · trimmed from original" : "";
  /* v0.20.0: sourceLabel (default Wikimedia Commons) for iNaturalist/FishBase
     attribution; licenseNote for the NC project-policy notice. */
  const srcLabel = a.sourceLabel || "Wikimedia Commons";
  const credit = `<p class="archive-credit">${isPD ? "Credit" : "©"} ${esc(a.credit)} · ${licHtml}${trimNote} · <a href="${esc(a.page)}" target="_blank" rel="noopener">${esc(srcLabel)} ↗</a></p>`;
  const ncNote = a.licenseNote ? `<p class="archive-nc">${esc(a.licenseNote)}</p>` : "";
  let mediaHtml;
  if (a.type === "video" && a.play) {
    // v0.17.0 review fix: curated clip boundaries. Media fragments (#t=start,end)
    // are honored by modern browsers incl. iOS Safari, so the Archive presents
    // the excerpt Avery chose instead of the whole source video.
    const clip = (a.clipStart != null && a.clipEnd != null) ? `#t=${a.clipStart},${a.clipEnd}` : "";
    mediaHtml = `<video class="archive-media${isPrimary ? " primary" : ""}" controls muted playsinline preload="none"${a.image ? ` poster="${esc(a.image)}"` : ""} src="${esc(a.play + clip)}"></video>`;
  } else if (a.framing === "landscape-crop") {
    // v0.17.1: portrait GIF reframed as landscape (crop + 90deg rotate in CSS).
    mediaHtml = `<div class="gif-landscape-frame"><img src="${esc(a.image)}" alt="${esc(a.caption)}" loading="lazy"></div>`;
  } else if (a.framing === "detail-crop" && a.detailCrop) {
    /* v0.20.0 Mira review fix: a genuine detail view cropped from the source
       image via CSS (the sawshark rostrum). Coordinates are in source pixels;
       background-position math: p% aligns p% of the scaled image with p% of
       the frame, so p = start / (full - window) * 100. */
    const dc = a.detailCrop;
    const bgW = (dc.iw / dc.w * 100).toFixed(1);
    const bgH = (dc.ih / dc.h * 100).toFixed(1);
    const posX = (dc.x / (dc.iw - dc.w) * 100).toFixed(1);
    const posY = (dc.y / (dc.ih - dc.h) * 100).toFixed(1);
    mediaHtml = `<a href="${esc(a.full || a.image)}" target="_blank" rel="noopener">` +
      `<div class="detail-crop-frame" role="img" aria-label="${esc(a.caption)}" style="` +
      `aspect-ratio:${dc.w}/${dc.h};` +
      `background-image:url('${esc(a.image)}');` +
      `background-size:${bgW}% ${bgH}%;` +
      `background-position:${posX}% ${posY}%;"></div></a>`;
  } else {
    mediaHtml = `<a href="${esc(a.full || a.image)}" target="_blank" rel="noopener"><img class="archive-media${isPrimary ? " primary" : ""}" src="${esc(a.image)}" alt="${esc(a.caption)}" loading="lazy"></a>`;
  }
  return `<figure class="archive-asset${isPrimary ? " primary" : ""}">${label}${mediaHtml}<figcaption>${esc(a.caption)}</figcaption>${credit}${ncNote}</figure>`;
}
function renderArchive() {
  const list = $("archiveList");
  if (!list || typeof ARCHIVE_MEDIA === "undefined") return;
  list.innerHTML = "";
  /* v1.5.10-beta: the Archive shows ONLY sharks the player has tagged.
     The locked-species teaser list is gone — no tantalizing teasers.
     It's a gallery of earned photographs, not a catalogue.
     v1.2.0-beta Mira review: unlocked species first (the reward).
     v0.17.0 review fix: the archive promise is "the real animals you tagged."
     A species dossier requires an actual tag, so a future roster expansion
     (e.g. salmon) can't leak into a returning player's Archive before they
     tag one. */
  const abbrFor = (status) => (typeof IUCN_ABBR !== "undefined" && IUCN_ABBR[status]) || status;
  SHARKS.forEach(s => {
    const media = ARCHIVE_MEDIA[s.id];
    if (!media || media.future) return;
    const t = state.tagged[s.id];
    if (!t) return; /* untagged species are not rendered at all */
    const yourShark = t.researchId
      ? `<p class="hook">Your shark${t.name ? ` \u201c${esc(t.name)}\u201d` : ""} ${idLine(t)}${t.date ? ` \u2014 tagged ${esc(t.date)}` : ""}${t.location ? ` at ${esc(t.location)}` : ""}</p>`
      : "";
    /* v1.5.10-beta: row head matches the Research page — common name first,
       then the color-coded abbreviated IUCN badge. No checkmark. */
    const abbr = abbrFor(s.status);
    const row = document.createElement("div");
    row.className = "guide-row";
    row.innerHTML = `
      <button type="button" class="guide-row-head" aria-expanded="false">
        <span class="guide-row-name">${s.name}</span>
        <span class="latin">${media.scientific}</span>
        <span class="status-pill iucn-${abbr}" title="IUCN Red List: ${s.status}">${abbr}</span>
        <span class="guide-caret" aria-hidden="true">\u25be</span>
      </button>
      <div class="guide-row-body hidden">
        ${yourShark}
        ${media.comingSoon
          ? `<p class="hook">📸 Wild media coming soon — being curated.</p>`
          : media.assets.map((a, i) => archiveAssetHtml(a, i === 0)).join("")}
      </div>`;
    const head = row.querySelector(".guide-row-head");
    const body = row.querySelector(".guide-row-body");
    head.addEventListener("click", () => {
      const isHidden = body.classList.toggle("hidden");
      head.setAttribute("aria-expanded", String(!isHidden));
    });
    list.appendChild(row);
  });
}

