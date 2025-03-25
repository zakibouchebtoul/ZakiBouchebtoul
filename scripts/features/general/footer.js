let ctx, $ = window.$;
import {gsap, ScrollTrigger, SplitType} from "../../vendor.js";
export default function initFooter() {
    ctx = gsap.context(( () => {
        const t = $("[data-animate=footer-section]")
          , e = t[t.length - 1]
          , o = t.find("[data-animate=footer-group]")
          , a = $("[data-animate=end-of-page]")
          , n = a[a.length - 1]
          , r = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "expo.out"
            }
        })
          , i = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power3.inOut"
            },
            immediateRender: !1
        });
        gsap.set(n, {
            yPercent: 0
        }),
        a.length > 0 && i.to(n, {
            yPercent: 7.5
        }),
        ScrollTrigger.create({
            animation: i,
            trigger: e,
            start: "top bottom",
            end: "top top",
            scrub: .5
        }),
        ScrollTrigger.create({
            animation: r,
            trigger: e,
            start: "top 25%",
            end: "bottom bottom",
            toggleActions: "play none none none"
        }),
        o.each(( (t, e) => {
            const o = $(e).find("[data-animate=footer-headline]")
              , a = $(e).find("[data-animate=footer-item]")
              , n = new SplitType(o,{
                types: "chars"
            });
            r.from(n.chars, {
                yPercent: 100,
                rotateZ: 2.5,
                stagger: .01
            }, "<+0.1").from(a, {
                yPercent: 100,
                stagger: .075
            }, "<")
        }
        ))
    }
    ))
}
export function killFooter() {
    ctx && (ctx.revert(),
    endOfPage = null,
    footerTl = null)
}
