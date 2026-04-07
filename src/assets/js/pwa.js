if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      // Trigger an update check on each load so refreshed assets can be cached
      // in the background while the current page still comes from cache first.
      registration.update().catch(() => {});
    } catch (error) {
      console.warn("Service worker registration failed", error);
    }
  });
}

const navShell = document.querySelector("[data-nav-shell]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const mobileNavMq = window.matchMedia("(max-width: 700px)");

if (navShell && navToggle && navLinks) {
  const setNavOpen = (isOpen) => {
    navShell.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavMq.matches) {
        setNavOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileNavMq.matches) {
      return;
    }

    if (!navShell.contains(event.target)) {
      setNavOpen(false);
    }
  });

  const handleViewportChange = () => {
    if (!mobileNavMq.matches) {
      setNavOpen(false);
    }
  };

  if (typeof mobileNavMq.addEventListener === "function") {
    mobileNavMq.addEventListener("change", handleViewportChange);
  } else {
    mobileNavMq.addListener(handleViewportChange);
  }
}
