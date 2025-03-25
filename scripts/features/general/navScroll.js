let ctx,
  $ = window.$;
import { gsap } from "../../vendor.js";
import { fullClipPath, rightSideClipPath } from "../../utils/variables.js";
import lenis from "../../utils/smoothScroll.js";
let navBar,
  detailNav,
  navBarScrollTl,
  isPlaying = !1;
export default function initNavScroll() {
  ctx = gsap.context(() => {
    (navBar = $("[data-animate=nav-bar]")),
      (detailNav = $("[data-animate=detail-nav-wrap]"));
    const a = $("[data-animate=detail-link-text]"),
      l = navBar.find("[data-animate=navbar-wrap-inner]"),
      t = navBar.find("[data-animate=navbar-cta]"),
      i = navBar.find("[data-animate=logo]"),
      n = navBar.find("[data-animate=menu-trigger-text-wrap]");
    (navBarScrollTl = gsap.timeline({
      paused: !0,
      defaults: { duration: 0.5, ease: "power3.inOut" },
    })),
      navBarScrollTl
        .to(i, { scale: 0.7 }, "<")
        .to(n, { width: 0 }, "<")
        .fromTo(
          t,
          { clipPath: fullClipPath },
          { clipPath: rightSideClipPath },
          "<"
        ),
      detailNav.length > 0
        ? navBarScrollTl
            .to(a, { xPercent: 100 }, "<")
            .to(detailNav, { padding: "0 1.5rem" }, "<")
            .to(l, { padding: "0 1.5rem" }, "<")
        : navBarScrollTl.to(l, { padding: "0 1.5rem 0 0" }, "<"),
      lenis.on("scroll", ({ velocity: a }) => {
        0 === a || isPlaying
          ? 0 === a && isPlaying && (navBarScrollTl.reverse(), (isPlaying = !1))
          : (navBarScrollTl.play(), (isPlaying = !0));
      });
  });
}
export function killNavScroll() {
  ctx && (ctx.revert(), (detailNav = null));
}
