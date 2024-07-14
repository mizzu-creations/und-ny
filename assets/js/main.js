import { lenisSmoothScrollBar } from "./lenisSmoothScrollBar.js";
import { changeBgColor } from "./changeBgColor.js";

$(function () {
  // Loading 애니메이션
  introLoadingAnimation();

  // 배경색 변경
  changeBgColor();
});

function introLoadingAnimation() {
  const tlIntroLoading = gsap.timeline();
  tlIntroLoading
    .from('.sc-loading [class*="-box"]', {
      yPercent: 100,
      stagger: 0.2,
      delay: 1,
    })
    .to(".sc-loading", {
      height: 0,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        // Loading 애니메이션 모두 끝난 후, 부드러운 스크롤 적용
        lenisSmoothScrollBar();
      },
    })
    .from(
      '#header [class*="-box"]',
      {
        yPercent: 5,
        duration: 0.5,
      },
      "-=0.5"
    )
    .from(
      "#header .hero-area img",
      {
        yPercent: 5,
        duration: 1,
      },
      "<"
    );
}
