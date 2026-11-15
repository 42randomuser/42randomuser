(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealTargets = document.querySelectorAll(
    ".projects__intro, .repo, .connect"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if (reduceMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 0.08, 0.32)}s`;
    observer.observe(el);
  });
})();
