// Real Results — category tabs + paged 2-up carousel (one card per arrow click).

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

    // Arrows only on a category that actually holds more than the two cards a
    // desktop row shows. Below that they were parked on top of the
    // photographs at 35% opacity pointing nowhere, which is what they did on
    // every category here. Off the page entirely, rather than faded:
    // `display:none` takes them out of the tab order too, so there is nothing
    // to land on that does nothing. `maxIndex` is still in the test — a third
    // card that a wide row already shows in full has nothing to page to
    // either.
    var pageable = cards.length > 2 && maxIndex > 0;
    [rPrev, rNext].forEach(function (b) {
      if (b) b.classList.toggle("result-arrow-idle", !pageable);
    });
    // disable arrows at the ends
    if (rPrev) rPrev.classList.toggle("result-arrow-disabled", rIndex <= 0);
    if (rNext) rNext.classList.toggle("result-arrow-disabled", rIndex >= maxIndex);
  };

  var filterResults = function (cat) {
    // Opts the cards into the swap animation — see `has-swapped` in the motion
    // system block of global.css. Only ever reached from a tab click, so the
    // first render keeps its plain scroll-in reveal.
    resultTrack.classList.add("has-swapped");
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
