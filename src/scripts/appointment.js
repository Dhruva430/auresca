// Booking form — AJAX submit with inline status messaging.
//
// Runs for every copy of the form on the page (the section on the home page
// and the site-wide pop-up), so each keeps its own status box and button state.
// A successful booking fires `auresca:booked` on the document; the pop-up
// listens for it so it stops asking.

document.querySelectorAll("[data-appointment-form]").forEach(function (form) {
  var statusBox = form.querySelector("[data-form-status]");
  if (!statusBox) return;

  var show = function (msg, ok) {
    statusBox.textContent = msg;
    statusBox.classList.remove("hidden");
    statusBox.classList.toggle("bg-sage-soft/40", ok);
    statusBox.classList.toggle("text-olive", ok);
    statusBox.classList.toggle("bg-rose-blush/50", !ok);
    statusBox.classList.toggle("text-charcoal", !ok);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var original = btn ? btn.innerHTML : "";
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = "Sending…";
    }

    fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (res) {
        if (res.ok && res.data.ok) {
          show(res.data.message, true);
          form.reset();
          document.dispatchEvent(new CustomEvent("auresca:booked"));
        } else {
          show(res.data.error || "Please check your details and try again.", false);
        }
      })
      .catch(function () {
        show("Network error. Please call us at " + (window.AURESCA_PHONE || "the clinic") + ".", false);
      })
      .finally(function () {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = original;
        }
        statusBox.scrollIntoView({ behavior: "smooth", block: "center" });
      });
  });
});
