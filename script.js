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
   TRIP INQUIRY MODAL (same behavior as visa)
======================== */
const openTripInquiryBtn = document.getElementById("open-trip-inquiry-modal");
const tripInquiryModal = document.getElementById("trip-inquiry-modal");

if (openTripInquiryBtn && tripInquiryModal) {
  const overlay = tripInquiryModal.querySelector(".modal-overlay");
  const closeBtns = tripInquiryModal.querySelectorAll("[data-close='true']");

  const focusableSelectors = "input, textarea, button, select, a[href]";
  let focusableElements = [];
  let firstFocusable, lastFocusable;
  let lastActiveElement = null;

  function openTripInquiryModal() {
    lastActiveElement = document.activeElement;

    tripInquiryModal.classList.add("active");
    tripInquiryModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    focusableElements = Array.from(
      tripInquiryModal.querySelectorAll(focusableSelectors)
    ).filter(el => !el.disabled);

    if (focusableElements.length) {
      firstFocusable = focusableElements[0];
      lastFocusable = focusableElements[focusableElements.length - 1];
      firstFocusable.focus();
    }
  }

  function closeTripInquiryModal() {
    tripInquiryModal.classList.remove("active");
    tripInquiryModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  }

  openTripInquiryBtn.addEventListener("click", e => {
    e.preventDefault();
    openTripInquiryModal();
  });

  overlay?.addEventListener("click", closeTripInquiryModal);
  closeBtns.forEach(btn => btn.addEventListener("click", closeTripInquiryModal));

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && tripInquiryModal.classList.contains("active")) {
      closeTripInquiryModal();
    }

    if (e.key === "Tab" && tripInquiryModal.classList.contains("active")) {
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
const tripData = {
  "meso-mountains": {
    title: "Mesopotamia to Mountains",
    duration: "10D / 9N",
    price: "Contact us",
    route: "Baghdad → Babylon → Najaf → Basra → Erbil → Duhok",
    highlights: ["Ancient Mesopotamian sites", "Sacred cities", "Kurdistan mountains"],
    includes: ["Hotels", "Transport", "Guide"],
    notIncluded: ["Flights", "Personal expenses"],
    idealFor: "History + nature lovers"
  },

  "cradle-explorer": {
    title: "Cradle of Civilization",
    duration: "9D / 8N",
    price: "Contact us",
    route: "South Iraq → Marshes → Northern cities",
    highlights: ["Marshlands", "Ancient ruins", "Local traditions"],
    includes: ["Hotels", "Transport", "Guide"],
    notIncluded: ["Flights", "Personal expenses"],
    idealFor: "Culture + heritage explorers"
  },

  "heart-kurdistan": {
    title: "Heart of Kurdistan",
    duration: "11D / 10N",
    price: "Contact us",
    route: "Erbil → Soran → Amedi → Duhok → Zakho",
    highlights: ["Mountains", "Assyrian heritage", "Religious diversity"],
    includes: ["Hotels", "Transport", "Guide"],
    notIncluded: ["Flights", "Personal expenses"],
    idealFor: "Nature + deep Kurdistan experience"
  },

  "kurdistan-highlights": {
    title: "Kurdistan Highlights",
    duration: "8D / 7N",
    price: "Contact us",
    route: "Erbil → Duhok → Amedi → Zakho",
    highlights: ["Iconic cities", "Short escape", "Easy pace"],
    includes: ["Hotels", "Transport", "Guide"],
    notIncluded: ["Flights", "Personal expenses"],
    idealFor: "Short trip + relaxed pace"
  }
};

/* =======================
   TRIP DETAILS MODAL (FIXED)
======================== */
const tripModal = document.getElementById("trip-modal");
const tripModalBody = document.getElementById("trip-modal-body");
const tripModalTitle = document.getElementById("trip-modal-title");

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTripModal(trip) {
  tripModalTitle.textContent = trip.title;

  tripModalBody.innerHTML = `
    <div class="trip-modal-grid">

      <div class="trip-modal-row">
        <h4>Duration</h4>
        <div>${escapeHtml(trip.duration)}</div>
      </div>

      <div class="trip-modal-row">
        <h4>Price</h4>
        <div class="trip-price">💰 ${escapeHtml(trip.price)}</div>
      </div>

      <div class="trip-modal-row trip-modal-row--full">
        <h4>Route highlights</h4>
        <div>${escapeHtml(trip.route)}</div>
      </div>

      <div class="trip-modal-row trip-modal-row--full">
        <h4>Main experiences</h4>
        <ul>
          ${trip.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      </div>

      <div class="trip-modal-two">
        <div class="trip-modal-row">
          <h4>Includes</h4>
          <ul>
            ${trip.includes.map(x => `<li>✔ ${escapeHtml(x)}</li>`).join("")}
          </ul>
        </div>

        <div class="trip-modal-row">
          <h4>Not included</h4>
          <ul>
            ${trip.notIncluded.map(x => `<li>✖ ${escapeHtml(x)}</li>`).join("")}
          </ul>
        </div>
      </div>

      ${trip.idealFor ? `
        <div class="trip-modal-row trip-modal-row--full">
          <h4>Ideal for</h4>
          <div>${escapeHtml(trip.idealFor)}</div>
        </div>
      ` : ""}

    </div>
  `;
}

function openTripModal() {
  if (!tripModal) return;
  tripModal.classList.add("active");
  tripModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeTripModal() {
  if (!tripModal) return;
  tripModal.classList.remove("active");
  tripModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (tripModal) {
  const overlay = tripModal.querySelector(".modal-overlay");
  const closeBtn = tripModal.querySelector(".modal-close");

  // ✅ attach click listeners ONCE
  document.querySelectorAll(".trip-more").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.trip;
      const trip = tripData[key];
      if (!trip) return;

      renderTripModal(trip);
      openTripModal();
    });
  });

  closeBtn?.addEventListener("click", closeTripModal);
  overlay?.addEventListener("click", closeTripModal);

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && tripModal.classList.contains("active")) {
      closeTripModal();
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
  wireNetlifyForm("trip-inquiry-form");

/* ===== Discover Iraq Modal (More Info) ===== */
const tourismModal = document.getElementById("tourism-modal");
const tourismTitle = document.getElementById("tourism-modal-title");
const tourismDesc = document.getElementById("tourism-modal-desc");
const tourismBody = document.getElementById("tourism-modal-body");
const tourismButtons = document.querySelectorAll(".tourism-more");

const places = {
  babylon: {
    title: "Babylon",
    desc: "A legendary ancient capital filled with iconic ruins and Mesopotamian stories.",
    sections: [
      { h: "Best for", items: ["Ancient history lovers", "First-time Iraq visitors", "Photography"] },
      { h: "Highlights", items: ["Ancient walls & ruins", "Royal heritage sites", "Classic Mesopotamian atmosphere"] },
      { h: "Tips", items: ["Best visited with a guide", "Morning or late afternoon for light/temperature"] }
    ]
  },
  ur: {
    title: "Ur (Ziggurat of Ur)",
    desc: "One of the oldest cities in human history — a powerful landmark of early civilization.",
    sections: [
      { h: "Best for", items: ["Archaeology fans", "Culture explorers", "Educational travel"] },
      { h: "Highlights", items: ["Ziggurat monument", "Ancient city remains", "Deep historical context"] },
      { h: "Tips", items: ["Bring water + hat", "Combine with other southern sites for a full day"] }
    ]
  },
  Soran: {
    title: "Soran",
    desc: "A popular mountain destination in the Kurdistan Region of Iraq, surrounded by deep valleys, rivers, and green highlands — perfect for nature lovers and relaxed exploration.",
    sections: [
      { h: "Best for", items: ["Nature & mountain lovers", "Summer escapes from city heat", "Photography & scenic views"] },
      { h: "Highlights", items: ["Mountain views and fresh air", "Nearby canyons, rivers, and waterfalls", "Peaceful atmosphere"] },
      { h: "Tips", items: ["Best visited in spring and summer", "Bring light jackets for cooler evenings"] }
    ]
  },
  erbil: {
    title: "Erbil Citadel",
    desc: "A UNESCO World Heritage site in a city with thousands of years of continuous life.",
    sections: [
      { h: "Best for", items: ["City explorers", "Heritage & markets", "Food + culture"] },
      { h: "Highlights", items: ["Citadel walk", "Old bazaars", "Historic city views"] },
      { h: "Tips", items: ["Sunset is perfect", "Combine with local markets and museums"] }
    ]
  },
  lalish: {
    title: "Lalish",
    desc: "The spiritual heart of the Yazidi faith — peaceful, respectful, and unforgettable.",
    sections: [
      { h: "Best for", items: ["Cultural travelers", "Spiritual heritage", "Quiet scenic visits"] },
      { h: "Highlights", items: ["Sacred architecture", "Valley setting", "Unique cultural experience"] },
      { h: "Tips", items: ["Dress respectfully", "Best with local guidance for context"] }
    ]
  },
  amedi: {
    title: "Amedi (Amadiya)",
    desc: "A dramatic mountain city on a high plateau — views, culture, and cool air.",
    sections: [
      { h: "Best for", items: ["Nature lovers", "Mountain road trips", "Photography"] },
      { h: "Highlights", items: ["Panoramic viewpoints", "Old town atmosphere", "Nearby scenic valleys"] },
      { h: "Tips", items: ["Best in spring/summer", "Great stop on Duhok–Zakho routes"] }
    ]
  }
};

function openTourismModal(key) {
  const place = places[key];
  if (!place) return;

  tourismTitle.textContent = place.title;
  tourismDesc.textContent = place.desc;

  tourismBody.innerHTML = place.sections
    .map(s => `
      <div class="tourism-modal-box">
        <h4>${s.h}</h4>
        <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>
    `)
    .join("");

  tourismModal.classList.add("active");
  tourismModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeTourismModal() {
  tourismModal.classList.remove("active");
  tourismModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

tourismButtons.forEach(btn => {
  btn.addEventListener("click", () => openTourismModal(btn.dataset.place));
});

tourismModal.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") closeTourismModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && tourismModal.classList.contains("active")) {
    closeTourismModal();
  }
});
/* =======================
   ABOUT STATS COUNT UP (on scroll)
======================== */
function animateCount(el, target, duration = 1200, suffix = "") {
  const start = 0;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    el.textContent = value + suffix;

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const aboutSection = document.querySelector("#about");
const statNumbers = document.querySelectorAll(".stat-number");

let statsStarted = false;

if (aboutSection && statNumbers.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsStarted) {
          statsStarted = true;

          statNumbers.forEach((el) => {
            const staticVal = el.dataset.static;
            if (staticVal) {
              el.textContent = staticVal;
              return;
            }

            const target = parseInt(el.dataset.target || "0", 10);
            const suffix = el.dataset.suffix || "";

            // start from 0 every time
            el.textContent = "0" + suffix;

            // small delay per card (nice effect)
            const delay = Array.from(statNumbers).indexOf(el) * 120;
            setTimeout(() => animateCount(el, target, 2500, suffix), delay);
          });

          observer.unobserve(aboutSection);
        }
      });
    },
    { threshold: 0.35 } // starts when ~35% of section is visible
  );

  observer.observe(aboutSection);
}

});
