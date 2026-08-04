// Appointment form — AJAX submit with inline status messaging.

var form = document.getElementById("appointment-form");
var status = document.getElementById("form-status");
if (form && status) {
  var show = function (msg, ok) {
    status.textContent = msg;
    status.classList.remove("hidden");
    status.classList.toggle("bg-sage-soft/40", ok);
    status.classList.toggle("text-olive", ok);
    status.classList.toggle("bg-rose-blush/50", !ok);
    status.classList.toggle("text-charcoal", !ok);
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
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      });
  });
}
