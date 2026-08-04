// Before / After comparison sliders — range input drives the clip --pos.

document.querySelectorAll("[data-ba]").forEach(function (slider) {
  var range = slider.querySelector(".ba-range");
  if (!range) return;
  var apply = function () {
    slider.style.setProperty("--pos", range.value + "%");
  };
  range.addEventListener("input", apply);
  apply();
});
