/* =========================================================
   LUNA HOTEL — MAIN JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     CURRENT YEAR
  --------------------------------------------------------- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     SCROLL-SPY (highlight nav link for the section in view)
  --------------------------------------------------------- */
  const spySectionIds = [
    "home",
    "about",
    "rooms",
    "facilities",
    "gallery",
    "contact",
  ];
  const spySections = spySectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll(
    ".nav-list a[href^='#'], .mobile-navigation a[href^='#']",
  );

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  if (spySections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        // Counts a section as "current" once it crosses the middle band of the viewport
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      },
    );

    spySections.forEach((section) => spyObserver.observe(section));

    // Set the correct link immediately on load (before any scrolling happens)
    setActiveLink("home");
  }

  /* ---------------------------------------------------------
     HEADER SCROLL STATE
  --------------------------------------------------------- */
  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  /* ---------------------------------------------------------
     MOBILE MENU
  --------------------------------------------------------- */
  const menuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".mobile-navigation");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isActive = mobileNav.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", String(isActive));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     HERO SLIDER
  --------------------------------------------------------- */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevArrow = document.querySelector(".hero-arrow-prev");
  const nextArrow = document.querySelector(".hero-arrow-next");

  if (slides.length) {
    let current = 0;
    let timer = null;

    const goTo = (index) => {
      slides[current].classList.remove("active");
      dots[current]?.classList.remove("active");

      current = (index + slides.length) % slides.length;

      slides[current].classList.add("active");
      dots[current]?.classList.add("active");
    };

    const startAutoplay = () => {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 6000);
    };

    prevArrow?.addEventListener("click", () => {
      goTo(current - 1);
      startAutoplay();
    });
    nextArrow?.addEventListener("click", () => {
      goTo(current + 1);
      startAutoplay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goTo(i);
        startAutoplay();
      });
    });

    startAutoplay();
  }

  /* ---------------------------------------------------------
     GALLERY FILTERS
  --------------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      galleryItems.forEach((item) => {
        const matches = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !matches);
      });
    });
  });

  /* ---------------------------------------------------------
     ROOMS CAROUSEL ARROWS (simple horizontal scroll)
  --------------------------------------------------------- */
  const roomsGrid = document.querySelector(".rooms-grid");
  const roomsPrev = document.querySelector(".rooms-arrow-prev");
  const roomsNext = document.querySelector(".rooms-arrow-next");

  if (roomsGrid && roomsPrev && roomsNext) {
    const scrollAmount = () =>
      roomsGrid.firstElementChild?.offsetWidth + 22 || 300;

    roomsPrev.addEventListener("click", () => {
      roomsGrid.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    roomsNext.addEventListener("click", () => {
      roomsGrid.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
  }
});

