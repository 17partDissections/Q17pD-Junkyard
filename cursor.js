(function () {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  if ("ontouchstart" in window) return;
  const use_list = false;
  const rainbow = false;
  const chars = ["✦", "✧", "★", "✩", "⋆", "✬"];
  const colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff00", "#ff6600"];
  let last = 0;
  document.addEventListener("mousemove", e => {
    const now = Date.now();
    if (now - last < 20) return;
    last = now;
    const s = document.createElement("span");
    s.className = "sparkle";
	if(use_list) s.textContent = chars[Math.random() * chars.length | 0];
	else s.textContent = "17";
	if(rainbow) s.style.color = colors[Math.random() * colors.length | 0];
	else s.style.color = "white";
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";

    document.body.appendChild(s);

    const start = performance.now();

    function fade(t) {
      const p = (t - start) / 700;
      if (p >= 1) return s.remove();
      s.style.opacity = 1 - p;
      s.style.transform =
        `translateY(${p * 18}px) scale(${1 - p * 0.5})`;
      requestAnimationFrame(fade);
    }

    requestAnimationFrame(fade);
  });

})();