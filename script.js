/*
 * Main JavaScript for the Telskof Travel landing page.
 * Clean, safe, Netlify-ready.
 */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     NAVIGATION
  ======================== */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-list a");

  function toggleNav() {
    nav?.classList.toggle("open");
    burger?.classList.toggle("active");
  }

  burger?.addEventListener("click", toggleNav);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        nav?.classList.remove("open");
        burger?.classList.remove("active");
      }
    });
  });

  /* =======================
     VISA MODAL (SAFE)
  ======================== */
  const openVisaBtn = document.getElementById("open-visa-modal");
  const modal = document.getElementById("visa-modal");

  if (openVisaBtn && modal) {
    const overlay = modal.querySelector(".modal-overlay");
    const closeModalBtn = modal.querySelector(".modal-close");

    const focusableSelectors = "input, textarea, button, select, a[href]";
    let focusableElements = [];
    let firstFocusable, lastFocusable;

    function openModal() {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      focusableElements = Array.from(
        modal.querySelectorAll(focusableSelectors)
      ).filter(el => !el.disabled);

      if (focusableElements.length) {
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
        firstFocusable.focus();
      }
    }

    function closeModal() {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    openVisaBtn.addEventListener("click", e => {
      e.preventDefault();
      openModal();
    });

    closeModalBtn?.addEventListener("click", closeModal);
    overlay?.addEventListener("click", closeModal);

    window.addEventListener("keydown", e => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }

      if (e.key === "Tab" && modal.classList.contains("active")) {
        if (!focusableElements.length) return;

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  /* =======================
     FOOTER UTILITIES
  ======================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const footerTopBtn = document.getElementById("footer-scroll-top");
  footerTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =======================
     NETLIFY FORMS (AJAX)
  ======================== */
  function serializeForm(form) {
    const data = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      params.append(key, value);
    }
    return params.toString();
  }

  function wireNetlifyForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn?.textContent || "Send";

    let msg = form.querySelector(".form-msg");
    if (!msg) {
      msg = document.createElement("p");
      msg.className = "form-msg";
      form.appendChild(msg);
    }

    form.addEventListener("submit", async e => {
      e.preventDefault();

      msg.textContent = "";
      msg.classList.remove("ok", "err");

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending...";
      }

      try {
        const body = serializeForm(form);

const res = await fetch(window.location.href, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  },
  body
});

        if (!res.ok) throw new Error("Submit failed");

        form.reset();
        msg.textContent = "Sent successfully ✅";
        msg.classList.add("ok");

      } catch (err) {
        msg.textContent = "Something went wrong, try again";
        msg.classList.add("err");
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btnText;
        }
      }
    });
  }

  wireNetlifyForm("contact-form");
  wireNetlifyForm("visa-form");

});
