(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fileName = src => src.split("/").pop();
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Media slots: show the file if it exists, a placeholder if not ---------- */
  function fillSlot(fig, item) {
    fig.classList.add("slot", "slot-" + item.type);
    if (item.landscape) fig.classList.add("slot-landscape");
    fig.innerHTML =
      `<span class="ph"><span class="ph-icon" aria-hidden="true">${item.type === "video" ? "▶" : "+"}</span>` +
      `<span class="ph-label">${esc(item.label)}</span>` +
      `<span class="ph-file">${esc(fileName(item.src))}</span></span>`;

    if (item.type === "video") {
      const v = document.createElement("video");
      v.controls = true;
      v.playsInline = true;
      v.preload = "metadata";
      if (item.poster) v.poster = item.poster;
      v.addEventListener("loadedmetadata", () => fig.classList.add("has-media"), { once: true });
      v.src = item.src;
      fig.appendChild(v);
    } else {
      const img = new Image();
      img.alt = item.alt || item.label;
      img.decoding = "async";
      img.onload = () => { fig.appendChild(img); fig.classList.add("has-media"); };
      img.src = item.src;
    }
    return fig;
  }
  const slot = item => fillSlot(document.createElement("figure"), item);

  document.querySelectorAll("[data-media]").forEach(fig => {
    try { fillSlot(fig, JSON.parse(fig.dataset.media)); } catch (e) { /* bad JSON: leave empty */ }
  });

  /* ---------- Carousel helper (film strip + project galleries) ---------- */
  function wireCarousel(track, prev, next, counter) {
    const items = () => Array.from(track.children);
    const step = () => (items()[0]?.offsetWidth || 260) + parseFloat(getComputedStyle(track).columnGap || 16);
    const go = dir => track.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    track.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    });
    if (counter) {
      const update = () => {
        const i = Math.round(track.scrollLeft / step());
        counter.textContent = `${Math.min(i + 1, items().length)} / ${items().length}`;
      };
      track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
      update();
    }
  }

  /* ---------- Projects, grouped by role ---------- */
  const rolesEl = $("#roles");
  const roles = window.ROLES || [];
  const singles = document.createElement("div");
  singles.className = "role-pair";

  const previewObserver = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver(entries => entries.forEach(en => {
        const v = en.target;
        if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
      }), { threshold: 0.1 })
    : null;

  function card(p, role) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = `card tint-${p.tint}` + (p.size ? ` size-${p.size}` : "") + (p.preview || p.framed ? " is-video" : "");
    el.setAttribute("aria-haspopup", "dialog");
    const tags = [
      ...(p.badge ? [`<span class="tag tag-award">${esc(p.badge)}</span>`] : []),
      ...(p.keyStats || []).map(s => `<span class="tag tag-stat">${esc(s)}</span>`),
      ...(p.skills || []).map(s => `<span class="tag tag-skill">${esc(s)}</span>`)
    ].join("");
    el.innerHTML = `
      <span class="card-visual">
        <span class="card-stat"><span class="v">${esc(p.stat.value)}</span><span class="l">${esc(p.stat.label)}</span></span>
      </span>
      ${tags ? `<span class="card-tags">${tags}</span>` : ""}
      <span class="card-body">
        <span class="card-kicker">${esc(p.kicker)}</span>
        <span class="card-title">${esc(p.title)}</span>
        <span class="card-blurb">${esc(p.blurb)}</span>
        <span class="card-foot">View project <span aria-hidden="true">→</span></span>
      </span>`;
    const visual = $(".card-visual", el);
    if (p.cover) {
      const img = new Image();
      img.alt = "";
      img.className = "card-cover";
      if (p.coverPosition) img.style.objectPosition = p.coverPosition;
      img.onload = () => { visual.appendChild(img); el.classList.add("has-cover"); };
      img.src = p.cover;
    }
    if (p.preview && !reduceMotion) {
      const v = document.createElement("video");
      v.className = "card-cover card-preview";
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.preload = "metadata";
      v.setAttribute("aria-hidden", "true");
      v.addEventListener("loadeddata", () => {
        visual.appendChild(v);
        el.classList.add("has-cover");
        if (!previewObserver) v.play().catch(() => {});
      }, { once: true });
      v.src = p.preview;
      if (previewObserver) previewObserver.observe(v); else v.autoplay = true;
    }
    el.addEventListener("click", () => openProject(p, role));
    return el;
  }

  roles.forEach(role => {
    const block = document.createElement("div");
    block.className = "role";
    block.innerHTML = `
      <div class="role-head">
        <p class="role-org">${esc(role.org)}${role.team ? ` <span class="role-team">${esc(role.team)}</span>` : ""}</p>
        <p class="role-title">${esc(role.role)}${role.dates ? ` <span class="role-dates">${esc(role.dates)}</span>` : ""}</p>
        ${(role.extraRoles || []).map(([r, d]) => `<p class="role-title">${esc(r)} <span class="role-dates">${esc(d)}</span></p>`).join("")}
        ${role.summary ? `<p class="role-summary">${esc(role.summary)}</p>` : ""}
      </div>`;
    const grid = document.createElement("div");
    grid.className = role.layout === "bento" ? "bento" : "single";
    role.projects.forEach(p => grid.appendChild(card(p, role)));
    block.appendChild(grid);
    (role.layout === "bento" ? rolesEl : singles).appendChild(block);
  });
  if (singles.children.length) rolesEl.appendChild(singles);

  /* ---------- Project modal ---------- */
  const modal = $("#project-modal");
  const modalContent = $("#modal-content");

  function openProject(p, role) {
    const sections = (p.sections || []).map(s => `
      <div class="m-section">
        <h3>${esc(s.h)}</h3>
        ${s.p ? `<p>${esc(s.p)}</p>` : ""}
        ${s.list ? `<ul class="did">${s.list.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
      </div>`).join("");

    const numbers = p.numbers ? `
      <div class="m-section">
        <h3>By the numbers</h3>
        <div class="numbers">${p.numbers.map(([n, l]) => `<div><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join("")}</div>
      </div>` : "";

    let compare = "";
    if (p.compare) {
      const max = Math.max(...p.compare.rows.map(r => r[1]));
      compare = `
        <div class="compare" aria-label="${esc(p.compare.title)}">
          <p class="compare-title">${esc(p.compare.title)}</p>
          ${p.compare.rows.map(([l, v]) => `
            <div class="bar-row">
              <span class="bar-label">${esc(l)}</span>
              <span class="bar"><span style="width:${(v / max) * 100}%"></span></span>
              <span class="bar-val">${v}${esc(p.compare.unit)}</span>
            </div>`).join("")}
        </div>`;
    }

    const links = (p.links || [])
      .map(([t, href]) => `<a class="btn btn-ghost btn-sm" href="${esc(href)}" target="_blank" rel="noopener">${esc(t)} <span aria-hidden="true">↗</span></a>`).join("");

    const isCarousel = p.media.display === "carousel";

    modalContent.innerHTML = `
      <div class="m-head">
        <p class="eyebrow">${esc(role.org)} · ${esc(p.kicker)}</p>
        <h2 id="modal-title">${esc(p.title)}</h2>
        ${p.subtitle ? `<p class="m-sub">${esc(p.subtitle)}</p>` : ""}
        <p class="m-role">${esc(role.role)}${role.dates ? ` · ${esc(role.dates)}` : ""}</p>
        ${(role.extraRoles || []).map(([r, d]) => `<p class="m-role">${esc(r)} · ${esc(d)}</p>`).join("")}
      </div>
      ${p.intro ? `<p class="m-intro">${esc(p.intro)}</p>` : ""}
      <div class="goal"><span class="goal-label">The goal</span><p>${esc(p.goal)}</p></div>
      <div class="m-cols">
        <div class="m-main">${sections}</div>
        <div class="m-side">
          ${numbers}
          ${compare}
          ${p.recognition ? `<div class="m-section"><h3>Recognition</h3><p class="award">${esc(p.recognition)}</p></div>` : ""}
          ${p.tools ? `<div class="m-section"><h3>Tools</h3><ul class="chips chips-fill chips-sm">${p.tools.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
        </div>
      </div>
      ${p.learned ? `<div class="m-section learned"><h3>What I learned</h3><p>${esc(p.learned)}</p></div>` : ""}
      <div class="m-section">
        <div class="gallery-head">
          <h3>${isCarousel ? "Gallery" : "Videos"}</h3>
          ${isCarousel ? `<div class="carousel-ctrl"><span class="count" id="g-count"></span>
            <button type="button" class="round-btn round-sm" id="g-prev" aria-label="Previous image">&larr;</button>
            <button type="button" class="round-btn round-sm" id="g-next" aria-label="Next image">&rarr;</button></div>` : ""}
        </div>
        <div class="${isCarousel ? `g-track${p.media.wide ? " is-wide" : ""}` : `gallery count-${p.media.items.length}${p.media.landscape ? " is-landscape" : ""}`}" ${isCarousel ? 'tabindex="0" aria-label="Image carousel"' : ""}></div>
      </div>
      ${links ? `<div class="modal-links">${links}</div>` : ""}`;

    const target = $(isCarousel ? ".g-track" : ".gallery", modalContent);
    p.media.items.forEach(m => {
      if (isCarousel) {
        const slide = document.createElement("div");
        slide.className = "g-slide";
        if (p.media.wide) {
          const link = document.createElement("a");
          link.className = "g-open";
          link.href = m.src;
          link.target = "_blank";
          link.rel = "noopener";
          link.setAttribute("aria-label", `${m.label}, open full size`);
          link.appendChild(slot(m));
          slide.appendChild(link);
        } else {
          slide.appendChild(slot(m));
        }
        if (m.caption) {
          const cap = document.createElement("p");
          cap.className = "g-cap";
          cap.textContent = m.caption;
          if (p.media.wide) cap.insertAdjacentHTML("beforeend", ' <span class="g-hint">Tap to view full size ↗</span>');
          slide.appendChild(cap);
        }
        if (m.link) {
          const a = document.createElement("a");
          a.className = "g-link";
          a.href = m.link;
          a.target = "_blank";
          a.rel = "noopener";
          a.innerHTML = 'Watch on Instagram <span aria-hidden="true">↗</span>';
          slide.appendChild(a);
        }
        target.appendChild(slide);
      } else {
        target.appendChild(slot(m));
      }
    });
    if (isCarousel) wireCarousel(target, $("#g-prev"), $("#g-next"), $("#g-count"));

    modal.showModal();
    modal.scrollTop = 0;
    document.documentElement.classList.add("modal-open");
  }

  const closeModal = () => modal.close();
  $("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  modal.addEventListener("close", () => {
    document.documentElement.classList.remove("modal-open");
    modal.querySelectorAll("video").forEach(v => v.pause());
  });

  /* ---------- Film carousel ---------- */
  const track = $("#film-track");
  (window.FILM || []).forEach(item => {
    const frame = document.createElement("div");
    frame.className = "film-frame";
    frame.appendChild(slot(item));
    if (item.caption) {
      const cap = document.createElement("p");
      cap.className = "film-cap";
      cap.textContent = item.caption;
      frame.appendChild(cap);
    }
    track.appendChild(frame);
  });
  wireCarousel(track, $("#film-prev"), $("#film-next"));

  /* ---------- Globe ---------- */
  const PLACES = {
    hk:  { lon: 114.17, lat: 22.32, name: "Hong Kong", kind: "home" },
    uk:  { lon: -0.13,  lat: 51.51, name: "England" },
    ph:  { lon: 120.98, lat: 14.60, name: "Philippines" },
    van: { lon: -123.12, lat: 49.28, name: "Vancouver", kind: "now" }
  };
  const ARCS = [["hk", "uk"], ["hk", "ph"], ["hk", "van"]];

  (function globe() {
    const canvas = $("#globe");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const raw = window.GLOBE_DOTS || [];
    const RAD = Math.PI / 180;
    const dots = [];
    for (let i = 0; i < raw.length; i += 2) dots.push([raw[i] * RAD, raw[i + 1] * RAD]);

    let lon0 = -114 * RAD, phi0 = 18 * RAD;    // start centred over Hong Kong
    let target = null, dragging = false, visible = true, lastX = 0, lastY = 0, spinPausedUntil = 0;
    let W = 0, R = 0, colors = {};

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      const g = n => cs.getPropertyValue(n).trim();
      colors = { sea: g("--globe-sea"), land: g("--globe-land"), rim: g("--line"), ink: g("--ink"), accent: g("--accent"), now: g("--now"), bg: g("--card") };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      canvas.width = W * dpr;
      canvas.height = W * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = W / 2 - 22;
    }

    // Orthographic projection: returns [x, y, depth]
    function project(lam, phi, lift = 1) {
      const cphi = Math.cos(phi), dl = lam + lon0;
      const x = cphi * Math.sin(dl);
      const y = Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * cphi * Math.cos(dl);
      const z = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * cphi * Math.cos(dl);
      return [W / 2 + R * lift * x, W / 2 - R * lift * y, z];
    }

    function toVec(lam, phi) { return [Math.cos(phi) * Math.cos(lam), Math.cos(phi) * Math.sin(lam), Math.sin(phi)]; }
    function fromVec([x, y, z]) { return [Math.atan2(y, x), Math.asin(Math.max(-1, Math.min(1, z)))]; }

    function arcPoints(a, b, n = 48) {
      const va = toVec(a.lon * RAD, a.lat * RAD), vb = toVec(b.lon * RAD, b.lat * RAD);
      const d = Math.acos(va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]);
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n, s = Math.sin(d);
        const k1 = Math.sin((1 - t) * d) / s, k2 = Math.sin(t * d) / s;
        const [lam, phi] = fromVec([k1 * va[0] + k2 * vb[0], k1 * va[1] + k2 * vb[1], k1 * va[2] + k2 * vb[2]]);
        pts.push(project(lam, phi, 1 + 0.12 * Math.sin(Math.PI * t)));
      }
      return pts;
    }

    function draw() {
      ctx.clearRect(0, 0, W, W);
      const c = W / 2;

      ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fillStyle = colors.sea; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = colors.rim; ctx.stroke();

      ctx.fillStyle = colors.land;
      const size = Math.max(1.2, R / 95);
      for (const [lam, phi] of dots) {
        const [x, y, z] = project(lam, phi);
        if (z <= 0) continue;
        ctx.globalAlpha = 0.35 + 0.65 * z;
        ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.strokeStyle = colors.accent; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]);
      for (const [a, b] of ARCS) {
        const pts = arcPoints(PLACES[a], PLACES[b]);
        ctx.beginPath();
        let pen = false;
        for (const [x, y, z] of pts) {
          if (z > -0.08) { pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y); pen = true; } else pen = false;
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.font = `600 ${Math.max(10, R / 14)}px "Plus Jakarta Sans", system-ui, sans-serif`;
      for (const key in PLACES) {
        const p = PLACES[key];
        const [x, y, z] = project(p.lon * RAD, p.lat * RAD);
        if (z <= 0) continue;
        const col = p.kind === "now" ? colors.now : colors.accent;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fillStyle = colors.bg; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
        const tw = ctx.measureText(p.name).width;
        const lx = Math.min(Math.max(x + 10, 4), W - tw - 4);
        ctx.lineWidth = 3; ctx.strokeStyle = colors.bg; ctx.strokeText(p.name, lx, y + 4);
        ctx.fillStyle = colors.ink; ctx.fillText(p.name, lx, y + 4);
      }
    }

    function tick() {
      if (target) {
        const TAU = Math.PI * 2;
        const dl = ((((target[0] - lon0 + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
        const dp = target[1] - phi0;
        lon0 += dl * 0.08; phi0 += dp * 0.08;
        if (Math.abs(dl) < 0.002 && Math.abs(dp) < 0.002) target = null;
      } else if (!dragging && !reduceMotion && performance.now() > spinPausedUntil) {
        lon0 += 0.0025;
      }
      if (visible) draw();
      requestAnimationFrame(tick);
    }

    function focus(key) {
      const p = PLACES[key];
      const t = [-p.lon * RAD, Math.max(-0.6, Math.min(0.6, p.lat * RAD))];
      spinPausedUntil = performance.now() + 6000;
      if (reduceMotion) { lon0 = t[0]; phi0 = t[1]; draw(); } else target = t;
      document.querySelectorAll("#places button").forEach(b => b.classList.toggle("is-on", b.dataset.place === key));
    }

    canvas.addEventListener("pointerdown", e => { dragging = true; target = null; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener("pointermove", e => {
      if (!dragging) return;
      lon0 += (e.clientX - lastX) * 0.008;
      phi0 = Math.max(-1.2, Math.min(1.2, phi0 + (e.clientY - lastY) * 0.008));
      lastX = e.clientX; lastY = e.clientY;
      if (reduceMotion) draw();
    });
    const endDrag = () => { dragging = false; spinPausedUntil = performance.now() + 3000; };
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    document.querySelectorAll("#places button").forEach(b => b.addEventListener("click", () => focus(b.dataset.place)));

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(canvas);
    }
    new MutationObserver(() => { readColors(); draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { readColors(); draw(); });
    window.addEventListener("resize", () => { resize(); draw(); });
    document.fonts?.ready.then(draw);

    readColors(); resize(); draw();
    requestAnimationFrame(tick);
  })();

  /* ---------- Copy email ---------- */
  const emailEl = $("#email-text");
  const copied = $("#copied");
  $("#copy-email").addEventListener("click", () => {
    const text = emailEl.textContent.trim();
    const selectIt = () => {
      const r = document.createRange();
      r.selectNodeContents(emailEl);
      const s = getSelection();
      s.removeAllRanges();
      s.addRange(r);
      copied.textContent = "Selected. Press Ctrl/⌘ + C to copy.";
    };
    try {
      navigator.clipboard.writeText(text)
        .then(() => { copied.textContent = "Copied"; setTimeout(() => (copied.textContent = ""), 2400); })
        .catch(selectIt);
    } catch (e) { selectIt(); }
  });

  $("#year").textContent = new Date().getFullYear();
})();
