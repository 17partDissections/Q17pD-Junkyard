
(function () {
  "use strict";
  function initOnlineCounter() {
    var el = document.getElementById("usersOnline");
    if (!el) return;
    var base = 1488;
    function tick() {
      //var val = base + Math.floor(Math.random() * 900) + 100;
      el.textContent = val.toLocaleString("ru-RU");
    }
    tick();
    setInterval(tick, 4000);
  }
  function initSparkle() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;
    var chars = ["✦", "✧", "★", "✩", "⋆", "✬"];
    var colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff00", "#ff6600"];
    var last = 0;
    document.addEventListener("mousemove", function (e) {
      var now = Date.now();
      if (now - last < 40) return; // троттлинг
      last = now;
      var s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      var start = null;
      function fade(ts) {
        if (!start) start = ts;
        var p = (ts - start) / 700;
        if (p >= 1) { s.remove(); return; }
        s.style.opacity = String(1 - p);
        s.style.transform = "translateY(" + (p * 18) + "px) scale(" + (1 - p * 0.5) + ")";
        requestAnimationFrame(fade);
      }
      requestAnimationFrame(fade);
    });
  }
  function initEnter() {
    var splash = document.getElementById("enterSplash");
    var btn = document.getElementById("enterBtn");
    if (!splash || !btn) return;
    if (sessionStorage.getItem("glsh_entered")) {
      document.body.classList.add("entered");
      return;
    }
    btn.addEventListener("click", function () {
      document.body.classList.add("entered");
      sessionStorage.setItem("glsh_entered", "1");
      sessionStorage.removeItem("glsh_popup_blocked");
    });
  }

  var snowTimer = null;
  function startSnow() {
    var layer = document.getElementById("snowLayer");
    if (!layer) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var flakes = ["❄", "❅", "❆", "*"];
    snowTimer = setInterval(function () {
      var f = document.createElement("span");
      f.className = "snow-flake";
      f.textContent = flakes[Math.floor(Math.random() * flakes.length)];
      f.style.left = Math.random() * 100 + "%";
      f.style.fontSize = (8 + Math.random() * 14) + "px";
      f.style.opacity = String(0.4 + Math.random() * 0.6);
      var dur = 4 + Math.random() * 5;
      var drift = (Math.random() * 60 - 30);
      f.style.transition = "transform " + dur + "s linear, opacity " + dur + "s linear";
      layer.appendChild(f);
      requestAnimationFrame(function () {
        f.style.transform = "translate(" + drift + "px," + (window.innerHeight + 40) + "px) rotate(360deg)";
        f.style.opacity = "0";
      });
      setTimeout(function () { f.remove(); }, dur * 1000 + 200);
    }, 280);
  }
  function stopSnow() {
    if (snowTimer) { clearInterval(snowTimer); snowTimer = null; }
    var layer = document.getElementById("snowLayer");
    if (layer) layer.innerHTML = "";
  }
  function initSnow() {
    var btn = document.getElementById("snowBtn");
    var on = true;
    startSnow();
    if (btn) btn.addEventListener("click", function () {
      on = !on;
      if (on) { startSnow(); btn.textContent = "❄ СНЕГ: ВКЛ"; btn.classList.add("on"); }
      else { stopSnow(); btn.textContent = "❄ СНЕГ: ВЫКЛ"; btn.classList.remove("on"); }
    });
  }
  function initMusic() {
    var btn = document.getElementById("musicBtn");
    var audio = document.getElementById("bgAudio");
    if (!btn || !audio) return;
    audio.volume = 1;
    audio.loop = true;
    btn.addEventListener("click", function () {
      if (audio.paused) {
        var p = audio.play();
        if (p && p.catch) p.catch(function(){});
        btn.textContent = "🔊 MINECRAFT OST: ВКЛ"; btn.classList.add("on");
      } else {
        audio.pause();
        btn.textContent = "🔊 MINECRAFT OST: ВЫКЛ"; btn.classList.remove("on");
      }
    });
    audio.addEventListener("ended", function () {
      if (btn.classList.contains("on")) { audio.currentTime = 0; audio.play().catch(function(){}); }
    });
  }
  function init() {
    initEnter();
    initSparkle();
    initSnow();
    initMusic();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
