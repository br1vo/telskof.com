/*
 * Main JavaScript for the Telskof Travel landing page.
 * Handles the mobile navigation toggle, smooth closing of the nav after
 * selection, modal open/close behaviour with focus trapping, ESC key
 * handling and dynamic year insertion. This file intentionally avoids
 * any external dependencies and keeps logic straightforward.
 */

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  /**
   * Toggle the mobile navigation open/closed.
   */
  function toggleNav() {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  }

  burger.addEventListener('click', toggleNav);

  // Close nav when clicking a link on mobile
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        nav.classList.remove('open');
        burger.classList.remove('active');
      }
    });
  });

  /* Modal logic */
  const openVisaBtn = document.getElementById('open-visa-modal');
  const modal = document.getElementById('visa-modal');
  const overlay = modal.querySelector('.modal-overlay');
  const closeModalBtn = modal.querySelector('.modal-close');

  // Focusable elements inside the modal for basic focus trap
  const focusableSelectors = 'input, textarea, button, select, a[href]';
  let focusableElements = [];
  let firstFocusable;
  let lastFocusable;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Collect focusable elements after modal is visible
    focusableElements = Array.from(
      modal.querySelectorAll(focusableSelectors)
    ).filter((el) => !el.hasAttribute('disabled'));
    if (focusableElements.length) {
      [firstFocusable] = focusableElements;
      lastFocusable = focusableElements[focusableElements.length - 1];
      firstFocusable.focus();
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openVisaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeModalBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
    // Trap focus within modal when open
    if (e.key === 'Tab' && modal.classList.contains('active')) {
      if (focusableElements.length === 0) return;
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });

  /* Insert current year in footer */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
    /* Footer scroll-to-top button */
  const footerTopBtn = document.getElementById('footer-scroll-top');
  if (footerTopBtn) {
    footerTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  /* ===== Netlify Forms (AJAX submit, no refresh) ===== */
  function serializeForm(form) {
    const data = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) params.append(key, value);
    return params.toString();
  }

  function wireNetlifyForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn ? btn.textContent : "Send";

    let msg = form.querySelector('.form-msg');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'form-msg';
      form.appendChild(msg);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      msg.textContent = "";
      msg.classList.remove('ok', 'err');

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending...";
      }

      try {
        const body = serializeForm(form);

        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body
        });

        if (!res.ok) throw new Error("Submit failed");

        form.reset();
        msg.textContent = "Sent successfully ✅";
        msg.classList.add('ok');

      } catch (err) {
        msg.textContent = "Something went wrong, try again";
        msg.classList.add('err');
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