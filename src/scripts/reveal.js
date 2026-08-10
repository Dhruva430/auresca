// Entrance animations.
//
// Anything carrying `.reveal` starts hidden (see the motion system block in
// global.css) and is released the first time it scrolls into view. A
// `[data-stagger]` ancestor numbers its own revealing descendants so a row of
// cards arrives one after another instead of landing together.
//
// No-JS and reduced-motion both end up with everything simply visible.

var STEP = 90; // default ms between staggered siblings
var MAX_INDEX = 6; // stop compounding past this, or long lists crawl in

var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

if (reveals.length) {
  var show = function (el) {
    el.classList.add("is-visible");
  };

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(show);
  } else {
    // Delays are assigned up front so they are in place before the observer
    // fires. Groups are walked in document order, which means an inner group
    // overwrites the outer one — the closest `[data-stagger]` wins.
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var step = parseInt(group.getAttribute("data-stagger"), 10) || STEP;
      var items = group.querySelectorAll(".reveal");
      Array.prototype.forEach.call(items, function (el, i) {
        el.style.setProperty(
          "--reveal-delay",
          Math.min(i, MAX_INDEX) * step + "ms"
        );
      });
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          show(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) {
      io.observe(el);
    });
  }
}
