const carousels = document.querySelectorAll("[data-company-carousel]");

carousels.forEach((carousel) => {
  const track = carousel.querySelector("[data-company-carousel-track]");
  const prevButton = carousel.querySelector("[data-company-carousel-prev]");
  const nextButton = carousel.querySelector("[data-company-carousel-next]");

  if (!track || !prevButton || !nextButton) {
    return;
  }

  const slides = Array.from(track.children);

  const getStep = () => {
    const firstSlide = slides[0];
    if (!firstSlide) {
      return 0;
    }

    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");
    return firstSlide.getBoundingClientRect().width + gap;
  };

  const scrollByStep = (direction) => {
    track.scrollBy({
      left: getStep() * direction,
      behavior: "smooth",
    });
  };

  prevButton.addEventListener("click", () => scrollByStep(-1));
  nextButton.addEventListener("click", () => scrollByStep(1));
});
