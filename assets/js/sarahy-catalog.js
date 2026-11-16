/**
 * Banquetes Sarahy — Directorio de 118 Subpáginas, Buscador Omnibar Global y Visor de Ficha Detallada
 */
(function () {
  let servicesCache = null;

  async function loadServices() {
    if (servicesCache) return servicesCache;
    if (Array.isArray(window.ALL_SERVICES_DATA)) {
      servicesCache = window.ALL_SERVICES_DATA;
      return servicesCache;
    }
    const res = await fetch('data/services.json', { cache: 'force-cache' });
    servicesCache = await res.json();
    return servicesCache;
  }

  const CATEGORY_META = {
    all: { label: 'Todos (118)', icon: '🌐' },
    bodas: { label: 'Bodas (8)', icon: '💍' },
    quinces: { label: 'Quinces (6)', icon: '👑' },
    salones: { label: 'Salones (12)', icon: '🏰' },
    gastronomia_menaje: { label: 'Menús & Menaje (28)', icon: '🍽️' },
    shows_decoracion: { label: 'Shows & Decoración (30)', icon: '🎆' },
    comuniones: { label: 'Comuniones (3)', icon: '🕊️' },
    grados_cumpleanos: { label: 'Grados & Cumpleaños (4)', icon: '🎓' },
    empresariales: { label: 'Empresariales (1)', icon: '🏢' },
    general: { label: 'Otros & Paquetes (26)', icon: '✨' }
  };

  function ensureDetailAndSearchModals() {
    if (!document.getElementById('search-modal')) {
      const sm = document.createElement('div');
      sm.id = 'search-modal';
      sm.className = 'fixed inset-0 z-[75] bg-black/85 backdrop-blur-md hidden flex items-center justify-center p-4';
      sm.innerHTML = `
        <div class="glass-panel w-full max-w-2xl rounded-3xl p-6 border-gold-glow flex flex-col max-h-[85vh]">
          <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div class="flex items-center gap-2 text-gold-400 font-cinzel text-lg font-bold">
              <span>🔍 Buscador Omnibar — 118 Subpáginas y Servicios</span>
            </div>
            <button type="button" id="sm-close" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-bold">✕</button>
          </div>
          <input type="text" id="modal-search-input" placeholder="Buscar mariachi, silla tiffany, prado colonial, cabina 360, menaje..." class="w-full bg-zinc-900 border border-gold-500/40 rounded-2xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none mb-4">
          <div id="modal-search-results" class="flex-grow overflow-y-auto space-y-2 pr-1 no-scrollbar"></div>
        </div>
      `;
      document.body.appendChild(sm);
      sm.querySelector('#sm-close').addEventListener('click', () => window.toggleSearchModal(false));
      sm.addEventListener('click', (e) => { if (e.target === sm) window.toggleSearchModal(false); });
      sm.querySelector('#modal-search-input').addEventListener('input', (e) => renderGlobalSearch(e.target.value));
    }

    if (!document.getElementById('sarahy-service-modal')) {
      const dm = document.createElement('div');
      dm.id = 'sarahy-service-modal';
      dm.className = 'fixed inset-0 z-[78] bg-black/90 backdrop-blur-xl hidden flex items-center justify-center p-4';
      dm.innerHTML = `
        <div class="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-gold-500/40 shadow-glow-gold flex flex-col max-h-[90vh]">
          <div class="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
            <img id="sd-img" src="" alt="" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
            <button type="button" id="sd-close" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-gold-500 hover:text-black font-bold transition-colors">✕</button>
            <div class="absolute bottom-4 left-6 right-6">
              <div class="flex flex-wrap items-center gap-2 mb-1.5">
                <span id="sd-cat" class="px-2.5 py-0.5 rounded-full bg-gold-500 text-black text-[10px] font-extrabold uppercase tracking-wider"></span>
                <span id="sd-path" class="text-[11px] text-zinc-300 font-mono bg-black/60 px-2 py-0.5 rounded-md"></span>
              </div>
              <h3 id="sd-title" class="font-cinzel text-xl sm:text-2xl font-bold text-white leading-tight"></h3>
            </div>
          </div>
          <div class="p-6 overflow-y-auto space-y-5">
            <p id="sd-desc" class="text-zinc-300 text-sm leading-relaxed"></p>
            <div class="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/25 text-xs text-zinc-300">
              <strong class="text-gold-300 block mb-1">💡 Política de Tarifa Transparente 2026:</strong>
              Para darte el valor exacto según fecha, sede e invitados (sin precios obsoletos), cotiza este elemento directamente en nuestra aplicación oficial.
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <a id="sd-quote-btn" href="https://app.casadebanquetessarahy.com/" target="_blank" rel="noopener" onclick="window.triggerSarahyConfetti && window.triggerSarahyConfetti()" class="flex-1 py-3.5 px-5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-glow-gold hover:scale-[1.02] transition-transform">
                Cotizar Servicio en Vivo ↗
              </a>
              <a id="sd-wa-btn" href="https://wa.me/573163048505" target="_blank" rel="noopener" class="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider text-center hover:bg-emerald-600/30 transition-colors">
                Consultar por WhatsApp 💬
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(dm);
      const closeSd = () => dm.classList.add('hidden');
      dm.querySelector('#sd-close').addEventListener('click', closeSd);
      dm.addEventListener('click', (e) => { if (e.target === dm) closeSd(); });
    }
  }

  window.openServiceDetail = async function (servicePath) {
    ensureDetailAndSearchModals();
    const list = await loadServices();
    const norm = (servicePath || '').replace(/\/+$/, '').toLowerCase();
    const item = list.find(s => s.path.toLowerCase() === norm) || list[0];
    if (!item) return;

    document.getElementById('sd-img').src = item.image;
    document.getElementById('sd-img').alt = item.title + ' - Casa de Banquetes Sarahy Medellín';
    document.getElementById('sd-cat').textContent = (CATEGORY_META[item.category]?.label || item.category).replace(/\s*\(\d+\)$/, '');
    document.getElementById('sd-path').textContent = item.path;
    document.getElementById('sd-title').textContent = item.title;
    document.getElementById('sd-desc').textContent = item.desc;
    document.getElementById('sd-wa-btn').href = `https://wa.me/573163048505?text=${encodeURIComponent('Hola Banquetes Sarahy, deseo cotizar e información sobre: ' + item.title + ' (' + item.path + ')')}`;

    document.getElementById('sarahy-service-modal').classList.remove('hidden');
  };

  async function renderGlobalSearch(query) {
    const container = document.getElementById('modal-search-results');
    if (!container) return;
    const list = await loadServices();
    const q = (query || '').toLowerCase().trim();
    const results = q
      ? list.filter(s => s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.path.toLowerCase().includes(q))
      : list.slice(0, 15);

    container.innerHTML = '';
    if (!results.length) {
      container.innerHTML = '<div class="text-center py-8 text-zinc-400 text-sm">No se encontraron servicios con ese criterio.</div>';
      return;
    }

    results.forEach(item => {
      const row = document.createElement('div');
      row.className = 'p-3 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/30 flex items-center justify-between gap-3 transition-colors';
      row.innerHTML = `
        <button type="button" class="flex items-center gap-3 text-left flex-grow min-w-0">
          <img src="${item.image}" alt="${item.title}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0">
          <div class="min-w-0">
            <div class="text-white text-sm font-semibold truncate">${item.title}</div>
            <div class="text-[11px] text-zinc-400 truncate">${item.path} • ${(CATEGORY_META[item.category]?.label || item.category).replace(/\s*\(\d+\)$/, '')}</div>
          </div>
        </button>
        <div class="flex items-center gap-2 flex-shrink-0">
          <button type="button" data-open class="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs">Ver Ficha</button>
          <a href="https://app.casadebanquetessarahy.com/" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-lg bg-gold-gradient text-black font-bold text-xs uppercase">Cotizar</a>
        </div>
      `;
      row.querySelector('button').addEventListener('click', () => {
        window.toggleSearchModal(false);
        window.openServiceDetail(item.path);
      });
      row.querySelector('[data-open]').addEventListener('click', () => {
        window.toggleSearchModal(false);
        window.openServiceDetail(item.path);
      });
      container.appendChild(row);
    });
  }

  window.toggleSearchModal = function (show) {
    ensureDetailAndSearchModals();
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    if (show) {
      modal.classList.remove('hidden');
      const inp = document.getElementById('modal-search-input');
      if (inp) {
        inp.value = '';
        inp.focus();
      }
      renderGlobalSearch('');
    } else {
      modal.classList.add('hidden');
    }
  };

  window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
  };

  /**
   * Monta el directorio completo de las 118 subpáginas en `containerId`.
   */
  window.mountSarahyCatalog = async function (options) {
    const root = document.getElementById(options.containerId);
    if (!root) return;
    const list = await loadServices();
    let currentCat = options.defaultCategory || 'all';
    let currentQuery = '';
    let limit = options.initialLimit || 24;

    const catsOrder = ['all', 'bodas', 'quinces', 'salones', 'gastronomia_menaje', 'shows_decoracion', 'comuniones', 'grados_cumpleanos', 'empresariales', 'general'];

    root.innerHTML = `
      <div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar" data-cat-pills></div>
      <div class="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row gap-3 items-center">
        <div class="relative w-full">
          <input type="text" data-cat-search placeholder="Buscar entre las 118 subpáginas (ej: mariachi, sillas tiffany, prado, carpa...)" class="w-full bg-zinc-900 border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-gold-500 focus:outline-none">
          <span class="absolute left-4 top-3.5 text-zinc-400 text-sm">🔍</span>
        </div>
        <button type="button" data-show-all class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gold-500/15 border border-gold-500/40 text-gold-300 font-bold text-xs uppercase tracking-wider hover:bg-gold-500 hover:text-black transition-all whitespace-nowrap">
          Mostrar Todas (118)
        </button>
      </div>
      <div data-cat-grid class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"></div>
      <div class="text-center mt-10 hidden" data-cat-more-wrap>
        <button type="button" data-cat-more class="px-8 py-3.5 rounded-2xl glass-panel border border-gold-500/40 text-gold-300 font-bold text-xs uppercase tracking-wider hover:bg-gold-500/15 transition-all"></button>
      </div>
    `;

    const pillsEl = root.querySelector('[data-cat-pills]');
    const gridEl = root.querySelector('[data-cat-grid]');
    const searchEl = root.querySelector('[data-cat-search]');
    const showAllBtn = root.querySelector('[data-show-all]');
    const moreWrap = root.querySelector('[data-cat-more-wrap]');
    const moreBtn = root.querySelector('[data-cat-more]');

    function renderPills() {
      pillsEl.innerHTML = '';
      catsOrder.forEach(cat => {
        const meta = CATEGORY_META[cat];
        if (!meta) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        const active = cat === currentCat;
        btn.className = active
          ? 'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-500 text-black shadow-glow-gold whitespace-nowrap transition-all'
          : 'px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider glass-panel text-zinc-300 hover:text-white hover:border-gold-500/50 whitespace-nowrap transition-all';
        btn.textContent = `${meta.icon} ${meta.label}`;
        btn.addEventListener('click', () => {
          currentCat = cat;
          limit = 24;
          renderPills();
          renderCards();
        });
        pillsEl.appendChild(btn);
      });
    }

    function renderCards() {
      const q = currentQuery.toLowerCase().trim();
      const filtered = list.filter(item => {
        const catOk = currentCat === 'all' || item.category === currentCat;
        if (!catOk) return false;
        if (!q) return true;
        return item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.path.toLowerCase().includes(q);
      });

      const slice = filtered.slice(0, limit);
      gridEl.innerHTML = '';
      slice.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 flex flex-col transition-all duration-300 group';
        card.innerHTML = `
          <button type="button" data-detail class="relative h-44 overflow-hidden text-left w-full block">
            <img src="${item.image}" alt="${item.title} Banquetes Sarahy Medellín" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-gold-300 text-[10px] uppercase font-bold tracking-wider border border-gold-500/30">
              ${(CATEGORY_META[item.category]?.label || item.category).replace(/\s*\(\d+\)$/, '')}
            </span>
          </button>
          <div class="p-4 flex flex-col flex-grow justify-between">
            <div>
              <h4 class="font-cinzel font-bold text-sm text-white mb-1 line-clamp-1">${item.title}</h4>
              <p class="text-zinc-400 text-xs line-clamp-2 mb-3 font-light">${item.desc}</p>
            </div>
            <div class="flex gap-2">
              <button type="button" data-open-detail class="flex-1 py-2 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-200 font-semibold text-[11px] uppercase tracking-wider transition-all text-center">
                Ver Ficha
              </button>
              <a href="https://app.casadebanquetessarahy.com/" target="_blank" rel="noopener" class="flex-1 py-2 px-2 rounded-xl bg-gold-500/15 hover:bg-gold-500 border border-gold-500/40 hover:border-gold-500 text-gold-300 hover:text-black font-bold text-[11px] uppercase tracking-wider transition-all text-center">
                Cotizar ↗
              </a>
            </div>
          </div>
        `;
        card.querySelector('[data-detail]').addEventListener('click', () => window.openServiceDetail(item.path));
        card.querySelector('[data-open-detail]').addEventListener('click', () => window.openServiceDetail(item.path));
        gridEl.appendChild(card);
      });

      const rem = filtered.length - slice.length;
      if (rem > 0) {
        moreWrap.classList.remove('hidden');
        moreBtn.textContent = `Cargar Más (${rem} subpáginas restantes)`;
      } else {
        moreWrap.classList.add('hidden');
      }
    }

    searchEl.addEventListener('input', (e) => {
      currentQuery = e.target.value;
      limit = 24;
      renderCards();
    });

    showAllBtn.addEventListener('click', () => {
      currentCat = 'all';
      currentQuery = '';
      searchEl.value = '';
      limit = list.length;
      renderPills();
      renderCards();
    });

    moreBtn.addEventListener('click', () => {
      limit += 24;
      renderCards();
    });

    renderPills();
    renderCards();
  };

  // Auto-open legacy Hostinger subpage detail modal if URL path or ?s= matches services.json
  document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const qService = params.get('s') || params.get('servicio');
    const curPath = window.location.pathname.replace(/\/+$/, '').toLowerCase();
    const list = await loadServices();

    const target = qService
      ? list.find(s => s.path.toLowerCase() === qService.toLowerCase())
      : (curPath && !['', '/', '/index.html', '/bodas', '/bodas.html', '/quinces', '/quinces.html', '/salones', '/salones.html', '/servicios', '/servicios.html', '/politicas', '/politicas.html'].includes(curPath)
        ? list.find(s => s.path.toLowerCase() === curPath)
        : null);

    if (target) {
      window.openServiceDetail(target.path);
    }
  });
})();
