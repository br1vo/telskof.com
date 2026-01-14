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
     TRIP DETAILS MODAL
  ======================== */
  const tripModal = document.getElementById("trip-modal");
  const tripModalBody = document.getElementById("trip-modal-body");
  const tripModalTitle = document.getElementById("trip-modal-title");

  const tripData = {
    "meso-mountains": {
      title: "Mesopotamia to Mountains – Grand Iraq & Kurdistan Journey",
      duration: "10 Days / 9 Nights",
      route: "Baghdad → Samarra → Mosul → Duhok → Amadiya → Sulaymaniyah → Halabja → Erbil",
      highlights: [
        "Mesopotamian sites: Babylon, Nimrud, Hatra",
        "Baghdad heritage, museums & Tigris boat ride",
        "Assyrian, Islamic & Yazidi landmarks",
        "Mountain roads, caves & scenic valleys",
        "Local markets, traditional food & culture"
      ],
      includes: ["Hotels with breakfast", "Private transport & driver", "Professional guide", "Entrance fees"],
      notIncluded: ["Flights", "Lunches / dinners", "Visa fees"],
      idealFor: "History lovers, culture explorers, first-time Iraq visitors",
      price: "From $2,200 – $2,600 per person (depends on group size)"
    },

    "cradle-explorer": {
      title: "Cradle of Civilization – Southern Iraq & Kurdistan Explorer",
      duration: "9 Days / 8 Nights",
      route: "Basra → Marshes → Ur → Najaf → Karbala → Baghdad → Mosul → Erbil",
      highlights: [
        "Shatt al-Arab & Basra heritage",
        "Marshes boat ride & traditional reed houses",
        "Ziggurat of Ur & ancient Babylon",
        "Holy cities: Najaf & Karbala",
        "Mosul old city & Erbil citadel"
      ],
      includes: ["Hotels with breakfast", "Transport & local guide", "Entrance fees"],
      notIncluded: ["Flights", "Lunches / dinners", "Visa fees"],
      idealFor: "Cultural travelers, archaeology fans, religious heritage visitors",
      price: "From $2,000 – $2,400 per person"
    },

    "heart-kurdistan": {
      title: "Heart of Kurdistan – Culture, Mountains & Ancient Faiths",
      duration: "11 Days / 10 Nights",
      route: "Erbil → Duhok → Amadiya → Zakho → Lalish → Sulaymaniyah → Rawanduz",
      highlights: [
        "Erbil Citadel & bazaars",
        "Assyrian reliefs & monasteries",
        "Enishke Cave & ancient villages",
        "Lalish – Yazidi holy site",
        "Dukan Lake, Rawanduz & waterfalls"
      ],
      includes: ["Hotels with breakfast", "Private car & driver", "Guide & entrance fees"],
      notIncluded: ["Flights", "Lunches / dinners", "Visa fees"],
      idealFor: "Nature lovers, photographers, cultural explorers",
      price: "From $2,100 – $2,500 per person"
    },

    "kurdistan-highlights": {
      title: "Kurdistan Highlights – Short Cultural Escape",
      duration: "8 Days / 7 Nights",
      route: "Erbil → Duhok → Amadiya → Lalish → Sulaymaniyah",
      highlights: [
        "Erbil Citadel & old markets",
        "Monastery of Mar Mattai",
        "Four Pillars Temple",
        "Lalish & Assyrian monasteries",
        "Shanidar Cave & Hamilton Road"
      ],
      includes: ["Hotels with breakfast", "Transport & guide", "Entrance fees"],
      notIncluded: ["Flights", "Lunches / dinners", "Visa fees"],
      idealFor: "Short trips, first-time Kurdistan visitors",
      price: "From $1,500 – $1,900 per person"
    }
  };

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
      <div class="trip-modal-row">
        <h4>Duration</h4>
        <div>${escapeHtml(trip.duration)}</div>
      </div>

      <div class="trip-modal-row">
        <h4>Route highlights</h4>
        <div>${escapeHtml(trip.route)}</div>
      </div>

      <div class="trip-modal-row">
        <h4>Main experiences</h4>
        <ul>
          ${trip.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      </div>

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

      ${trip.idealFor ? `
        <div class="trip-modal-row">
          <h4>Ideal for</h4>
          <div>${escapeHtml(trip.idealFor)}</div>
        </div>
      ` : ""}

      <div class="trip-modal-row">
        <h4>Price</h4>
        <div class="trip-price">💰 ${escapeHtml(trip.price)}</div>
      </div>
    `;
  }

  // Reuse same modal behavior style as visa modal
  if (tripModal) {
    const overlay = tripModal.querySelector(".modal-overlay");
    const closeBtn = tripModal.querySelector(".modal-close");

    const focusableSelectors = "input, textarea, button, select, a[href]";
    let focusableElements = [];
    let firstFocusable, lastFocusable;

    function openTripModal() {
      tripModal.classList.add("active");
      tripModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      focusableElements = Array.from(
        tripModal.querySelectorAll(focusableSelectors)
      ).filter(el => !el.disabled);

      if (focusableElements.length) {
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
        firstFocusable.focus();
      }
    }

    function closeTripModal() {
      tripModal.classList.remove("active");
      tripModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

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

      if (e.key === "Tab" && tripModal.classList.contains("active")) {
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
  ishtar: {
    title: "Ishtar Gate",
    desc: "A symbol of Babylonian art and empire — one of Iraq’s most iconic heritage visuals.",
    sections: [
      { h: "Best for", items: ["Heritage lovers", "Museum + history travelers", "Quick cultural stop"] },
      { h: "Highlights", items: ["Babylonian design motifs", "Mesopotamian history", "Great photo moments"] },
      { h: "Tips", items: ["Pair it with Babylon for a complete story", "Ask us for the best viewing location"] }
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

});
