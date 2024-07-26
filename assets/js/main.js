import { lenisSmoothScrollBar } from "./lenisSmoothScrollBar.js";
import { overScrollBouncing } from "./overScrollBouncing.js";

$(function () {
  // lenisSmoothScrollBar();
  // Loading 애니메이션
  introLoadingAnimation();
  // gnb 스크롤 애니메이션
  headerGnbAnimation();
  // section intro 영역 loop 애니메이션
  // scIntroLoopAnimation();
  // section breads 영역 스크롤 애니메이션
  scBreadsAnimation();

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
  ScrollTrigger.create({
    trigger: "#header",
    start: "50% 0%",
    end: "100% 0%",
    scrub: true,
    onEnter: () => {
      gsap.to("#header .link-logo", {
        scale: 0.06,
        duration: 0.5,
        ease: "power3.inOut",
        onStart: () => {
          gsap.to("#header .link-logo", { position: "fixed", top: 25 });
        },
      });
      gsap.to("#gnb", {
        left: "25%",
        duration: 0.5,
      });
    },
    onLeaveBack: () => {
      gsap.to("#header .link-logo", {
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut",
        onUpdate: () => {
          gsap.to("#header .link-logo", { position: "static" });
        },
      });
      gsap.to("#gnb", {
        left: 25,
        duration: 0.5,
      });
    },
  });

  ScrollTrigger.create({
    trigger: "#gnb",
    start: "0% top+=25px",
    scrub: true,
    onEnter: () => {
      gsap.to("#gnb", { position: "fixed", top: 25, duration: 0 });
    },
    onLeaveBack: () => {
      gsap.to("#gnb", { position: "absolute", top: "auto", duration: 0 });
    },
  });
}
function scIntroLoopAnimation() {
  const tlLoop = gsap.timeline();

  tlLoop.to(".sc-intro .loop-area svg", {
    y: -100,
    repeat: -1,
    duration: 1,
  });

  // ScrollTrigger.create({
  //   trigger: '.sc-intro .loop-area svg',
  //   start: 'top center',
  //   end: 'bottom center',
  //   animation:tlLoop ,
  //   markers: true,
  //   scrub:true,
  // })
}
function scBreadsAnimation() {
  const textSplit = new SplitType(".sc-breads .grid-item.title h3");
  gsap.set(".bg-fixed-logo", { autoAlpha: 0 });
  gsap.set(".bg-fixed-logo .link-logo", {
    scale: 0.064,
  });
  gsap.set(".fixed-logo .link-logo div", {
    y: (i) => {
      return 400 * i;
    },
  });

  const tl = gsap.timeline();
  tl.to(".bg-fixed-logo .link-logo div", {
    y: (i) => {
      return 400 * i;
    },
    duration: 0.1,
  })
    .set(".bg-fixed-logo .link-logo", {
      autoAlpha: 1,
    })
    .to(".group-breads-intro:first-child .grid-wrap", {
      height: 0,
    })
    .to(
      ".sc-breads .intro-wrapper .bg",
      {
        height: 0,
      },
      "<"
    )
    .to(
      textSplit.chars,
      {
        fontSize: "415px",
        duration: 0.1,
        stagger: 0.01,
      },
      "-=0.45"
    )
    .to(".fixed-logo .link-logo div", {
      y: (i) => {
        return 550 * i;
      },
      duration: 0.03,
    })
    .to(".fixed-logo .link-logo div", {
      x: (i) => {
        return -270 * i;
      },
      duration: 0.03,
    });

  ScrollTrigger.create({
    trigger: ".sc-breads .intro-wrapper",
    start: "0% 0%",
    end: "100% 100%",
    animation: tl,
    markers: true,
    scrub: 1,
    onEnter: () => {
      gsap.set("#header .link-logo", { autoAlpha: 0 });
      gsap.set(".bg-fixed-logo", { autoAlpha: 1 });
    },
    onLeaveBack: () => {
      gsap.set("#header .link-logo", { autoAlpha: 1 });
      gsap.set(".bg-fixed-logo", { autoAlpha: 0 });
    },
    onUpdate: ({ progress }) => {
      if (progress >= 0.85) {
        gsap.to("#gnb .nav-item", { color: "#96ff00", duration: 0.4 });
        gsap.to("#gnb button svg", { fill: "#96ff00", duration: 0.4 });
      } else {
        gsap.to("#gnb .nav-item", { color: "#000", duration: 0.4 });
        gsap.to("#gnb button svg", { fill: "#000", duration: 0.4 });
      }
    },
  });
}
