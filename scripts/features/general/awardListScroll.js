let ctx, $ = window.$;
import {gsap, ScrollTrigger, SplitType} from "../../vendor.js";
import {bottomClipPath, centerHorizontalClipPath, fullClipPath} from "../../utils/variables.js";
import helperFunctions from "../../utils/helperFunctions.js";
gsap.registerPlugin(ScrollTrigger);
export default function initAwardListScroll() {
    ctx = gsap.context(( () => {
        const t = $("[data-animate=award-list-section]")
          , a = t.find("[data-animate=award-list-single]")
          , e = t.find("[data-animate=divider][data-direction=horizontal]")
          , i = t.find("[data-animate=award-count]")
          , r = t.find("[data-animate=award-headline]")
          , o = t.find("[data-animate=award-list-scroll-icon]")
          , n = new SplitType(r,{
            types: "lines"
        })
          , l = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power3.out"
            }
        })
          , c = gsap.timeline();
        l.from(a, {
            yPercent: 100,
            delay: .2,
            stagger: .05
        }),
        e.length > 0 && l.fromTo(e, {
            clipPath: centerHorizontalClipPath
        }, {
            clipPath: fullClipPath,
            duration: 1.5
        }, "<"),
        r.length > 0 && l.fromTo(n.lines, {
            yPercent: 100,
            clipPath: bottomClipPath
        }, {
            yPercent: 0,
            clipPath: fullClipPath,
            stagger: .1
        }, "<").call(( () => helperFunctions.animateCountdown(i, 3, 0)), [], 0),
        o.length > 0 && c.to(o, {
            rotateZ: 720,
            duration: 1
        }),
        ScrollTrigger.create({
            animation: c,
            trigger: t,
            start: "top center",
            end: "bottom top",
            scrub: 1
        }),
        ScrollTrigger.create({
            animation: l,
            trigger: t,
            start: "top bottom",
            end: "top bottom",
            toggleActions: "none play none reset"
        })
    }
    ))
}
export function killAwardListScroll() {
    ctx && ctx.revert()
}
