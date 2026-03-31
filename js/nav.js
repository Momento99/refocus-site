/**
 * ReFocus — единая навигационная панель
 * Подключается на каждой странице: <script src="js/nav.js"></script>
 */
(function () {

  /* ─────────────────────────────────────────────────────────
     CSS
  ───────────────────────────────────────────────────────── */
  var css = `

    @font-face {
      font-family: "RefocusDisplay";
      src: url("fonts/refocus-display.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    /* ── Ключевые кадры ───────────────────────────────── */

    @keyframes rfNavDrop {
      0%   { transform: translateY(-100%); opacity: 0; }
      55%  { opacity: 1; }
      100% { transform: translateY(0); opacity: 1; }
    }

    @keyframes rfFadeUp {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes rfActivePulse {
      0%,100% { opacity: 1; box-shadow: 0 0 0 1px rgba(34,211,238,0.22), 0 0 10px rgba(34,211,238,0.08); }
      50%     { opacity: 1; box-shadow: 0 0 0 1px rgba(34,211,238,0.45), 0 0 22px rgba(34,211,238,0.20); }
    }

    @keyframes rfLineGlow {
      0%,100% { opacity: 0.7; }
      50%     { opacity: 1; }
    }

    /* ── Контейнер ────────────────────────────────────── */
    #globalNav.global-nav {
      position:   fixed   !important;
      top:        0       !important;
      left:       0       !important;
      right:      0       !important;
      height:     60px    !important;
      z-index:    9999    !important;
      box-sizing: border-box !important;

      /* Полностью непрозрачный — одинаков на белых и тёмных страницах */
      background: #0F172A;

      box-shadow:
        inset 0 -1px 0 rgba(255,255,255,0.0),   /* нижняя линия — через ::after */
        0 4px 24px rgba(0,0,0,0.3),
        0 2px 12px rgba(34,211,238,0.04);

      animation: rfNavDrop 0.65s cubic-bezier(0.22,1,0.36,1) both;
      will-change: transform;
      overflow: visible;
    }

    /* Циановая градиент-линия снизу с мягким свечением */
    #globalNav.global-nav::after {
      content: "";
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent      0%,
        transparent      5%,
        rgba(34,211,238,0.35) 25%,
        rgba(34,211,238,0.75) 50%,
        rgba(34,211,238,0.35) 75%,
        transparent      95%,
        transparent      100%
      );
      filter: blur(0.4px);
      animation: rfLineGlow 4s ease-in-out infinite;
    }

    /* Состояние при прокрутке — глубже, темнее */
    #globalNav.global-nav.nav-scrolled {
      background: rgba(9,14,27,0.96);
      backdrop-filter: blur(22px) saturate(180%);
      -webkit-backdrop-filter: blur(22px) saturate(180%);
      box-shadow:
        0 8px 48px rgba(0,0,0,0.55),
        0 4px 20px rgba(0,0,0,0.3),
        0 2px 12px rgba(34,211,238,0.07);
    }

    /* ── Внутренняя обёртка ───────────────────────────── */
    #globalNav .nav-content {
      max-width:       1060px  !important;
      margin:          0 auto  !important;
      padding:         0 24px  !important;
      display:         flex    !important;
      justify-content: space-between !important;
      align-items:     center  !important;
      height:          60px    !important;
      box-sizing:      border-box !important;
    }

    /* ── Логотип ──────────────────────────────────────── */
    #globalNav .nav-logo {
      font-family:     "Manrope",-apple-system,BlinkMacSystemFont,sans-serif !important;
      font-weight:     700        !important;
      font-size:       15px       !important;
      color:           #fff       !important;
      text-decoration: none       !important;
      display:         flex       !important;
      align-items:     center     !important;
      gap:             10px       !important;
      flex-shrink:     0          !important;
      transition:      opacity .25s ease, transform .25s ease !important;
      opacity: 0;
      animation: rfFadeUp 0.5s ease 0.28s forwards;
    }
    #globalNav .nav-logo:hover {
      opacity:   0.78 !important;
      transform: scale(0.98) !important;
    }
    #globalNav .nav-logo img {
      height:        26px !important;
      border-radius: 7px  !important;
      display:       block !important;
    }
    #globalNav .nav-brand {
      font-family:  "RefocusDisplay", sans-serif !important;
      font-size:    1.45em !important;
      font-weight:  400    !important;
      letter-spacing: 0.06em !important;
      color: #fff !important;
    }

    /* ── Разделитель ──────────────────────────────────── */
    #globalNav .nav-sep {
      width:      1px  !important;
      height:     16px !important;
      background: rgba(255,255,255,0.11) !important;
      margin:     0 10px 0 18px !important;
      flex-shrink: 0 !important;
      opacity: 0;
      animation: rfFadeUp 0.4s ease 0.38s forwards;
    }

    /* ── Список ссылок ────────────────────────────────── */
    #globalNav .nav-links {
      display:     flex   !important;
      gap:         2px    !important;
      align-items: center !important;
    }

    /* ── Ссылки (базовый стиль) ───────────────────────── */
    #globalNav .nav-link {
      font-family:  "Manrope",-apple-system,BlinkMacSystemFont,sans-serif !important;
      font-size:    13.5px !important;
      font-weight:  400    !important;
      color:        rgba(255,255,255,0.48) !important;
      text-decoration: none       !important;
      padding:      6px 14px      !important;
      border-radius: 99px         !important;
      white-space:  nowrap        !important;
      line-height:  1.4            !important;
      letter-spacing: 0.01em      !important;
      background:   transparent   !important;
      border:       1px solid transparent !important;
      transition:   color .22s ease, background .22s ease,
                    border-color .22s ease, transform .22s ease !important;
      cursor:       pointer !important;
      opacity: 0;
    }

    /* Стaggered entrance для каждой ссылки */
    #globalNav .nav-links .nav-link:nth-child(1) { animation: rfFadeUp .4s ease 0.44s forwards; }
    #globalNav .nav-links .nav-link:nth-child(2) { animation: rfFadeUp .4s ease 0.52s forwards; }
    #globalNav .nav-links .nav-link:nth-child(3) { animation: rfFadeUp .4s ease 0.60s forwards; }
    #globalNav .nav-links .nav-link:nth-child(4) { animation: rfFadeUp .4s ease 0.68s forwards; }

    /* Hover */
    #globalNav .nav-link:hover {
      color:        rgba(255,255,255,0.90) !important;
      background:   rgba(255,255,255,0.07) !important;
      border-color: rgba(255,255,255,0.09) !important;
      transform:    translateY(-1px) !important;
    }

    /* Активная страница */
    #globalNav .nav-link.nav-active {
      color:        #22D3EE !important;
      background:   rgba(34,211,238,0.10) !important;
      border-color: rgba(34,211,238,0.28) !important;
    }
    #globalNav .nav-link.nav-active:hover {
      background:   rgba(34,211,238,0.16) !important;
      border-color: rgba(34,211,238,0.45) !important;
      transform:    translateY(-1px) !important;
    }

    /* Дышащее свечение активной ссылки (включается после анимации входа) */
    #globalNav .nav-link.nav-active.nav-pulsing {
      animation: rfActivePulse 3.5s ease-in-out infinite !important;
    }

    /* ── Мобильная скрытие ────────────────────────────── */
    @media (max-width: 734px) {
      #globalNav .nav-links { display: none !important; }
      #globalNav .nav-sep   { display: none !important; }
    }
  `;

  var style = document.createElement('style');
  style.id = 'refocus-nav-style';
  style.textContent = css;
  document.head.appendChild(style);


  /* ─────────────────────────────────────────────────────────
     HTML
  ───────────────────────────────────────────────────────── */
  var html =
    '<nav class="global-nav" id="globalNav">' +
      '<div class="nav-content">' +
        '<a href="index.html" class="nav-logo">' +
          '<img src="assets/logo-refocus.png" alt="ReFocus">' +
          '<span class="nav-brand">REFOCUS</span>' +
        '</a>' +
        '<span class="nav-sep"></span>' +
        '<div class="nav-links">' +
          '<a href="index.html"          class="nav-link" data-page="index">Главная</a>' +
          '<a href="app.html"            class="nav-link" data-page="app">Приложение</a>' +
          '<a href="delete-account.html" class="nav-link" data-page="delete-account">Удаление аккаунта</a>' +
          '<a href="franchise.html"      class="nav-link" data-page="franchise">Франшиза</a>' +
        '</div>' +
      '</div>' +
    '</nav>';

  document.body.insertAdjacentHTML('afterbegin', html);


  /* ─────────────────────────────────────────────────────────
     Принудительная высота через setProperty (не перебивается)
  ───────────────────────────────────────────────────────── */
  var navEl      = document.getElementById('globalNav');
  var navContent = navEl.querySelector('.nav-content');

  ['position','top','left','right','z-index'].forEach(function(p) {
    navEl.style.removeProperty(p);
  });
  navEl.style.setProperty('height', '60px', 'important');
  navContent.style.setProperty('height', '60px', 'important');


  /* ─────────────────────────────────────────────────────────
     Скролл: добавляем класс nav-scrolled при прокрутке > 20px
  ───────────────────────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navEl.classList.add('nav-scrolled');
    } else {
      navEl.classList.remove('nav-scrolled');
    }
  }, { passive: true });


  /* ─────────────────────────────────────────────────────────
     Активная страница
  ───────────────────────────────────────────────────────── */
  var file = window.location.pathname.split('/').pop().replace(/\?.*$/, '') || 'index.html';
  var page = file.replace(/\.html$/i, '') || 'index';

  var activeLink = null;
  var links = navEl.querySelectorAll('.nav-link[data-page]');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('data-page') === page) {
      links[i].classList.add('nav-active');
      activeLink = links[i];
    }
  }

  /* Запускаем пульсацию активной ссылки после завершения анимации входа */
  if (activeLink) {
    setTimeout(function () {
      activeLink.classList.add('nav-pulsing');
    }, 1400);
  }

})();
