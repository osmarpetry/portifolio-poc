const cachePrefix = "portfolio-";
const localhostHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
const isLocalDevelopmentHost = localhostHosts.has(window.location.hostname);
const localSwResetSessionKey = "portfolio-local-sw-reset";

async function clearPortfolioCaches() {
  if (!("caches" in window)) {
    return;
  }

  const cacheKeys = await caches.keys();

  await Promise.all(
    cacheKeys
      .filter((cacheKey) => cacheKey.startsWith(cachePrefix))
      .map((cacheKey) => caches.delete(cacheKey)),
  );
}

async function resetLocalServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(registrations.map((registration) => registration.unregister()));
  await clearPortfolioCaches();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      if (isLocalDevelopmentHost) {
        const hadController = Boolean(navigator.serviceWorker.controller);

        await resetLocalServiceWorkers();

        if (hadController && !sessionStorage.getItem(localSwResetSessionKey)) {
          sessionStorage.setItem(localSwResetSessionKey, "true");
          window.location.reload();
          return;
        }

        sessionStorage.removeItem(localSwResetSessionKey);
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

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
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function shouldSmoothScrollAnchor(link) {
  if (!link?.hash || link.hash === "#") {
    return false;
  }

  if (link.classList.contains("skip-link")) {
    return false;
  }

  const currentUrl = new URL(window.location.href);
  const linkUrl = new URL(link.href, window.location.origin);

  return (
    currentUrl.origin === linkUrl.origin &&
    currentUrl.pathname === linkUrl.pathname
  );
}

document.querySelectorAll('a[href*="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (!shouldSmoothScrollAnchor(link)) {
      return;
    }

    const target = document.querySelector(link.hash);

    if (!target) {
      return;
    }

    event.preventDefault();
    history.pushState(null, "", link.hash);
    target.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });
  });
});

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
