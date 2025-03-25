let ctx, $ = window.$;
import {gsap, ScrollTrigger, SplitType} from "../../vendor.js";
import {bottomClipPath} from "../../utils/variables.js";
gsap.registerPlugin(ScrollTrigger);
export default function initTextOnScroll() {
    ctx = gsap.context(( () => {
        document.querySelectorAll("[data-animate=text-in]").forEach((t => {
            const e = t.closest('[class^="section"]')
              , r = new SplitType(t,{
                types: "lines,words",
                absolute: !0
            })
              , o = gsap.timeline();
            o.from(r.lines, {
                clipPath: bottomClipPath,
                yPercent: 100,
                duration: 2,
                stagger: .1,
                ease: "expo.out",
                delay: .2
            }),
            ScrollTrigger.create({
                animation: o,
                trigger: e,
                start: "top center"
            })
        }
        ))
    }
    ))
}
export function killTextOnScroll() {
    ctx && ctx.revert()
}
