// Services — swap the visible category panel, and let a menu row preselect
// itself in the appointment form.

var serviceTabs = Array.prototype.slice.call(
  document.querySelectorAll("[data-service-tab]")
);
var servicePanels = Array.prototype.slice.call(
  document.querySelectorAll("[data-service-panel]")
);

if (serviceTabs.length && servicePanels.length) {
  serviceTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      serviceTabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.removeAttribute("aria-current");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-current", "true");

      var cat = tab.getAttribute("data-cat");
      servicePanels.forEach(function (panel) {
        panel.classList.toggle(
          "hidden",
          panel.getAttribute("data-cat") !== cat
        );
      });
    });
  });
}

/* ---- clicking a treatment jumps to the form with it already chosen ---- */
var serviceSelect = document.getElementById("service");
if (serviceSelect) {
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      var value = link.getAttribute("data-service");
      var exists = Array.prototype.some.call(
        serviceSelect.options,
        function (o) {
          return o.value === value;
        }
      );
      if (!exists) return;
      serviceSelect.value = value;
      serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}
