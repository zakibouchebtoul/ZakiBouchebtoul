let ctx, $ = window.$;
import {gsap, ScrollTrigger, SplitType} from "../../vendor.js";
import {bottomClipPath, fullClipPath, isDesktop, isLandscape, topClipPath} from "../../utils/variables.js";
const mm = gsap.matchMedia();
export default function initAboutTeaser() {
    ctx = gsap.context(( () => {
        const t = $("[data-animate-about=teaser-section]")
          , a = t.find(".button")
          , e = t.find("[data-animate=about-teaser-img-wrap]")
          , i = t.find("[data-img=about-teaser]")
          , o = t.find("[data-animate=about-teaser-text]")
          , p = new SplitType(o,{
            types: "lines",
            absolute: !0
        })
          , l = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power3.out"
            }
        });
        l.fromTo(a, {
            clipPath: topClipPath
        }, {
            clipPath: fullClipPath
        }).fromTo(p.lines, {
            yPercent: 100,
            clipPath: bottomClipPath
        }, {
            yPercent: 0,
            clipPath: fullClipPath,
            stagger: .05
        }, "<"),
        mm.add(isDesktop, ( () => {
            l.fromTo(e, {
                clipPath: topClipPath
            }, {
                clipPath: fullClipPath,
                duration: 1.5,
                ease: "power4.inOut"
            }, "<-0.2")
        }
        )),
        mm.add(isLandscape, ( () => {
            l.fromTo(i, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                ease: "power4.inOut"
            }, "<-0.2")
        }
        )),
        ScrollTrigger.create({
            animation: l,
            trigger: t,
            start: "top bottom",
            end: "top center",
            toggleActions: "none play none reset"
        })
    }
    ))
}
export function killAboutTeaser() {
    ctx && ctx.revert()
}
