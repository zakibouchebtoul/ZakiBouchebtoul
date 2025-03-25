import { gsap, ScrollTrigger, SplitType } from "../vendor.js";
import {
  isLandscape,
  isMobile,
  isTablet,
  svgEndFromBottom,
  svgEndFromLeft,
  svgEndFromRight,
  svgEndFromTop,
  svgEndToBottom,
  svgEndToLeft,
  svgEndToRight,
  svgEndToTop,
  svgStartFromBottom,
  svgStartFromLeft,
  svgStartFromRight,
  svgStartFromTop,
  svgStartToBottom,
  svgStartToLeft,
  svgStartToRight,
  svgStartToTop,
} from "./variables.js";
let pageReady = !1;
function getMouseEnterDirection(t, e) {
  const o = e.getBoundingClientRect(),
    r = t.clientX,
    n = t.clientY,
    a = Math.abs(o.top - n),
    i = Math.abs(o.bottom - n),
    s = Math.abs(o.left - r),
    d = Math.abs(o.right - r);
  switch (Math.min(a, i, s, d)) {
    case s:
      return "left";
    case d:
      return "right";
    case a:
      return "top";
    case i:
      return "bottom";
  }
}
function handleCardHoverIn(t, e) {
  let o, r;
  return (
    !0 === e &&
      ("top" === t
        ? ((o = svgStartFromTop), (r = svgEndFromTop))
        : "bottom" === t
        ? ((o = svgStartFromBottom), (r = svgEndFromBottom))
        : "left" === t
        ? ((o = svgStartFromLeft), (r = svgEndFromLeft))
        : "right" === t && ((o = svgStartFromRight), (r = svgEndFromRight))),
    (!1 !== e && e) ||
      ("top" === t
        ? ((o = svgStartFromTop), (r = svgEndFromTop))
        : "bottom" === t
        ? ((o = svgStartFromBottom), (r = svgEndFromBottom))
        : ((o = svgStartFromTop), (r = svgEndFromTop))),
    { start: o, end: r }
  );
}
function handleCardHoverOut(t, e) {
  let o, r;
  return (
    !0 === e
      ? "top" === t
        ? ((o = svgStartToTop), (r = svgEndToTop))
        : "bottom" === t
        ? ((o = svgStartToBottom), (r = svgEndToBottom))
        : "left" === t
        ? ((o = svgStartToLeft), (r = svgEndToLeft))
        : "right" === t && ((o = svgStartToRight), (r = svgEndToRight))
      : (!1 !== e && e) ||
        ("top" === t
          ? ((o = svgStartToTop), (r = svgEndToTop))
          : "bottom" === t
          ? ((o = svgStartToBottom), (r = svgEndToBottom))
          : ((o = svgStartToTop), (r = svgEndToTop))),
    { start: o, end: r }
  );
}
function animateCardHover(t, e, o) {
  if (e && o)
    return gsap.fromTo(
      t,
      { attr: { d: e } },
      { attr: { d: o }, duration: 0.5, ease: "power3.out" }
    );
}
function animateCountdown(t, e, o) {
  gsap.from(t, {
    textContent: o,
    duration: e,
    ease: "power2.out",
    snap: { textContent: 1 },
  });
}
function slideInNavigations(t, e, o) {
  const r = gsap.timeline({
    paused: !0,
    defaults: { duration: o, ease: "power2.out" },
  });
  return (
    r.to(t, { yPercent: 0, ease: "power2.out" }, "<"),
    e.length > 0 && r.to(e, { y: 0 }, "<-0.1"),
    r
  );
}
function createHeroSplitTypes(t) {
  new SplitType(t, { types: "chars" });
}
function refreshScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => {
    t.refresh();
  }),
    window.dispatchEvent(new Event("resize"));
}
function fadeOutPage(t) {
  gsap.to($("[data-animate=inner-page-wrapper]"), {
    opacity: 0,
    duration: 0.5,
    delay: t,
  });
}
function fadeInPage(t) {
  gsap.fromTo(
    $("[data-animate=inner-page-wrapper]"),
    { opacity: 0 },
    { opacity: 1, duration: 0.5, delay: t }
  );
}
function isGoogleAnalyticsCookieSet() {
  const t = ["_ga", "_gid", "_gat"],
    e = document.cookie.split("; ");
  for (let o = 0; o < e.length; o++) {
    const r = e[o].split("=")[0];
    if (t.includes(r)) return !0;
  }
  return !1;
}
function handleResponsiveElementRemoval() {
  if (window.matchMedia(isMobile).matches) {
    document.querySelectorAll(".remove-mobile").forEach(function (t) {
      t.remove();
    });
  }
  if (window.matchMedia(isLandscape).matches) {
    document.querySelectorAll(".remove-landscape").forEach(function (t) {
      t.remove();
    });
  }
  if (window.matchMedia(isTablet).matches) {
    document.querySelectorAll(".remove-tablet").forEach(function (t) {
      t.remove();
    });
  }
  if (window.matchMedia(isTablet).matches) {
    document.querySelectorAll(".remove-desktop").forEach(function (t) {
      t.remove();
    });
  }
}
export function resetWebflow() {
  window.Webflow && window.Webflow.destroy(),
    window.Webflow && window.Webflow.ready(),
    window.Webflow && window.Webflow.require("ix2").init(),
    resetLottieAnimations();
}
function resetLottieAnimations() {
  const t = document.querySelectorAll('[data-animation-type="lottie"]');
  t &&
    t.forEach((t) => {
      const e = window.Webflow.require("lottie").createInstance(t);
      e && e.destroy(), window.Webflow.require("lottie").init();
    });
}
export default {
  pageReady,
  getMouseEnterDirection,
  handleCardHoverIn,
  handleCardHoverOut,
  animateCardHover,
  animateCountdown,
  slideInNavigations,
  createHeroSplitTypes,
  refreshScrollTriggers,
  fadeOutPage,
  fadeInPage,
  isGoogleAnalyticsCookieSet,
  handleResponsiveElementRemoval,
};
