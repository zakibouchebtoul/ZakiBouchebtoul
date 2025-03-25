let $ = window.$;
import { gsap, SplitType } from "../../vendor.js";
export default function animateTextSlide(t, e) {
  $(t).each((t, a) => {
    const i = $(a).data("slideType"),
      n = $(a).find("[data-animate=text-slide-out]"),
      s = $(a).find("[data-animate=text-slide-in]"),
      r = n.width(),
      d = s.width(),
      o = Math.max(r, d),
      c = new SplitType(n, { types: "chars" }),
      p = new SplitType(s, { types: "chars" }),
      h = gsap.timeline({
        defaults: { stagger: 0.005, duration: e, ease: "expo.inOut" },
      });
    switch ((h.set(a, { width: o, duration: 0 }), i)) {
      case "bottom":
        h.to(c.chars, { yPercent: -100 }).to(p.chars, { yPercent: -100 }, "<");
        break;
      case "top":
        h.to(c.chars, { yPercent: 100 }), h.to(p.chars, { yPercent: 100 }, "<");
    }
    return h;
  });
}
