// Stat counters — the numbers roll up the first time the strip is on screen.
//
// The final value is what the server renders, so the strip is correct with
// JavaScript off or motion turned down; this only replaces it with a count
// while the element is animating in.

var counters = Array.prototype.slice.call(
  document.querySelectorAll("[data-count]")
);

var reducedCount =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (counters.length && !reducedCount && "IntersectionObserver" in window) {
  var DURATION = 1600;

  var format = function (n) {
    return n.toLocaleString("en-IN");
  };

  var roll = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;

    var started = null;
    var tick = function (now) {
      if (started === null) started = now;
      var t = Math.min((now - started) / DURATION, 1);
      // ease-out cubic — quick off the mark, settling into the real number
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(Math.round(target * eased));
      if (t < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  // Zero them now rather than on intersection, so the value never visibly
  // snaps back before counting up.
  counters.forEach(function (el) {
    if (!isNaN(parseFloat(el.getAttribute("data-count")))) el.textContent = "0";
  });

  var countIo = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countIo.unobserve(e.target);
        roll(e.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (el) {
    countIo.observe(el);
  });
}
