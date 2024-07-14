import { lenisSmoothScrollBar } from "./lenisSmoothScrollBar.js";
import { overScrollBouncing } from "./overScrollBouncing.js";

$(function () {
  // Loading 애니메이션
  // introLoadingAnimation();
  headerGnbAnimation();

  // 새로고침 시 최상단으로 스크롤 이동
  $(window).on("unload ", function () {
    $(window).scrollTop(0);
  });
});

function introLoadingAnimation() {
  const tlIntroLoading = gsap.timeline();
  tlIntroLoading
    .to('.sc-loading [class*="-box"]', {
      yPercent: -100,
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
        // 컨테이너 최상단, 최하단에서 스크롤 시 bounce 애니메이션 적용
        overScrollBouncing("#wrapper", "#wrapper-inner", 0.86);
        // Loading 애니메이션 동작 시 스크롤 방지를 위한 hidden 제거
        $("body").css("overflow", "auto");
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
function headerGnbAnimation() {
  const tlGnb = gsap.timeline();

  tlGnb.to("#header .link-logo", {
    scale: 0.1,
    left: -100,
    duration: 0.1,
  });

  ScrollTrigger.create({
    trigger: "#header",
    start: "50% 0%",
    end: "100% 0%",
    animation: tlGnb,
    markers: true,
    scrub: true,
  });
}
