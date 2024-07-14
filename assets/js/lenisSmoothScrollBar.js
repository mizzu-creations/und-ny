export const lenisSmoothScrollBar = () => {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.create({
    trigger: "#wrapper",
    start: "0% 0%",
    end: "100% 100%",
  });
};
