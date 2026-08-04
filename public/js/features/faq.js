// FAQ accordion — single-open, animated max-height.

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
