/**
 * Web Implementation of the Lens Price List
 * Fully adapted from React Native lens-price.tsx
 * Premium dark brand design: #0F172A + #22D3EE
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lens-pricing-app');
  if (!container) return;

  // Wait for LensData to be available
  function init() {
    if (!window.LensData) {
      setTimeout(init, 50);
      return;
    }
    renderApp();
  }
  init();

  function renderApp() {
    const { categories, lensDetails, ICONS, VIDEOS } = window.LensData;

    // ─── Tone Schemes (from RN getToneScheme) ────────────────────────────────
    function getToneScheme(tone) {
      if (tone === 'gold') return {
        card: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04) 0%, #FFFFFF 40%)',
        border: 'rgba(245, 158, 11, 0.15)',
        badgeBg: 'rgba(245, 158, 11, 0.08)',
        priceColor: '#0F172A',
        accent: '#D97706',
        accent2: '#F59E0B',
        modal: 'linear-gradient(160deg, #1a2739 0%, #223042 40%, #31475F 100%)',
        iconGrad: 'linear-gradient(135deg, #47D7FF, #7E76FF, #F0C448)',
        glow: 'rgba(245, 158, 11, 0.2)',
      };
      if (tone === 'premium') return {
        card: 'linear-gradient(180deg, rgba(245, 158, 11, 0.03) 0%, #FFFFFF 40%)',
        border: 'rgba(245, 158, 11, 0.12)',
        badgeBg: 'rgba(245, 158, 11, 0.06)',
        priceColor: '#0F172A',
        accent: '#D97706',
        accent2: '#F59E0B',
        modal: 'linear-gradient(160deg, #1e2e42 0%, #263649 40%, #37516D 100%)',
        iconGrad: 'linear-gradient(135deg, #45DCFF, #4F87FF, #FFD86D)',
        glow: 'rgba(245, 158, 11, 0.15)',
      };
      if (tone === 'special') return {
        card: 'linear-gradient(180deg, rgba(99, 102, 241, 0.04) 0%, #FFFFFF 40%)',
        border: 'rgba(99, 102, 241, 0.15)',
        badgeBg: 'rgba(99, 102, 241, 0.08)',
        priceColor: '#0F172A',
        accent: '#6366F1',
        accent2: '#8B5CF6',
        modal: 'linear-gradient(160deg, #1c2c46 0%, #283B59 40%, #3A5C87 100%)',
        iconGrad: 'linear-gradient(135deg, #53D8FF, #7E76FF, #8EB7FF)',
        glow: 'rgba(99, 102, 241, 0.2)',
      };
      return { // basic (Brand Cyan to White)
        card: 'linear-gradient(180deg, rgba(14, 165, 233, 0.04) 0%, #FFFFFF 40%)',
        border: 'rgba(14, 165, 233, 0.15)',
        badgeBg: 'rgba(14, 165, 233, 0.08)',
        priceColor: '#0F172A',
        accent: '#0284C7',
        accent2: '#0EA5E9',
        modal: 'linear-gradient(160deg, #1e3149 0%, #30435B 40%, #426181 100%)',
        iconGrad: 'linear-gradient(135deg, #78F2DD, #45DCFF, #4F87FF)',
        glow: 'rgba(14, 165, 233, 0.2)',
      };
    }

    function getToneLabel(tone) {
      if (tone === 'gold' || tone === 'premium') return 'ПРЕМИУМ';
      if (tone === 'special') return 'СПЕЦИАЛЬНЫЕ';
      return 'БАЗОВЫЕ';
    }

    function getPaletteGradient(color) {
      const n = color.toLowerCase();
      if (n === '#212121') return 'linear-gradient(135deg, #05070c, #1c2230, #7f8aa7)';
      if (n === '#8b5a2b') return 'linear-gradient(135deg, #4f1f08, #9a531f, #ffcb7f)';
      if (n === '#2da76b') return 'linear-gradient(135deg, #0a4c2b, #17a763, #96ffd0)';
      if (n === '#2c8eff') return 'linear-gradient(135deg, #103d98, #2490ff, #9df6ff)';
      if (n === '#8d63ff') return 'linear-gradient(135deg, #4a168f, #8e56ff, #e8abff)';
      return 'linear-gradient(135deg, #21546c, #34a8d4, #a8f2ff)';
    }

    function getCategoryVisual(id) {
      if (id === 'basic') return {
        bg: 'linear-gradient(135deg, #22d3ee, #38bdf8)',
        glow: 'rgba(34,211,238,0.22)',
        subtitle: 'Самые доступные и понятные варианты',
        underline: 'linear-gradient(90deg, #22D3EE, #7DEFFF, #B5F7FF)',
        // Tag / price icon — базовые = доступно, просто, понятно
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
      };
      if (id === 'special') return {
        bg: 'linear-gradient(135deg, #0EA5E9, #22d3ee)',
        glow: 'rgba(14,165,233,0.22)',
        subtitle: 'Решения под особые задачи',
        underline: 'linear-gradient(90deg, #22D3EE, #66C9FF, #0EA5E9)',
        // Sliders / adjustment icon — специальные = для особых случаев, настройка
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
      };
      return {
        bg: 'linear-gradient(135deg, #22D3EE 0%, #38BDF8 35%, #F0C448 80%, #F59E0B 100%)',
        glow: 'rgba(34,211,238,0.28)',
        subtitle: 'Более сильные и эстетичные линзы',
        underline: 'linear-gradient(90deg, #22D3EE, #F0C448, #F59E0B)',
        // Crown icon — премиальные = лучшее качество
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7z"/><line x1="5" y1="20" x2="19" y2="20"/></svg>`,
      };
    }

    function formatPrice(v) { return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

    function getTotalMeta(total) {
      if (total >= 34) return { title: 'Максимально сильный вариант', text: 'Один из самых продуманных вариантов в витрине. Здесь минимум компромиссов и заметно более высокий уровень.' };
      if (total >= 29) return { title: 'Сильный продвинутый вариант', text: 'Очень удачное решение на каждый день: больше комфорта, лучше внешний вид и меньше слабых мест.' };
      if (total >= 24) return { title: 'Хороший сбалансированный вариант', text: 'Надёжный уровень для повседневной носки. Уже заметно приятнее базовых решений, но без лишнего перегруза по цене.' };
      if (total >= 19) return { title: 'Практичный повседневный вариант', text: 'Нормальный рабочий уровень. Базовые задачи закрывает уверенно, но по ощущениям и функциям уступает более сильным позициям.' };
      return { title: 'Самый простой уровень', text: 'Это решение в первую очередь про доступность и базовую коррекцию. Его выбирают, когда главное — не переплачивать.' };
    }

    // ─── Pre-calculate meta ────────────────────────────────────────────────────
    const lensMetaById = {};
    categories.forEach(cat => {
      cat.items.forEach(item => {
        lensMetaById[item.id] = {
          item,
          tone: item.accent || cat.accent,
          catTitle: cat.title,
        };
      });
    });

    // ─── Render HTML ───────────────────────────────────────────────────────────
    let html = '<div class="lp-hint-bar"><span class="lp-hint-icon">ℹ</span><span>Выбери уровень линз → нажми на позицию → откроется видео, плюсы, минусы и честная оценка</span></div>';
    html += '<div class="lp-price-note"><span class="lp-price-note-label">Цены указаны за 1 линзу</span><div class="lp-diopter-badges"><span class="lp-diopter-badge lp-diopter-badge--from">до 2.75 дптр</span><span class="lp-diopter-separator">·</span><span class="lp-diopter-badge lp-diopter-badge--to">от 3.00 дптр</span></div></div>';

    categories.forEach(cat => {
      const visual = getCategoryVisual(cat.id);
      html += `
        <div class="lp-category" data-cat-id="${cat.id}">
          <button class="lp-category-header" type="button" aria-expanded="false">
            <div class="lp-cat-left">
              <div class="lp-cat-icon" style="background: ${visual.bg}; box-shadow: 0 4px 18px ${visual.glow}">
                ${visual.icon}
              </div>
              <div class="lp-cat-text">
                <h3 class="lp-cat-title">${cat.title}</h3>
                <div class="lp-cat-underline" style="background: ${visual.underline}"></div>
                <p class="lp-cat-subtitle">${visual.subtitle}</p>
              </div>
            </div>
            <div class="lp-cat-right">
              <span class="lp-cat-count">${cat.items.length}</span>
              <span class="lp-cat-chevron">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
          </button>
          <div class="lp-category-body">
      `;

      cat.items.forEach(item => {
        const meta = lensMetaById[item.id];
        const scheme = getToneScheme(meta.tone);

        let paletteHtml = '';
        if (item.paletteColors && item.paletteColors.length > 0) {
          paletteHtml = `
            <div class="lp-palette">
              <div class="lp-palette-dots">
                ${item.paletteColors.map(c => `<div class="lp-palette-dot" style="background: ${getPaletteGradient(c)}"></div>`).join('')}
              </div>
              ${item.paletteLabel ? `<span class="lp-palette-label">${item.paletteLabel}</span>` : ''}
            </div>
          `;
        }

        const iconSrc = ICONS[item.iconKey];
        const hasIcon = iconSrc && !iconSrc.includes('undefined');

        html += `
          <div class="lp-item" data-lens-id="${item.id}" style="background: ${scheme.card}; border-color: ${scheme.border}; --accent: ${scheme.accent}; --glow: ${scheme.glow}">
            <div class="lp-item-top">
              <div class="lp-item-left">
                <div class="lp-item-icon-wrap" style="background: ${scheme.iconGrad}; box-shadow: 0 4px 16px ${scheme.glow}">
                  ${hasIcon ? `<img src="${iconSrc}" alt="${item.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
                  <div class="lp-icon-fallback" ${hasIcon ? 'style="display:none"' : ''}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </div>
                </div>
                <div class="lp-item-info">
                  <h4 class="lp-item-title">${item.title}</h4>
                  <p class="lp-item-desc">${item.description}</p>
                  ${paletteHtml}
                </div>
              </div>
              <div class="lp-item-right">
                <div class="lp-price-badge" style="background: ${scheme.badgeBg}; border-color: ${scheme.border}">
                  <div class="lp-price-inner">
                    <span class="lp-price-val lp-price-from" style="color: ${scheme.priceColor}">${formatPrice(item.priceFrom)}</span>
                    <div class="lp-price-div" style="background: ${scheme.accent}"></div>
                    <span class="lp-price-val lp-price-to" style="color: ${scheme.priceColor}">${formatPrice(item.priceTo)}</span>
                  </div>
                  <span class="lp-price-unit">сом</span>
                </div>
                <button class="lp-more-btn" type="button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        `;
      });

      html += '</div></div>';
    });

    // Modal
    html += `
      <div class="lp-modal-overlay" id="lpModalOverlay">
        <div class="lp-modal" id="lpModal">
          <div class="lp-modal-header" id="lpModalHeader">
            <button class="lp-modal-close" id="lpModalClose" type="button" aria-label="Закрыть">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="lp-modal-head-titles">
              <h3 class="lp-modal-head-title" id="lpModalTitle"></h3>
              <p class="lp-modal-head-sub" id="lpModalSubTitle"></p>
            </div>
            <div class="lp-modal-price-wrap" id="lpModalPriceWrap">
              <div class="lp-price-badge lp-modal-price-badge" id="lpModalPriceBadge">
                <div class="lp-price-inner">
                  <span class="lp-price-val lp-price-from" id="lpModalPriceFrom"></span>
                  <div class="lp-price-div" id="lpModalPriceDiv"></div>
                  <span class="lp-price-val lp-price-to" id="lpModalPriceTo"></span>
                </div>
                <span class="lp-price-unit">сом</span>
              </div>
            </div>
          </div>
          <div class="lp-modal-body" id="lpModalBody"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // ─── Category Accordion ────────────────────────────────────────────────────
    container.querySelectorAll('.lp-category-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.closest('.lp-category');
        const isOpen = cat.classList.contains('is-open');
        // close all
        container.querySelectorAll('.lp-category.is-open').forEach(c => {
          c.classList.remove('is-open');
          c.querySelector('.lp-category-header').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          cat.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // All categories closed by default — user opens manually

    // ─── Modal ─────────────────────────────────────────────────────────────────
    const overlay = document.getElementById('lpModalOverlay');
    const modal = document.getElementById('lpModal');
    const modalClose = document.getElementById('lpModalClose');
    const modalBody = document.getElementById('lpModalBody');
    const mdTitle = document.getElementById('lpModalTitle');
    const mdSub = document.getElementById('lpModalSubTitle');
    const mdPriceFrom = document.getElementById('lpModalPriceFrom');
    const mdPriceTo = document.getElementById('lpModalPriceTo');
    const mdPriceBadge = document.getElementById('lpModalPriceBadge');
    const mdPriceDiv = document.getElementById('lpModalPriceDiv');

    function openModal(lensId) {
      const detail = lensDetails[lensId];
      const meta = lensMetaById[lensId];
      if (!detail || !meta) return;

      const { item, tone } = meta;
      const scheme = getToneScheme(tone);

      mdTitle.textContent = detail.title;
      mdSub.textContent = detail.shortLabel;
      mdPriceFrom.textContent = formatPrice(item.priceFrom);
      mdPriceTo.textContent = formatPrice(item.priceTo);
      mdPriceFrom.style.color = '#FFFFFF';
      mdPriceTo.style.color = '#FFFFFF';
      mdPriceBadge.style.background = scheme.badgeBg;
      mdPriceBadge.style.borderColor = scheme.border;
      mdPriceDiv.style.background = scheme.accent;
      modal.style.background = scheme.modal;
      modal.style.borderColor = scheme.border;

      // Build body
      let body = '';

      // Video
      const videoSrc = VIDEOS[detail.videoKey];
      if (videoSrc) {
        body += `
          <div class="lp-video-wrap">
            <video class="lp-video" src="${videoSrc}" autoplay loop muted playsinline></video>
            <p class="lp-video-caption">Видео: как выглядит ${detail.title.toLowerCase()} вживую</p>
          </div>
        `;
      }

      // Warning
      if (detail.warning) {
        body += `<div class="lp-warning-card"><span class="lp-warning-icon">⚠️</span><p>${detail.warning}</p></div>`;
      }

      // Short summary
      body += `
        <div class="lp-modal-card">
          <div class="lp-card-head"><div class="lp-glow-dot" style="background: ${scheme.accent}; box-shadow: 0 0 10px ${scheme.accent}"></div><h4>Коротко и честно</h4></div>
          <p class="lp-summary-text">${detail.honestSummary}</p>
        </div>
      `;

      // Hero section
      body += `
        <div class="lp-modal-card lp-hero-card">
          <div class="lp-hero-pills">
            <span class="lp-pill" style="color: ${scheme.accent}; border-color: ${scheme.border}">${detail.shortLabel}</span>
            <span class="lp-pill lp-pill-warm">${getToneLabel(tone)}</span>
          </div>
          <h3 class="lp-hero-title">${detail.title}</h3>
          <h4 class="lp-hero-subtitle">${detail.heroTitle}</h4>
          <p class="lp-hero-body">${detail.heroText}</p>
          <p class="lp-hero-body" style="margin-top: 8px; opacity: 0.85">${detail.materialNote} ${detail.coatingNote} ${detail.thicknessNote}</p>
          <div class="lp-price-note-card">
            <h5>Что важно знать о цене</h5>
            <p>${detail.priceNote}</p>
          </div>
          <div class="lp-consult-card" style="border-color: ${scheme.accent}30">
            <h5 class="lp-consult-title">Мнение консультанта</h5>
            <p class="lp-consult-text">"${detail.consultantOpinion}"</p>
            <span class="lp-consult-badge">${detail.consultantName} · ${detail.consultantDate}</span>
          </div>
          <p class="lp-care-text">💡 ${detail.careTips.join(' • ')}</p>
        </div>
      `;

      // Color variants
      if (detail.colorVariants && detail.colorVariants.length > 0) {
        body += `
          <div class="lp-modal-card">
            <div class="lp-card-head"><div class="lp-glow-dot" style="background: ${scheme.accent}"></div><h4>Цвета хамелеона: ${detail.colorVariants.length} варианта</h4></div>
            <div class="lp-color-grid">
              ${detail.colorVariants.map(v => `
                <div class="lp-color-item">
                  <div class="lp-color-dot" style="background: linear-gradient(135deg, ${v.colors[0]}, ${v.colors[1]}, ${v.colors[2]})"></div>
                  <h5 class="lp-color-name">${v.name}</h5>
                  <p class="lp-color-note">${v.note}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      // Who fits
      body += `
        <div class="lp-modal-card">
          <div class="lp-card-head"><div class="lp-glow-dot" style="background: ${scheme.accent}"></div><h4>Кому подходит</h4></div>
          ${detail.whoFits.map(row => `<div class="lp-list-row"><span class="lp-list-mark" style="color: ${scheme.accent}">•</span><span class="lp-list-text">${row}</span></div>`).join('')}
        </div>
      `;

      // Pros / Cons
      body += `
        <div class="lp-pros-cons">
          <div class="lp-half-card lp-good-card">
            <div class="lp-card-head"><div class="lp-glow-dot" style="background: #79F2B7; box-shadow: 0 0 8px #79F2B750"></div><h4>Плюсы</h4></div>
            ${detail.pros.map(row => `<div class="lp-list-row"><span class="lp-list-mark" style="color: #79F2B7">+</span><span class="lp-list-text">${row}</span></div>`).join('')}
          </div>
          <div class="lp-half-card lp-bad-card">
            <div class="lp-card-head"><div class="lp-glow-dot" style="background: #FFB2B2; box-shadow: 0 0 8px #FFB2B250"></div><h4>Минусы</h4></div>
            ${detail.cons.map(row => `<div class="lp-list-row"><span class="lp-list-mark" style="color: #FFB2B2">−</span><span class="lp-list-text">${row}</span></div>`).join('')}
          </div>
        </div>
      `;

      // Scores
      const totalScore = detail.scores.reduce((s, x) => s + x.value, 0);
      const totalMeta = getTotalMeta(totalScore);
      body += `
        <div class="lp-modal-card">
          <div class="lp-card-head"><div class="lp-glow-dot" style="background: ${scheme.accent}"></div><h4>Оценка по параметрам</h4></div>
          ${detail.scores.map(s => `
            <div class="lp-score-row">
              <span class="lp-score-label">${s.label}</span>
              <div class="lp-score-track">
                <div class="lp-score-fill" style="width: ${s.value * 20}%; background: linear-gradient(90deg, ${scheme.accent}, ${scheme.accent2})"></div>
              </div>
              <span class="lp-score-val">${s.value}/5</span>
            </div>
          `).join('')}
          <div class="lp-total-card">
            <div class="lp-total-top">
              <h5 class="lp-total-title">${totalMeta.title}</h5>
              <span class="lp-total-badge">${totalScore}/40</span>
            </div>
            <p class="lp-total-text">${totalMeta.text}</p>
          </div>
        </div>
      `;

      modalBody.innerHTML = body;
      document.body.style.overflow = 'hidden';
      overlay.classList.add('is-active');

      // Auto-play video
      const vid = modalBody.querySelector('video');
      if (vid) {
        vid.play().catch(() => {});
      }
    }

    function closeModal() {
      const vid = modalBody.querySelector('video');
      if (vid) { vid.pause(); vid.currentTime = 0; }
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Item click: either the card or the button
    container.addEventListener('click', e => {
      const item = e.target.closest('.lp-item');
      if (item) {
        const lensId = item.getAttribute('data-lens-id');
        if (lensId) openModal(lensId);
      }
    });
  }
});
