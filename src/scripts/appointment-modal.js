// Site-wide booking pop-up.
//
// Opens once per browsing session 10s in, or whenever a
// `[data-open-appointment]` control asks for it. It never interrupts someone
// who is already looking at the full booking section, and never returns once
// the visitor has booked.

var modal = document.getElementById("appointment-modal");

if (modal) {
  var AUTO_DELAY = 10000; // first attempt, ms after load
  var RETRY_DELAY = 5000; // re-check while the booking section is on screen
  var SEEN_KEY = "auresca:popup-seen"; // sessionStorage — once per visit
  var BOOKED_KEY = "auresca:booked"; // localStorage — never again

  var panel = modal.querySelector(".modal-panel");
  // The full booking section, when the page has one (the home page).
  var inlineSection = document.getElementById("appointment");
  var lastFocused = null;
  var autoTimer = null;

  /* ---------- storage (private mode / blocked cookies must not throw) ------ */
  var read = function (area, key) {
    try {
      return window[area].getItem(key);
    } catch (e) {
      return null;
    }
  };
  var write = function (area, key) {
    try {
      window[area].setItem(key, "1");
    } catch (e) {
      /* nothing to do — the pop-up just repeats next visit */
    }
  };

  var hasBooked = function () {
    return read("localStorage", BOOKED_KEY) === "1";
  };

  /* ---------------------------- open / close ------------------------------ */
  var isOpen = function () {
    return modal.classList.contains("is-open");
  };

  var focusable = function () {
    return Array.prototype.filter.call(
      modal.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ),
      function (el) {
        return el.offsetParent !== null;
      }
    );
  };

  var open = function () {
    if (isOpen()) return;
    window.clearTimeout(autoTimer);
    lastFocused = document.activeElement;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    // Next frame, so the entrance transition has a starting state to run from.
    window.requestAnimationFrame(function () {
      modal.classList.add("is-open");
    });
    document.body.style.overflow = "hidden";
    write("sessionStorage", SEEN_KEY);

    var first = modal.querySelector("input, select, textarea");
    if (first) first.focus({ preventScroll: true });
  };

  var close = function () {
    if (!isOpen()) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";

    var finish = function () {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    };
    if (panel) {
      panel.addEventListener("transitionend", finish, { once: true });
      // Fallback in case the transition is skipped (reduced motion, hidden tab).
      window.setTimeout(finish, 400);
    } else {
      finish();
    }

    if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
  };

  /* ------------------------------ triggers -------------------------------- */
  modal.querySelectorAll("[data-close-appointment]").forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    // Keep Tab inside the dialog.
    if (e.key !== "Tab") return;
    var items = focusable();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // "Book Appointment" controls. On a page that already has the full booking
  // section, the link keeps its normal job of scrolling down to it.
  document.querySelectorAll("[data-open-appointment]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (inlineSection) return;
      e.preventDefault();
      open();
    });
  });

  // Booked — put the pop-up away for good.
  document.addEventListener("auresca:booked", function () {
    write("localStorage", BOOKED_KEY);
    window.clearTimeout(autoTimer);
    if (isOpen()) window.setTimeout(close, 4000); // let the confirmation land
  });

  /* ----------------------------- auto-open -------------------------------- */
  var sectionInView = function () {
    if (!inlineSection) return false;
    var box = inlineSection.getBoundingClientRect();
    return box.top < window.innerHeight * 0.9 && box.bottom > 0;
  };

  var maybeAutoOpen = function () {
    if (hasBooked() || isOpen()) return;
    // Already interrupted them this visit, or they're mid-booking already.
    if (read("sessionStorage", SEEN_KEY) === "1") return;
    if (sectionInView()) {
      autoTimer = window.setTimeout(maybeAutoOpen, RETRY_DELAY);
      return;
    }
    open();
  };

  if (!hasBooked() && read("sessionStorage", SEEN_KEY) !== "1") {
    autoTimer = window.setTimeout(maybeAutoOpen, AUTO_DELAY);
  }
}
