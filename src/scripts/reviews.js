// Reviews row — drag to scroll (mouse/pen; touch uses native scroll).

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
