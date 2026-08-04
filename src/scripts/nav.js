// Mobile menu toggle + header elevation on scroll.

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
