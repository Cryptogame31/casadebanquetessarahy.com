/**
 * Banquetes Sarahy — Motor de Galerías Inmersivas, Reels en Vivo y Lightbox Cinematográfico
 * Carga el manifiesto real data/galleries.json generado desde Sarahy Subir_WEB.
 */
(function () {
  let cachedManifest = null;
  let lbItems = [];
  let lbIndex = 0;

  async function loadManifest() {
    if (cachedManifest) return cachedManifest;
    const res = await fetch('data/galleries.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('No se pudo cargar data/galleries.json');
    cachedManifest = await res.json();
    return cachedManifest;
  }

  function ensureModals() {
    if (!document.getElementById('sarahy-lightbox')) {
      const lb = document.createElement('div');
      lb.id = 'sarahy-lightbox';
      lb.className = 'fixed inset-0 z-[80] bg-black/95 backdrop-blur-xl hidden flex flex-col justify-between p-4 sm:p-6 select-none';
      lb.innerHTML = `
        <div class="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto">
          <div class="flex items-center gap-3 min-w-0">
            <span id="lb-badge" class="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap"></span>
            <span id="lb-counter" class="text-xs text-zinc-400 font-semibold whitespace-nowrap"></span>
          </div>
          <div class="flex items-center gap-2">
            <a href="https://app.casadebanquetessarahy.com/" target="_blank" rel="noopener" onclick="window.triggerSarahyConfetti && window.triggerSarahyConfetti()" class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
              <span>Cotizar esta Experiencia</span>
              <span>↗</span>
            </a>
            <button type="button" id="lb-close" aria-label="Cerrar galería" class="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
              ✕
            </button>
          </div>
        </div>

        <div class="relative flex-grow flex items-center justify-center max-w-6xl w-full mx-auto my-4 overflow-hidden">
          <button type="button" id="lb-prev" aria-label="Foto anterior" class="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/70 border border-white/20 hover:border-gold-400 text-white hover:text-gold-300 flex items-center justify-center text-lg transition-all">
            ‹
          </button>
          <img id="lb-img" src="" alt="" class="max-h-[74vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10 transition-opacity duration-200" />
          <button type="button" id="lb-next" aria-label="Siguiente foto" class="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/70 border border-white/20 hover:border-gold-400 text-white hover:text-gold-300 flex items-center justify-center text-lg transition-all">
            ›
          </button>
        </div>

        <div class="max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p id="lb-caption" class="text-zinc-200 text-xs sm:text-sm font-medium"></p>
          <a href="https://app.casadebanquetessarahy.com/" target="_blank" rel="noopener" class="sm:hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase">
            Cotizar en Vivo ↗
          </a>
        </div>
      `;
      document.body.appendChild(lb);

      lb.querySelector('#lb-close').addEventListener('click', closeLightbox);
      lb.querySelector('#lb-prev').addEventListener('click', () => stepLightbox(-1));
      lb.querySelector('#lb-next').addEventListener('click', () => stepLightbox(1));
      lb.addEventListener('click', (e) => {
        if (e.target === lb) closeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (lb.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') stepLightbox(-1);
        else if (e.key === 'ArrowRight') stepLightbox(1);
      });
    }

    if (!document.getElementById('sarahy-video-modal')) {
      const vm = document.createElement('div');
      vm.id = 'sarahy-video-modal';
      vm.className = 'fixed inset-0 z-[85] bg-black/95 backdrop-blur-xl hidden flex items-center justify-center p-4';
      vm.innerHTML = `
        <div class="glass-panel w-full max-w-3xl rounded-3xl p-4 sm:p-6 border border-gold-500/40 relative flex flex-col gap-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <span id="vm-badge" class="text-[11px] uppercase tracking-widest text-gold-400 font-bold"></span>
              <h3 id="vm-title" class="font-cinzel text-lg sm:text-xl font-bold text-white"></h3>
            </div>
            <button type="button" id="vm-close" aria-label="Cerrar video" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold">✕</button>
          </div>
          <div class="rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-[70vh]">
            <video id="vm-player" controls playsinline class="max-h-[68vh] w-auto mx-auto rounded-xl"></video>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span class="text-xs text-zinc-400">Producción real en vivo — Casa de Banquetes Sarahy Medellín</span>
            <a href="https://app.casadebanquetessarahy.com/" target="_blank" rel="noopener" onclick="window.triggerSarahyConfetti && window.triggerSarahyConfetti()" class="px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-gold hover:scale-105 transition-transform">
              Cotizar este Show / Evento ↗
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(vm);

      const closeVid = () => {
        const player = vm.querySelector('#vm-player');
        player.pause();
        player.removeAttribute('src');
        player.load();
        vm.classList.add('hidden');
      };
      vm.querySelector('#vm-close').addEventListener('click', closeVid);
      vm.addEventListener('click', (e) => {
        if (e.target === vm) closeVid();
      });
    }
  }

  function showLightboxItem() {
    const item = lbItems[lbIndex];
    if (!item) return;
    document.getElementById('lb-img').src = item.src;
    document.getElementById('lb-img').alt = item.alt;
    document.getElementById('lb-badge').textContent = item.albumLabel;
    document.getElementById('lb-caption').textContent = item.alt;
    document.getElementById('lb-counter').textContent = `${lbIndex + 1} / ${lbItems.length}`;
  }

  function openLightbox(items, startIndex) {
    ensureModals();
    lbItems = items;
    lbIndex = startIndex || 0;
    showLightboxItem();
    document.getElementById('sarahy-lightbox').classList.remove('hidden');
  }

  function stepLightbox(delta) {
    if (!lbItems.length) return;
    lbIndex = (lbIndex + delta + lbItems.length) % lbItems.length;
    showLightboxItem();
  }

  function closeLightbox() {
    const lb = document.getElementById('sarahy-lightbox');
    if (lb) lb.classList.add('hidden');
  }

  function openVideoModal(video) {
    ensureModals();
    const vm = document.getElementById('sarahy-video-modal');
    const player = document.getElementById('vm-player');
    document.getElementById('vm-badge').textContent = video.badge || 'Reels Sarahy';
    document.getElementById('vm-title').textContent = video.title;
    player.src = video.src;
    player.poster = video.poster || '';
    vm.classList.remove('hidden');
    player.play().catch(() => {});
  }

  window.triggerSarahyConfetti = function () {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF3E0', '#B89025', '#FFFFFF']
      });
    }
  };

  /**
   * Abre directamente la galería Lightbox filtrada por álbum o categoría (ej. botón en card de Salón).
   */
  window.openSarahyAlbum = async function (filterKey) {
    const data = await loadManifest();
    const items = data.photos.filter(p => p.album === filterKey || p.cat === filterKey);
    if (items.length) openLightbox(items, 0);
  };

  window.openSarahyReelBySrc = async function (srcPath) {
    const data = await loadManifest();
    const v = data.videos.find(x => x.src.includes(srcPath)) || data.videos[0];
    if (v) openVideoModal(v);
  };

  /**
   * Renderiza carrusel de Reels en vivo en un contenedor `#id`.
   */
  window.mountSarahyReels = async function (containerId, cats) {
    const root = document.getElementById(containerId);
    if (!root) return;
    try {
      const data = await loadManifest();
      const vids = (!cats || cats === 'all')
        ? data.videos
        : data.videos.filter(v => cats.includes(v.cat));

      root.innerHTML = '';
      vids.forEach((v) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'group relative flex-shrink-0 w-56 sm:w-64 h-80 rounded-2xl overflow-hidden border border-white/15 hover:border-gold-400/70 bg-card text-left shadow-lg hover:shadow-glow-gold transition-all duration-300';
        card.innerHTML = `
          <img src="${v.poster}" alt="${v.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold-500/40 text-gold-300 text-[10px] font-bold uppercase tracking-wider">${v.badge}</span>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform text-base font-black pl-0.5">▶</span>
          </div>
          <div class="absolute bottom-3 left-3 right-3">
            <h4 class="font-cinzel text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">${v.title}</h4>
            <span class="text-[10px] text-gold-300 font-semibold uppercase tracking-wider">Ver Video Real ↗</span>
          </div>
        `;
        card.addEventListener('click', () => openVideoModal(v));
        root.appendChild(card);
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Renderiza una galería fotográfica interactiva con filtros y paginación en `options.containerId`.
   */
  window.mountSarahyGallery = async function (options) {
    const root = document.getElementById(options.containerId);
    if (!root) return;
    try {
      const data = await loadManifest();
      const basePool = options.allowedCats
        ? data.photos.filter(p => options.allowedCats.includes(p.cat) || options.allowedCats.includes(p.album))
        : data.photos;

      const tabs = options.tabs || [];
      let activeTab = options.defaultTab || (tabs[0] ? tabs[0].key : 'all');
      let limit = options.initialLimit || 16;
      const step = options.step || 16;

      root.innerHTML = `
        ${tabs.length ? `<div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-7 no-scrollbar" data-tabs></div>` : ''}
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5" data-grid></div>
        <div class="text-center mt-8 hidden" data-more-wrap>
          <button type="button" data-more-btn class="px-7 py-3 rounded-2xl glass-panel border border-gold-500/40 text-gold-300 font-bold text-xs uppercase tracking-wider hover:bg-gold-500/15 transition-all"></button>
        </div>
      `;

      const tabsEl = root.querySelector('[data-tabs]');
      const gridEl = root.querySelector('[data-grid]');
      const moreWrap = root.querySelector('[data-more-wrap]');
      const moreBtn = root.querySelector('[data-more-btn]');

      function getFiltered() {
        if (activeTab === 'featured') return basePool.filter(p => p.featured);
        if (activeTab === 'all') return basePool;
        return basePool.filter(p => p.cat === activeTab || p.album === activeTab || (Array.isArray(options.tabMatchMap?.[activeTab]) && options.tabMatchMap[activeTab].includes(p.album)));
      }

      function renderTabs() {
        if (!tabsEl) return;
        tabsEl.innerHTML = '';
        tabs.forEach(t => {
          const count = t.key === 'featured'
            ? basePool.filter(p => p.featured).length
            : t.key === 'all'
              ? basePool.length
              : basePool.filter(p => p.cat === t.key || p.album === t.key || (options.tabMatchMap?.[t.key] || []).includes(p.album)).length;
          if (!count) return;
          const btn = document.createElement('button');
          btn.type = 'button';
          const isAct = t.key === activeTab;
          btn.className = isAct
            ? 'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-500 text-black shadow-glow-gold whitespace-nowrap transition-all'
            : 'px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider glass-panel text-zinc-300 hover:text-white hover:border-gold-500/40 whitespace-nowrap transition-all';
          btn.textContent = `${t.label} (${count})`;
          btn.addEventListener('click', () => {
            activeTab = t.key;
            limit = options.initialLimit || 16;
            renderTabs();
            renderGrid();
          });
          tabsEl.appendChild(btn);
        });
      }

      function renderGrid() {
        const items = getFiltered();
        const slice = items.slice(0, limit);
        gridEl.innerHTML = '';
        slice.forEach((item, idx) => {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'group relative h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-gold-400/60 text-left transition-all duration-300';
          card.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-gold-300 text-[10px] font-bold uppercase tracking-wider border border-gold-500/30">${item.albumLabel}</span>
            <span class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">⤢</span>
            <div class="absolute bottom-2.5 left-3 right-3">
              <p class="text-white text-xs font-semibold line-clamp-2 leading-snug">${item.alt}</p>
            </div>
          `;
          card.addEventListener('click', () => openLightbox(items, idx));
          gridEl.appendChild(card);
        });

        const remaining = items.length - slice.length;
        if (remaining > 0) {
          moreWrap.classList.remove('hidden');
          moreBtn.textContent = `Ver más fotos (${remaining} restantes)`;
        } else {
          moreWrap.classList.add('hidden');
        }
      }

      moreBtn.addEventListener('click', () => {
        limit += step;
        renderGrid();
      });

      renderTabs();
      renderGrid();
    } catch (err) {
      console.error(err);
    }
  };
})();
