import { gsap } from "../../vendor.js";
import { isLandscape, isTablet } from "../../utils/variables.js";
let ctx;
const mm = gsap.matchMedia();
export default function initPattern() {
  ctx = gsap.context(() => {
    const t = document
      .querySelector("[data-pattern=wrap]")
      .querySelectorAll("[data-pattern=element-wrap]");
    let e = 200,
      a = 3,
      o = 1,
      r = "mousemove";
    mm.add(isLandscape, () => {
      (e = 100), (a = 2), (o = 1);
    }),
      mm.add(isTablet, () => {
        r = "touchmove";
      }),
      window.addEventListener(r, (r) => {
        const n = r.pageX,
          l = r.pageY;
        t.forEach((t) => {
          t.querySelectorAll("[data-pattern=element]").forEach((t) => {
            const r = t.getBoundingClientRect(),
              c = r.left + r.width / 2 + window.scrollX,
              s = r.top + r.height / 2 + window.scrollY,
              i = Math.sqrt(Math.pow(n - c, 2) + Math.pow(l - s, 2));
            let d = o;
            if (i < e) {
              d = o + (a - o) * (1 - i / e);
            }
            gsap.to(t, { scale: d, duration: 0.5, ease: "power2.out" });
          });
        });
      });
  });
}
export function killPattern() {
  ctx && ctx.revert();
}
