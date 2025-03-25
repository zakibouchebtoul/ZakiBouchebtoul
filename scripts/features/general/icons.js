let ctx,
  $ = window.$;
import { gsap } from "../../vendor.js";
import {
  fullClipPath,
  leftQuarterClipPath,
  rightQuarterClipPath,
} from "../../utils/variables.js";
export default function initIcons() {
  ctx = gsap.context(() => {
    $("[data-animate-icon]").each((e, t) => {
      let a;
      a = $(t).children().length > 1 ? $(t).find("[data-icon]") : t;
      const i = $(t).data("animateIcon"),
        n = gsap.timeline({ paused: !0, defaults: { duration: 0.75 } });
      switch (i) {
        case "star":
          n.to(a, { scale: 0.5, ease: "back.inOut" });
          break;
        case "wheel":
          n.to(a, { rotateZ: 90, ease: "back.inOut" });
          break;
        case "price":
          n.to(a, { rotateZ: 180, ease: "back.inOut" });
          break;
        case "flower":
          n.to(a, { rotateZ: 45, ease: "back.inOut" });
          break;
        case "menu":
          n.fromTo(
            a,
            { clipPath: fullClipPath },
            { clipPath: leftQuarterClipPath, duration: 0.5, ease: "back.inOut" }
          );
          break;
        case "external":
          n.to(a, { xPercent: 10, ease: "back.inOut" });
      }
      $(t).on("mouseenter", function () {
        n.play();
      }),
        $(t).on("mouseleave", function () {
          n.reverse();
        });
    });
  });
}
export function killIcons() {
  ctx && ctx.revert();
}
