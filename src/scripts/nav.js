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
var announce = document.getElementById("announce-bar");
if (header) {
  // The bar arrives when the visitor turns back up the page and leaves again
  // on the way down, so direction has to be tracked between events. `lastY`
  // only moves once a scroll clears the deadzone — otherwise trackpad jitter
  // and momentum wobble at the end of a fling flip the direction repeatedly
  // and the bar flickers.
  var lastY = window.scrollY;
  var goingUp = false;
  var DEADZONE = 6;

  var onScroll = function () {
    // Clamped: elastic overscroll reports negatives at the top on some
    // platforms, which would read as scrolling up and open the bar.
    var y = window.scrollY < 0 ? 0 : window.scrollY;
    var scrolled = y > 12;

    header.classList.toggle("shadow-soft", scrolled);
    // Read by the clip-slide styling: a bar-less header is only safe while
    // the hero is still under it.
    header.classList.toggle("is-scrolled", scrolled);

    var dy = y - lastY;
    if (dy > DEADZONE || dy < -DEADZONE) {
      goingUp = dy < 0;
      lastY = y;
    }

    if (announce) {
      // Never at the very top, whichever way the visitor is moving.
      var open = scrolled && goingUp;
      announce.classList.toggle("is-open", open);
      // Drives the header's offset. Tied to the bar rather than to `scrolled`,
      // or the header would hold its gap open with nothing in it.
      header.classList.toggle("has-announce", open);
      // Measured, not assumed — the bar wraps to two lines on narrow screens.
      document.documentElement.style.setProperty(
        "--announce-h",
        announce.offsetHeight + "px"
      );
    }
  };
  // The home hero is pulled up under the header by exactly this much, so it
  // is measured rather than assumed — a hard-coded value leaves a hairline of
  // page background on show the moment the header's height changes.
  var measure = function () {
    document.documentElement.style.setProperty(
      "--header-h",
      header.offsetHeight + "px"
    );
  };

  measure();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  // Read again on the next frame as well as on the event itself. Entering or
  // leaving fullscreen with F11 is a resize the browser can report before the
  // window chrome has finished going, and a height read at that moment is the
  // old one — which leaves the hero pulled up by the wrong amount until
  // something else resizes the page.
  window.addEventListener(
    "resize",
    function () {
      measure();
      window.requestAnimationFrame(measure);
    },
    { passive: true }
  );
  // And whenever the bar's own box changes for any reason a resize never
  // reports — the mobile menu opening, a font landing late, the nav wrapping.
  // `--header-h` drives the hero, not the header, so this cannot feed itself.
  if (window.ResizeObserver) {
    new window.ResizeObserver(measure).observe(header);
  }
}
