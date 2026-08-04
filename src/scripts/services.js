// Services — filter the card grid by category tab.

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
