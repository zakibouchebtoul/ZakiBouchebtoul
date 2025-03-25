let ctx,
  $ = window.$;
import { gsap, ScrollTrigger } from "../../vendor.js";
gsap.registerPlugin(ScrollTrigger);
export default function initSectionScale() {
  ctx = gsap.context(() => {
    const t = $("[data-animate=section-in]"),
      e = $("[data-animate=outline-section]"),
      i = gsap.timeline(),
      r = gsap.timeline();
    return (
      t.each((t, e) => {
        const r = gsap.timeline();
        r.from(e, { scale: 0.9, duration: 0.25 }),
          ScrollTrigger.create({
            animation: r,
            trigger: e,
            start: "top 90%",
            end: "top center",
            scrub: 0.5,
          }),
          i.add(r);
      }),
      e.each((t, e) => {
        const i = gsap.timeline(),
          a = $(e).find(".outline-wrap");
        i.from(a, { opacity: 0, scale: 1.2, ease: "expo.out" }),
          ScrollTrigger.create({
            animation: i,
            trigger: e,
            start: "top center",
            end: "bottom 25%",
            scrub: 0.5,
          }),
          r.add(i);
      }),
      [i, r]
    );
  });
}
export function killSectionScale() {
  ctx && ctx.revert();
}
