/**
 * Refocus — Animated Wave Background
 * Flowing light-ribbon waves on dark navy, inspired by the brand reference.
 * Performance: frame-capped (40fps desktop / 24fps mobile), no 3D transforms,
 * shadowBlur skipped on mobile.
 */
(function () {
  'use strict';

  var isMobile = window.innerWidth <= 768;

  /* ── Canvas setup ─────────────────────────────────────── */
  var canvas = document.createElement('canvas');
  canvas.id  = 'rfWaveCanvas';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
    'z-index:0;pointer-events:none;display:block;';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');

  /* ── Wave definitions ─────────────────────────────────── */
  var N     = isMobile ? 8 : 14;   // number of lines
  var waves = [];

  for (var i = 0; i < N; i++) {
    var t    = i / (N - 1);          // 0 … 1
    var dist = Math.abs(t - 0.5) * 2; // 0 = centre, 1 = edge

    /* Color: white core → cyan → blue → deep blue */
    var r, g, b;
    if (dist < 0.14) {
      r = 225; g = 242; b = 255;              // near-white
    } else if (dist < 0.38) {
      var f1 = (dist - 0.14) / 0.24;
      r = Math.round(225 - f1 * 155);
      g = Math.round(242 - f1 * 90);
      b = 255;
    } else if (dist < 0.68) {
      var f2 = (dist - 0.38) / 0.30;
      r = Math.round(70  - f2 * 50);
      g = Math.round(152 - f2 * 105);
      b = 255;
    } else {
      var f3 = (dist - 0.68) / 0.32;
      r = Math.round(20  - f3 * 10);
      g = Math.round(47  - f3 * 30);
      b = Math.round(255 - f3 * 90);
    }

    waves.push({
      /* Vertical position: cluster in central 22% of canvas height */
      baseY : 0.50 + (t - 0.5) * 0.22,
      amp   : 0.068 - dist * 0.028,           // centre waves taller
      freq  : 0.88 + (Math.random() * 2 - 1) * 0.10,
      phase : Math.random() * Math.PI * 2,
      /* Alternate direction so lines weave against each other */
      speed : (0.00022 + Math.random() * 0.00014) * (i % 2 === 0 ? 1 : -1),
      r: r, g: g, b: b,
      alpha : Math.max(0.12, 1.0 - dist * 0.82),
      lw    : dist < 0.14 ? 2.8 : (dist < 0.44 ? 1.8 : (dist < 0.72 ? 1.1 : 0.65)),
      glow  : dist < 0.22 ? 22  : (dist < 0.52 ? 11  : 4),
    });
  }

  /* ── Resize ───────────────────────────────────────────── */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  /* ── Draw loop ────────────────────────────────────────── */
  var lastTs   = 0;
  var interval = 1000 / (isMobile ? 24 : 40);
  var steps    = isMobile ? 80 : 200;

  function draw(ts) {
    requestAnimationFrame(draw);
    if (ts - lastTs < interval) return;
    lastTs = ts;

    var W = canvas.width;
    var H = canvas.height;

    /* Dark navy background */
    ctx.fillStyle = '#07101e';
    ctx.fillRect(0, 0, W, H);

    /* Atmospheric blue-glow cloud around the wave cluster */
    var grd = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.52);
    grd.addColorStop(0,    'rgba(0,55,140,0.42)');
    grd.addColorStop(0.38, 'rgba(0,28,88,0.18)');
    grd.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    /* Waves */
    for (var wi = 0; wi < waves.length; wi++) {
      var wv = waves[wi];
      wv.phase += wv.speed;

      ctx.beginPath();
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';

      for (var s = 0; s <= steps; s++) {
        var x = s / steps * W;
        var y = wv.baseY * H
              + Math.sin(x / W * Math.PI * 2 * wv.freq + wv.phase) * wv.amp * H;
        s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(' + wv.r + ',' + wv.g + ',' + wv.b + ',' + wv.alpha + ')';
      ctx.lineWidth   = wv.lw;

      if (!isMobile) {
        ctx.shadowBlur  = wv.glow;
        ctx.shadowColor = 'rgba(' + wv.r + ',' + wv.g + ',' + wv.b + ',0.75)';
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  requestAnimationFrame(draw);
})();
