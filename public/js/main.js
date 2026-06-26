// Auresca Care — lightweight vanilla interactions (no framework, keeps page score high)
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle("hidden", !open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () {
      setOpen(menu.classList.contains("hidden"));
    });
    menu.querySelectorAll(".js-mobile-link").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  /* ---------- Header elevation on scroll ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("shadow-soft", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Hero carousel (draggable, infinite loop) ---------- */
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

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll("[data-faq]").forEach(function (item) {
    var trigger = item.querySelector(".faq-trigger");
    var panel = item.querySelector(".faq-panel");
    var icon = item.querySelector(".faq-icon");
    if (!trigger || !panel) return;

    var expanded = trigger.getAttribute("aria-expanded") === "true";
    if (expanded) {
      panel.style.maxHeight = panel.scrollHeight + "px";
      if (icon) icon.style.transform = "rotate(180deg)";
    }

    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      // close all
      document.querySelectorAll("[data-faq]").forEach(function (other) {
        var t = other.querySelector(".faq-trigger");
        var p = other.querySelector(".faq-panel");
        var ic = other.querySelector(".faq-icon");
        if (t) t.setAttribute("aria-expanded", "false");
        if (p) p.style.maxHeight = "0px";
        if (ic) ic.style.transform = "rotate(0deg)";
      });
      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });

  /* ---------- Before / After sliders ---------- */
  document.querySelectorAll("[data-ba]").forEach(function (slider) {
    var range = slider.querySelector(".ba-range");
    if (!range) return;
    var apply = function () {
      slider.style.setProperty("--pos", range.value + "%");
    };
    range.addEventListener("input", apply);
    apply();
  });

  /* ---------- Reviews row: drag to scroll ---------- */
  var reviewsTrack = document.querySelector("[data-reviews-track]");
  if (reviewsTrack) {
    var rDown = false, rStartX = 0, rStartScroll = 0, rMoved = false;
    reviewsTrack.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return; // let touch use native scroll
      if (e.button && e.button !== 0) return;
      rDown = true; rMoved = false;
      rStartX = e.clientX;
      rStartScroll = reviewsTrack.scrollLeft;
      reviewsTrack.classList.add("is-dragging");
    });
    reviewsTrack.addEventListener("pointermove", function (e) {
      if (!rDown) return;
      var dx = e.clientX - rStartX;
      if (Math.abs(dx) > 3) {
        rMoved = true;
        if (reviewsTrack.setPointerCapture) { try { reviewsTrack.setPointerCapture(e.pointerId); } catch (err) {} }
      }
      reviewsTrack.scrollLeft = rStartScroll - dx;
    });
    var rEnd = function () {
      rDown = false;
      reviewsTrack.classList.remove("is-dragging");
    };
    reviewsTrack.addEventListener("pointerup", rEnd);
    reviewsTrack.addEventListener("pointercancel", rEnd);
    // swallow accidental clicks that were really drags
    reviewsTrack.addEventListener("click", function (e) {
      if (rMoved) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }

  /* ---------- Services: category filter ---------- */
  var serviceGrid = document.querySelector("[data-service-grid]");
  if (serviceGrid) {
    var serviceTabs = Array.prototype.slice.call(document.querySelectorAll("[data-service-tab]"));
    var serviceCards = Array.prototype.slice.call(serviceGrid.querySelectorAll("[data-service-card]"));
    serviceTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        serviceTabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.removeAttribute("aria-current");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-current", "true");
        var cat = tab.getAttribute("data-cat");
        serviceCards.forEach(function (card) {
          card.classList.toggle("hidden", card.getAttribute("data-cat") !== cat);
        });
      });
    });
  }

  /* ---------- Real Results: category tabs + paged carousel ---------- */
  var resultTrack = document.querySelector("[data-result-track]");
  if (resultTrack) {
    var resultViewport = resultTrack.parentElement; // overflow-hidden wrapper
    var resultTabs = Array.prototype.slice.call(document.querySelectorAll("[data-result-tab]"));
    var allResultCards = Array.prototype.slice.call(resultTrack.querySelectorAll("[data-result-card]"));
    var rPrev = document.querySelector("[data-result-prev]");
    var rNext = document.querySelector("[data-result-next]");
    var GAP = 24;
    var rIndex = 0; // leftmost visible card

    var visibleCards = function () {
      return allResultCards.filter(function (c) { return !c.classList.contains("hidden"); });
    };

    var layout = function (animate) {
      var cards = visibleCards();
      if (!cards.length) return;
      var cardW = cards[0].getBoundingClientRect().width;
      var step = cardW + GAP;
      var trackW = resultViewport.getBoundingClientRect().width;
      var perView = Math.max(1, Math.round((trackW + GAP) / step)); // 1 or 2
      var maxIndex = Math.max(0, cards.length - perView);
      if (rIndex > maxIndex) rIndex = maxIndex;
      if (rIndex < 0) rIndex = 0;

      var total = cards.length * cardW + (cards.length - 1) * GAP;
      var offset = rIndex * step;
      // align the final page flush to the right edge
      if (rIndex === maxIndex) offset = Math.max(0, total - trackW);

      resultTrack.style.transition = animate === false ? "none" : "";
      resultTrack.style.transform = "translateX(-" + offset + "px)";

      // disable arrows at the ends
      if (rPrev) rPrev.classList.toggle("result-arrow-disabled", rIndex <= 0);
      if (rNext) rNext.classList.toggle("result-arrow-disabled", rIndex >= maxIndex);
    };

    var filterResults = function (cat) {
      allResultCards.forEach(function (card) {
        card.classList.toggle("hidden", card.getAttribute("data-cat") !== cat);
      });
      rIndex = 0;
      layout(false);
    };

    resultTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        resultTabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.removeAttribute("aria-current");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-current", "true");
        filterResults(tab.getAttribute("data-cat"));
      });
    });

    if (rNext) rNext.addEventListener("click", function () { rIndex += 1; layout(); });
    if (rPrev) rPrev.addEventListener("click", function () { rIndex -= 1; layout(); });
    window.addEventListener("resize", function () { layout(false); });

    layout(false); // initial (first category already shown server-side)
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Appointment form (AJAX) ---------- */
  var form = document.getElementById("appointment-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    var show = function (msg, ok) {
      status.textContent = msg;
      status.classList.remove("hidden");
      status.classList.toggle("bg-sage-soft/40", ok);
      status.classList.toggle("text-olive", ok);
      status.classList.toggle("bg-rose-blush/50", !ok);
      status.classList.toggle("text-charcoal", !ok);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.innerHTML : "";
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = "Sending…";
      }

      fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          if (res.ok && res.data.ok) {
            show(res.data.message, true);
            form.reset();
          } else {
            show(res.data.error || "Please check your details and try again.", false);
          }
        })
        .catch(function () {
          show("Network error. Please call us at " + (window.AURESCA_PHONE || "the clinic") + ".", false);
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = original;
          }
          status.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
  }
})();
