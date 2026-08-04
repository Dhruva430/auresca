// Reveal-on-scroll entrance animation (IntersectionObserver, with fallback).

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
