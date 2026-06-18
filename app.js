/* NeverRetype site - light progressive enhancement, no dependencies */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Keep the sample date in the hero card current.
    var dateEl = document.querySelector(".js-date");
    if (dateEl) {
      try {
        var d = new Date();
        var mm = String(d.getMonth() + 1).padStart(2, "0");
        var dd = String(d.getDate()).padStart(2, "0");
        dateEl.textContent = d.getFullYear() + "-" + mm + "-" + dd;
      } catch (e) { /* leave the static value */ }
    }

    // Sticky nav gets a hairline rule once you scroll past the top.
    var nav = document.querySelector(".nav");
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal-on-scroll. If IntersectionObserver is missing, just show everything.
    var revealEls = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    // Draw the hero signature once it has settled in.
    var sig = document.querySelector(".sig-line");
    if (sig && !reduceMotion) {
      window.requestAnimationFrame(function () {
        window.setTimeout(function () { sig.classList.add("draw"); }, 150);
      });
    } else if (sig) {
      sig.classList.add("draw");
    }
  });
})();
