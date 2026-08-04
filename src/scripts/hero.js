// Hero carousel — draggable, infinite loop (cloned-edge slides).

var hero = document.querySelector("[data-hero]");
if (hero) {
  var track = hero.querySelector("[data-hero-track]");
  var realSlides = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-slide]"));
  var dots = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-dot]"));
  if (track && realSlides.length > 1) {
    var count = realSlides.length;
    var timer = null;
    var DELAY = 6000;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Clone the last + first slides onto each end so dragging past an edge
    // reveals a seamless copy; we then silently jump back to the real slide.
    var firstClone = realSlides[0].cloneNode(true);
    var lastClone = realSlides[count - 1].cloneNode(true);
    [firstClone, lastClone].forEach(function (c) {
      c.classList.add("is-clone");
      c.setAttribute("aria-hidden", "true");
    });
    track.appendChild(firstClone);
    track.insertBefore(lastClone, realSlides[0]);

    // all slides incl. clones: [lastClone, ...real..., firstClone]
    var all = Array.prototype.slice.call(track.querySelectorAll("[data-hero-slide]"));
    var pos = 1; // DOM index of the first real slide

    var viewportWidth = function () { return hero.getBoundingClientRect().width || 1; };
    var logical = function () { return (pos - 1 + count) % count; };

    var setActive = function () {
      all.forEach(function (s, i) { s.classList.toggle("is-active", i === pos); });
      var cur = logical();
      dots.forEach(function (d, i) {
        var active = i === cur;
        d.classList.toggle("is-active", active);
        if (active) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
    };

    var setTransform = function (animate) {
      track.style.transition = animate === false ? "none" : "";
      track.style.transform = "translateX(" + (-pos * 100) + "%)";
    };

    var go = function (p) {
      pos = p;
      setActive();
      setTransform(true);
    };

    // after sliding onto a clone, snap (no animation) to its real twin
    var jumpTo = function (p) {
      hero.classList.add("is-jumping");
      pos = p;
      setActive();
      setTransform(false);
      void track.offsetWidth; // force reflow so the next change can animate
      hero.classList.remove("is-jumping");
    };
    track.addEventListener("transitionend", function (e) {
      if (e.target !== track || e.propertyName !== "transform") return;
      if (pos === all.length - 1) jumpTo(1);            // landed on firstClone
      else if (pos === 0) jumpTo(all.length - 2);        // landed on lastClone
    });
    // if we're parked on a clone (e.g. animation interrupted), realign first
    var normalize = function () {
      if (pos === all.length - 1) jumpTo(1);
      else if (pos === 0) jumpTo(all.length - 2);
    };

    var advance = function () { go(pos + 1); };

    var start = function () {
      if (reduce) return;
      stop();
      timer = window.setInterval(advance, DELAY);
    };
    var stop = function () {
      if (timer) { window.clearInterval(timer); timer = null; }
    };

    setActive();
    setTransform(false);
    start();

    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        go((parseInt(d.getAttribute("data-index"), 10) || 0) + 1);
        start();
      });
    });

    // pause while hovered / off-screen
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    window.addEventListener("resize", function () { setTransform(false); });

    /* ---- drag: slides follow the pointer, then snap (wraps infinitely) ---- */
    var startX = 0, startY = 0, delta = 0;
    var dragging = false, decided = false, horizontal = false;

    hero.addEventListener("pointerdown", function (e) {
      if (e.button && e.button !== 0) return; // primary button only
      normalize();
      startX = e.clientX; startY = e.clientY; delta = 0;
      dragging = true; decided = false; horizontal = false;
      stop();
    });

    hero.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (!decided) {
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          decided = true;
          horizontal = Math.abs(dx) > Math.abs(dy);
          if (horizontal) {
            hero.classList.add("is-dragging");
            if (hero.setPointerCapture) { try { hero.setPointerCapture(e.pointerId); } catch (err) {} }
          }
        }
      }
      if (decided && horizontal) {
        e.preventDefault();
        delta = dx; // no edge resistance — clones make both directions endless
        track.style.transform = "translateX(calc(" + (-pos * 100) + "% + " + delta + "px))";
      }
    });

    var endDrag = function () {
      if (!dragging) return;
      dragging = false;
      hero.classList.remove("is-dragging");
      if (horizontal) {
        var threshold = Math.min(120, viewportWidth() * 0.15);
        if (delta <= -threshold) go(pos + 1);
        else if (delta >= threshold) go(pos - 1);
        else go(pos); // snap back
      }
      start();
    };
    hero.addEventListener("pointerup", endDrag);
    hero.addEventListener("pointercancel", endDrag);
  }
}
