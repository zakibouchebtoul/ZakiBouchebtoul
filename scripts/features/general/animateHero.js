let $ = window.$;
import { gsap, ScrollTrigger, SplitType } from "../../vendor.js";
import {
  bottomClipPath,
  centerVerticalClipPath,
  fullClipPath,
  topClipPath,
} from "../../utils/variables.js";
gsap.registerPlugin(ScrollTrigger);
export default function animateHero() {
  const e = $("[data-hero]"),
    t = e.data("hero"),
    a = e.find("[data-hero-element=headline]"),
    i = e.find("[data-hero-element=paragraph]"),
    r = e.find("[data-hero-element=teaser-wrap]"),
    n = e.find("[data-hero-element=teaser-img]"),
    l = gsap.timeline({
      paused: !0,
      defaults: { immediateRender: !0, duration: 1, ease: "expo.out" },
    });
  switch ((l.set(a, { visibility: "visible" }, 0), t)) {
    case "text":
      const e = new SplitType(a, { types: "chars" });

   if (window.innerHeight >= 900) {
          // For larger screens
          l.to([t.chars, a], {
            y: 0,               // Center position
            yPercent: 0,            // Ensure no vertical adjustment
            duration: 1,
            delay: 0.2,
            stagger: 0.03,
            overwrite: true,        // Overwrite any previous animations on these elements
          }, 0);
        } else {
          // For smaller screens
          l.to([t.chars, a], {
            y: 18,                  // Stop at 20px or 20 units
            yPercent: 0,            // Reset any percentage-based adjustments
            duration: 1,
            delay: 0.2,
            stagger: 0.05,
          }, 0);
        }
        
      break;
    case "home":
      const t = new SplitType(a, { types: "chars" }),
        o = new SplitType(i, { types: "lines" }),
        s = $("[data-hero-element=pattern]"),
        p = $("[data-hero-element=trust]"),
        d = s.find("[data-pattern=line]");
 
        if (window.innerHeight >= 900) {
          // For larger screens
          l.to([t.chars, a], {
            y: 0,               // Center position
            yPercent: 0,            // Ensure no vertical adjustment
            duration: 1,
            delay: 0.2,
            stagger: 0.03,
            overwrite: true,        // Overwrite any previous animations on these elements
          }, 0);
        } else {
          // For smaller screens
          l.to([t.chars, a], {
            y: 18,                  // Stop at 20px or 20 units
            yPercent: 0,            // Reset any percentage-based adjustments
            duration: 1,
            delay: 0.2,
            stagger: 0.05,
          }, 0);
        }
        
               r.length > 0 &&
          l
            .fromTo(
              r,
              { clipPath: centerVerticalClipPath },
              { clipPath: fullClipPath, duration: 1.5, stagger: 0.1 },
              "<+50%"
            )
            .to(
              n,
              { scale: 1.05, stagger: 0.1, duration: 2, ease: "power2.out" },
              "<+10%"
            ),
        l
          .fromTo(
            o.lines,
            { clipPath: topClipPath, yPercent: 100 },
            {
              clipPath: fullClipPath,
              yPercent: 0,
              duration: 1.5,
              stagger: 0.1,
            },
            "<+25%"
          )
          .to(p, { y: 0, duration: 1, stagger: 0.1 }, ">-50%"),
        d.each((e, t) => {
          const a = $(t).find("[data-pattern=element-wrap]");
          l.to(
            a,
            { scale: 1, duration: 2, stagger: 0.025, ease: "power2.out" },
            "<"
          );
        }),
        n.each((e, t) => {
          const a = gsap.timeline({
            paused: !0,
            defaults: { duration: 0.75, ease: "power3.inOut" },
          });
          a.to(t, { scale: 1.1 }),
            $(t).on("mouseenter", function () {
              a.play();
            }),
            $(t).on("mouseleave", function () {
              a.reverse();
            });
        });
      break;
    case "detail":
      const h = new SplitType(a, { types: "chars" }),
        c = $("[data-flip-element=end]:not(.is-hidden)");
      l.to([h.chars, a], { y: 0, duration: 1.5, delay: 0.2, stagger: 0.03 }, 0),
        c.length > 0 &&
          l.fromTo(
            $("[data-flip-element=end]:not(.is-hidden)"),
            { clipPath: bottomClipPath },
            { clipPath: fullClipPath, duration: 1.5 },
            "<"
          );
  }
  return l;
}
