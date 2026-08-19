// Hero carousel — draggable, infinite loop (cloned-edge slides).

var hero = document.querySelector("[data-hero]");
if (hero) {
  var track = hero.querySelector("[data-hero-track]");
  var realSlides = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-slide]"));
  var dots = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-dot]"));

  // Reduced motion: hold the clip on its poster frame instead of looping.
  // Done before the clones are made so they inherit the same state.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Array.prototype.forEach.call(
      hero.querySelectorAll("[data-hero-video]"),
      function (v) {
        v.removeAttribute("autoplay");
        v.pause();
      }
    );
  }

  if (track && realSlides.length > 1) {
    var count = realSlides.length;
    var timer = null;
    var DELAY = 6000; // a still slide's turn on screen
    var GRACE = 800; // watchdog headroom over a clip's own length
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var siteHeader = document.getElementById("site-header");

    var videoIn = function (index) {
      var slide = realSlides[index];
      return slide ? slide.querySelector("[data-hero-video]") : null;
    };

    // A slide carrying a clip moves on when the clip fires `ended`, so what
    // this returns is only a watchdog: playback that never starts (blocked
    // autoplay, a decode error, metadata that never arrives) must not leave
    // the carousel parked forever. `ended` beats the watchdog every time
    // playback actually runs.
    var holdFor = function (index) {
      var v = videoIn(index);
      var secs = v ? v.duration : 0;
      return isFinite(secs) && secs > 0 ? Math.ceil(secs * 1000) + GRACE : DELAY;
    };

    // Clone the last + first slides onto each end so dragging past an edge
    // reveals a seamless copy; we then silently jump back to the real slide.
    var firstClone = realSlides[0].cloneNode(true);
    var lastClone = realSlides[count - 1].cloneNode(true);
    [firstClone, lastClone].forEach(function (c) {
      c.classList.add("is-clone");
      c.setAttribute("aria-hidden", "true");
      // A cloned <video> fetches and decodes a second copy of the same file
      // for an edge that is only ever on screen mid-drag. The poster frame
      // stands in for it — same picture, none of the cost.
      Array.prototype.forEach.call(c.querySelectorAll("video"), function (v) {
        var still = document.createElement("img");
        still.src = v.getAttribute("poster") || "";
        still.alt = "";
        // Everything the video wore, minus `hero-img` on a full-bleed clip.
        // That class carries the offset that starts media below the header,
        // and a full-bleed clip runs under the bar instead. Left on, its clone
        // shows a band of bare slide along its top — the white flash on the
        // wrap from the last slide back to the first, which is the only time
        // this element is ever on screen. Every other clip does start below
        // the header, so its stand-in has to keep the class.
        var names = v.className.split(/\s+/);
        still.className = (names.indexOf("hero-bleed") === -1
          ? names
          : names.filter(function (n) { return n !== "hero-img"; })
        ).join(" ");
        still.setAttribute("aria-hidden", "true");
        still.setAttribute("draggable", "false");
        v.parentNode.replaceChild(still, v);
      });
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
      syncVideos();
      syncHeader();
      loadCurrent();
    };

    // Every photograph but the opening slide's ships `loading="lazy"`, so a
    // reload fetches one picture instead of six. Waiting on the lazy loader to
    // notice the slide has been translated into view is a heuristic, though,
    // and a beat of bare cream is exactly what it costs when it guesses late.
    // Flipping the attribute is defined to start the fetch there and then, so
    // the picture is asked for the moment its slide is the one on screen.
    function loadCurrent() {
      var slide = all[pos];
      if (!slide) return;
      Array.prototype.forEach.call(
        slide.querySelectorAll("img.hero-img[loading='lazy']"),
        function (im) { im.loading = "eager"; }
      );
    }

    // A full-bleed slide asks the header to stand down: no bar, white mark and
    // nav, no booking button. Keyed to `hero-bleed` rather than to "has a
    // clip" — the other clips are light enough that a white logo would vanish
    // into them, and they start below the header like the photographs do, so
    // there is nothing to stand down for. Safe to switch the instant the slide
    // becomes active: the band the bar sits over is filled with the slide's
    // own top colour, so there is nothing to show through mid-transition.
    function syncHeader() {
      if (!siteHeader) return;
      var v = videoIn(logical());
      siteHeader.classList.toggle(
        "header-on-clip",
        !!v && v.classList.contains("hero-bleed")
      );
    }

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

    // Playback is deliberately NOT tied to the timer. `stop()` used to pause
    // the clip, so every re-arm — and every pointerdown — pulled a pause/play
    // through the decoder and the picture hitched. Pausing is now something
    // only the handlers that mean it (hover, hidden tab) ask for.
    // Some browsers refuse to start a clip until the visitor has interacted
    // with the page at all. Rather than leave it parked on the poster, the
    // first thing they do is taken as that interaction and playback retried.
    var waitingOnGesture = false;
    var GESTURES = ["pointerdown", "keydown", "touchstart"];
    var retryOnGesture = function (v) {
      if (waitingOnGesture) return;
      waitingOnGesture = true;
      var retry = function () {
        waitingOnGesture = false;
        GESTURES.forEach(function (t) {
          document.removeEventListener(t, retry);
        });
        var again = v.play();
        if (again && again.catch) again.catch(function () {});
      };
      GESTURES.forEach(function (t) {
        document.addEventListener(t, retry, { passive: true });
      });
    };

    var playClip = function () {
      if (reduce) return;
      var v = videoIn(logical());
      if (!v) return;
      // Nothing but the opening clip is fetched at page load — the rest ship
      // `preload="none"` and hold their poster, so a reload pulls one clip and
      // not three. A slide's own clip starts downloading here, the moment it
      // becomes the slide on screen. `play()` would trigger the fetch on its
      // own; lifting `preload` first is what lets the browser keep buffering
      // ahead of playback rather than stopping at what it needs right now.
      if (v.preload === "none") v.preload = "auto";
      // Played out while the carousel was held: send it back to the top.
      if (v.ended) {
        try { v.currentTime = 0; } catch (e) { /* not seekable yet */ }
      }
      if (!v.paused) return; // already running — leave the decoder alone
      // The property, not just the attribute: muted is what earns a clip the
      // right to start on its own, and a cloned or re-created element can
      // arrive without it.
      v.muted = true;
      var playing = v.play();
      if (playing && playing.catch) {
        playing.catch(function () {
          retryOnGesture(v);
        });
      }
    };
    var pauseClip = function () {
      var v = videoIn(logical());
      if (v) v.pause();
    };

    // Self-rescheduling rather than a fixed interval, so each slide can ask
    // for its own time on screen.
    var start = function () {
      if (reduce) return;
      stop();
      playClip();
      timer = window.setTimeout(function () {
        advance();
        start();
      }, holdFor(logical()));
    };
    var stop = function () {
      if (timer) { window.clearTimeout(timer); timer = null; }
    };

    // A clip that has played through is parked on its last frame, so coming
    // back round to it needs a rewind. Clips on other slides are paused —
    // there is nothing to gain from decoding one nobody is looking at.
    // Seeded at the opening slide, not -1. At -1 the very first `setActive()`
    // counted as a slide change and seeked the clip to zero at the exact
    // moment autoplay was getting under way — which is the stall on reload.
    var lastLogical = 0;
    var syncVideos = function () {
      // Sliding onto a clone is not the slide arriving — the clone is showing
      // the poster and the snap to the real twin follows. Waiting for that
      // keeps the clip from starting behind the transition and losing its tail.
      if (pos === 0 || pos === all.length - 1) return;
      var cur = logical();
      if (cur === lastLogical) return;
      lastLogical = cur;
      var rewound = false;
      realSlides.forEach(function (slide, i) {
        var v = slide.querySelector("[data-hero-video]");
        if (!v) return;
        if (i !== cur) { v.pause(); return; }
        // Only seek when there is somewhere to seek back from. Seeking a VP9
        // stream costs a keyframe decode, and asking for it on a clip already
        // sitting at its start buys a stall for nothing.
        if (v.currentTime > 0.05) {
          try { v.currentTime = 0; } catch (e) { /* not seekable yet */ }
        }
        rewound = true;
      });
      // `start()` does the playing; re-arming here means the clip is measured
      // from the frame it actually restarts on, not from whenever the
      // transition towards this slide began.
      if (rewound && timer) start();
    };

    realSlides.forEach(function (slide, i) {
      var v = slide.querySelector("[data-hero-video]");
      if (!v) return;

      // The clip plays through once, and reaching its end is what moves the
      // carousel on — after which everything is back on the plain DELAY
      // rhythm. Deliberately not conditional on the timer still running: a
      // clip that has played out has nothing left to hold the slide open, and
      // requiring a live timer meant a single stray `mouseenter` parked the
      // carousel on slide one for good.
      v.addEventListener("ended", function () {
        if (reduce || logical() !== i) return;
        advance();
        start();
      });

      // Duration is rarely known on the first tick, so the watchdog starts out
      // at the DELAY fallback. Stretch it once the real length is in, or the
      // opening clip would be cut off at six seconds.
      v.addEventListener("loadedmetadata", function () {
        if (timer && logical() === i) start();
      });
    });

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
    // Hover parks the carousel but leaves the picture running. It must not
    // touch playback: the hero fills the window, so on most reloads the cursor
    // is already inside it and `mouseenter` fires immediately — pausing here
    // stopped the clip dead the moment the page loaded, and it took a click to
    // get it going again. A hidden tab is the one case worth pausing for, and
    // that cannot fire spuriously on load.
    // Hover is detected from actual movement, not from `mouseenter`. The hero
    // fills the window, so a page loading with the cursor already inside it
    // fires `mouseenter` unprompted — and parking the carousel before the
    // visitor has done anything is a freeze, not a hover. Movement can only
    // come from someone actually there.
    var hovering = false;
    hero.addEventListener("mousemove", function () {
      if (hovering) return; // fires constantly; only the first one matters
      hovering = true;
      stop();
    });
    hero.addEventListener("mouseleave", function () {
      hovering = false;
      start();
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
        pauseClip();
      } else {
        start();
      }
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
