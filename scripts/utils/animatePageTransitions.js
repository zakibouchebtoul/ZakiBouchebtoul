let $ = window.$;
import { gsap, Flip } from "../vendor.js";
import animateTextSlide from "../features/general/animateTextSlide.js";
import helperFunctions, { resetWebflow } from "./helperFunctions.js";
import { proxy } from "./pageReadyHandler.js";
import { isDesktop, isMobile, isTablet } from "./variables.js";
let innerWrapStartGap = "70%",
  logoPathStartPercentage = 35,
  logoScale = 30,
  logoRotation = 30;
const mm = gsap.matchMedia();
mm.add(isMobile, () => {
  logoPathStartPercentage = 20;
});
const transitionSection = $("[data-animate=transition]"),
  transitionLogo = transitionSection.find("[data-animate=transition-logo]"),
  navBar = $("[data-animate=nav-bar]"),
  loadingIndicator = transitionSection.find("[data-animate=preload-indicator]");
function loader(t) {
  const a = transitionSection.find("[data-animate=transition-inner-wrap]"),
    i = transitionSection.find("[data-animate=text-slide-wrap]"),
    e = transitionLogo.find(
      "[data-animate=transition-logo-path][data-direction=left]"
    ),
    n = transitionLogo.find(
      "[data-animate=transition-logo-path][data-direction=right]"
    );
  let o = { value: 0 },
    r = t,
    s = 0.25;
  null !== sessionStorage.getItem("visited") && ((r = t / 2), (s = 0)),
    sessionStorage.setItem("visited", "true");
  const d = gsap.timeline({ defaults: { duration: r, ease: "expo.out" } });
  return (
    d.set(transitionSection, { display: "block", immediateRender: !0 }, 0),
    setTransitionLogoPositions(transitionLogo),
    d
      .from(
        a,
        { columnGap: innerWrapStartGap, duration: r, ease: "expo.inOut" },
        "<"
      )
      .from(
        e,
        { xPercent: 2 * -logoPathStartPercentage, ease: "expo.inOut" },
        "<"
      )
      .from(
        n,
        { xPercent: 2 * logoPathStartPercentage, ease: "expo.inOut" },
        "<"
      )
      .call(() => animateTextSlide(i, 1.5), [], ">-25%")
      .call(() => transitionOut(!0), [], ">+1"),
    loadingIndicator.length > 0 &&
      d
        .from(
          loadingIndicator,
          { yPercent: 100, duration: 1, ease: "expo.inOut" },
          0
        )
        .to(
          o,
          {
            value: 100,
            duration: r,
            onUpdate: function () {
              let t = Math.round(o.value);
              loadingIndicator.text(t + "%");
            },
            ease: "expo.inOut",
          },
          0
        ),
    d
  );
}
function transitionIn() {
  const t = $("[data-animate=transition]"),
    a = t.find("[data-animate=transition-logo]"),
    i = a.find("[data-animate=transition-logo-path][data-direction=left]"),
    e = a.find("[data-animate=transition-logo-path][data-direction=right]"),
    n = t.find("[data-animate=transition-inner-wrap]"),
    o = $("[data-animate=detail-nav-wrap]"),
    r = gsap.timeline({
      defaults: { duration: 1, ease: "expo.out" },
      onStart: () => {
        proxy.pageReady = !1;
      },
    });
  return (
    loadingIndicator.length > 0 &&
      gsap.set(loadingIndicator, { yPercent: 100 }, 0),
    n.length > 0 && gsap.set(n, { opacity: 0 }, 0),
    r.set(t, { display: "block" }),
    r.call(
      () => helperFunctions.slideInNavigations(navBar, o, 1).reverse(),
      [],
      0
    ),
    r
      .call(() => setTransitionLogoPositions(a), [], 0)
      .fromTo(
        a,
        { scale: logoScale, rotateZ: 2 * -logoRotation },
        { scale: 1, rotateZ: 0, duration: 1, ease: "expo.inOut" },
        ">"
      )
      .to(i, { xPercent: -logoPathStartPercentage, duration: 0.5 })
      .to(e, { xPercent: logoPathStartPercentage, duration: 0.5 }, "<")
      .to(n, { columnGap: innerWrapStartGap, duration: 0.5 }, "<+0.1"),
    r
  );
}
async function transitionOut(t) {
  const a = $("[data-animate=transition]"),
    i = a.find("[data-animate=transition-logo]"),
    e = i.find("[data-animate=transition-logo-path][data-direction=left]"),
    n = i.find("[data-animate=transition-logo-path][data-direction=right]"),
    o = a.find("[data-animate=transition-inner-wrap]"),
    r = $("[data-animate=detail-nav-wrap]"),
    s = gsap.timeline({
      defaults: { duration: 1, ease: "expo.out" },
      onComplete: () => {
        requestAnimationFrame(() => {
          proxy.pageReady = !0;
        });
      },
    });
  if (
    (gsap.set(a, { display: "block" }),
    gsap.set(navBar, { yPercent: -100 }),
    !0 !== t &&
      (gsap.set(e, { xPercent: -logoPathStartPercentage }),
      gsap.set(n, { xPercent: logoPathStartPercentage }),
      s
        .to(e, { xPercent: 0, duration: 0.5, ease: "expo.inOut" })
        .to(n, { xPercent: 0, duration: 0.5, ease: "expo.inOut" }, "<")
        .from(
          o,
          { columnGap: innerWrapStartGap, duration: 0.5, immediateRender: !0 },
          "<+0.1"
        )),
    !0 === t)
  ) {
    const t = a.find("[data-animate=preload-indicator]");
    s.to(t, { yPercent: 100, duration: 1, ease: "expo.inOut" }, "<");
  }
  return (
    s
      .to(
        i,
        {
          scale: logoScale,
          rotate: logoRotation,
          duration: 0.5,
          ease: "expo.inOut",
        },
        "<+50%"
      )
      .to(o, { opacity: 0, duration: 0.5 }, "<")
      .call(
        () => helperFunctions.slideInNavigations(navBar, r, 1).play(),
        [],
        ">"
      )
      .set(a, { display: "none" }),
    s
  );
}
function makeItemActive(t) {
  const a = $("[data-barba-namespace=detail-page]")
    .find("[data-flip-element=text-identifier]")
    .text();
  $(t.current.container)
    .find("[data-flip-element=teaser]")
    .each((t, i) => {
      const e = $(i).find("[data-flip-element=text-identifier]").text(),
        n = a.replace(/\s/g, ""),
        o = e.replace(/\s/g, "");
      n.toUpperCase() === o.toUpperCase() && $(i).addClass("active-flip-item");
    });
}
async function flipAnimation(t, a, i) {
  const e = t.find("[data-flip-id=flip-img]").attr("src"),
    n = a.find("[data-flip-id=flip-img]").attr("src");
  if (e && n) {
    const e = a.find("[data-flip-id=flip-img]"),
      n = t.find("[data-flip-id=flip-img]"),
      o = Flip.getState(n);
    e.addClass("is-hidden"),
      i.append(n),
      await Flip.from(o, {
        duration: 1.5,
        ease: "expo.inOut",
        toggleClass: "is-flipping",
        onStart: () => {
          proxy.pageReady = !1;
        },
        onComplete: () => {
          const t = i.find("[data-flip-id=flip-img]"),
            a = Flip.getState(t);
          t.insertAfter(e),
            e.remove(),
            Flip.from(a, {
              duration: 1.25,
              ease: "expo.inOut",
              toggleClass: "is-flipping",
              onComplete: () => {
                $("[data-flip-element=first-target-wrap]").remove(),
                  requestAnimationFrame(() => {
                    proxy.pageReady = !0;
                  });
              },
            });
        },
      });
  }
}
function setTransitionLogoPositions(t) {
  let a, i;
  mm.add(isTablet, () => {
    (a = $(t).find(
      "[data-animate=transition-logo-path][data-direction=left][data-size=small]"
    )),
      (i = $(t).find(
        "[data-animate=transition-logo-path][data-direction=right][data-size=small]"
      ));
  }),
    mm.add(isDesktop, () => {
      (a = $(t).find(
        "[data-animate=transition-logo-path][data-direction=left][data-size=large]"
      )),
        (i = $(t).find(
          "[data-animate=transition-logo-path][data-direction=right][data-size=large]"
        ));
    });

}
function debounce(t, a) {
  let i;
  return function (...e) {
    clearTimeout(i), (i = setTimeout(() => t.apply(this, e), a));
  };
}
window.addEventListener(
  "resize",
  debounce(() => setTransitionLogoPositions(transitionLogo), 150)
);
export default {
  loader,
  transitionOut,
  transitionIn,
  makeItemActive,
  flipAnimation,
  setTransitionLogoPositions,
};
