const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  fallbackCopy(text);
}

function showCopiedState(element, copiedLabel = "Copied") {
  if (!element) {
    return;
  }

  const originalLabel = element.dataset.originalLabel || element.textContent.trim();
  element.dataset.originalLabel = originalLabel;
  element.textContent = copiedLabel;
  element.classList.add("is-copied");

  window.setTimeout(() => {
    element.textContent = originalLabel;
    element.classList.remove("is-copied");
  }, 1800);
}

function attachHeadingCopyBehavior() {
  document.querySelectorAll("[data-copy-headings]").forEach((scope) => {
    const selector = scope.getAttribute("data-copy-headings");

    if (!selector) {
      return;
    }

    scope.querySelectorAll(selector).forEach((heading) => {
      if (!heading.id || heading.dataset.headingCopyReady === "true") {
        return;
      }

      heading.dataset.headingCopyReady = "true";
      heading.classList.add("linkable-heading");
      heading.setAttribute("title", "Click to copy section link");

      const button = document.createElement("button");
      button.type = "button";
      button.className = "heading-anchor-button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", `Copy link to ${heading.textContent.trim()}`);
      heading.appendChild(button);

      const copyHeadingLink = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const nextHash = `#${heading.id}`;
        const nextUrl = `${window.location.origin}${window.location.pathname}${nextHash}`;

        window.history.pushState(null, "", nextHash);
        heading.scrollIntoView({
          block: "start",
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        });

        try {
          await copyText(nextUrl);
          showCopiedState(button);
        } catch (error) {
          console.warn("Failed to copy heading link", error);
        }
      };

      heading.addEventListener("click", (event) => {
        if (event.target.closest("a") || event.target.closest("button")) {
          return;
        }

        copyHeadingLink(event);
      });

      button.addEventListener("click", copyHeadingLink);
    });
  });
}

function attachCodeCopyButtons() {
  document.querySelectorAll('[data-copy-code="true"]').forEach((scope) => {
    scope.querySelectorAll("pre").forEach((block) => {
      if (block.parentElement?.classList.contains("prose-code-block")) {
        return;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "prose-code-block";
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "prose-code-block__copy";
      button.textContent = "Copy";
      button.addEventListener("click", async () => {
        const code = block.querySelector("code");
        const content = code ? code.textContent : block.textContent;

        try {
          await copyText(content);
          showCopiedState(button);
        } catch (error) {
          console.warn("Failed to copy code block", error);
        }
      });

      wrapper.appendChild(button);
    });
  });
}

function attachPageLinkButtons() {
  document.querySelectorAll("[data-copy-page-link]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await copyText(window.location.href);
        showCopiedState(button);
      } catch (error) {
        console.warn("Failed to copy page link", error);
      }
    });
  });
}

function attachPostsFilter() {
  const postsIndex = document.querySelector("[data-posts-index]");

  if (!postsIndex) {
    return;
  }

  const buttons = Array.from(postsIndex.querySelectorAll("[data-posts-filter-tag]"));
  const items = Array.from(postsIndex.querySelectorAll("[data-post-item]"));
  const emptyState = postsIndex.querySelector("[data-posts-empty]");
  const status = postsIndex.querySelector("[data-posts-filter-status]");

  const applyFilter = (tagSlug = "") => {
    const normalizedTag = String(tagSlug || "").trim().toLowerCase();
    let visibleItems = 0;

    items.forEach((item) => {
      const postTags = (item.getAttribute("data-post-tags") || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const matches = !normalizedTag || postTags.includes(normalizedTag);

      item.hidden = !matches;

      if (matches) {
        visibleItems += 1;
      }
    });

    buttons.forEach((button) => {
      const buttonTag = (button.getAttribute("data-posts-filter-tag") || "").trim().toLowerCase();
      button.classList.toggle("is-active", buttonTag === normalizedTag);
    });

    if (emptyState) {
      emptyState.hidden = visibleItems !== 0;
    }

    if (status) {
      const activeButton = buttons.find(
        (button) =>
          (button.getAttribute("data-posts-filter-tag") || "").trim().toLowerCase() ===
          normalizedTag,
      );
      const label = activeButton ? activeButton.textContent.trim() : "All posts";

      status.textContent = normalizedTag
        ? `${visibleItems} post${visibleItems === 1 ? "" : "s"} in ${label}`
        : `${buttons.length - 1} tags`;
    }

    const nextUrl = new URL(window.location.href);

    if (normalizedTag) {
      nextUrl.searchParams.set("tag", normalizedTag);
    } else {
      nextUrl.searchParams.delete("tag");
    }

    window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.getAttribute("data-posts-filter-tag") || "");
    });
  });

  applyFilter(new URLSearchParams(window.location.search).get("tag") || "");
}

attachHeadingCopyBehavior();
attachCodeCopyButtons();
attachPageLinkButtons();
attachPostsFilter();
