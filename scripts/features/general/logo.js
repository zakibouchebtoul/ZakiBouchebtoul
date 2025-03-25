let ctx,
  $ = window.$;
import { gsap } from "../../vendor.js";
export default function initLogo() {
  ctx = gsap.context(() => {
    const t = $("[data-animate=logo]"),
      e = t.find("[data-animate=logo-path-left]"),
      o = t.find("[data-animate=logo-path-right]"),
      a = gsap.timeline({
        defaults: { duration: 0.5, ease: "back.inOut" },
        paused: !0,
      });
    a.to(e, { xPercent: -35 }).to(o, { xPercent: 35 }, "<"),
      t.on("mouseenter", () => {
        a.play();
      }),
      t.on("mouseleave", () => {
        a.reverse();
      });
  });
}
export function killLogo() {
  ctx && ctx.revert();
}
