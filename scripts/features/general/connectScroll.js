let ctx, $ = window.$;
import {gsap, ScrollTrigger} from "../../vendor.js";
export default function initConnectScroll() {
    ctx = gsap.context(( () => {
        $("[data-animate=connect-scroll-section]").each(( (t, n) => {
            const e = $(n).find("[data-animate=icon-connect-path][data-direction=left]")
              , a = $(n).find("[data-animate=icon-connect-path][data-direction=right]")
              , o = $(n).find("[data-animate=connect-scroll-headline][data-direction=left]")
              , i = $(n).find("[data-animate=connect-scroll-headline][data-direction=right]")
              , r = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: "power3.inOut"
                }
            });
            r.from(o, {
                x: "-20vw"
            }).from(i, {
                x: "20vw"
            }, "<"),
            e.length > 0 && a.length > 0 && r.from(e, {
                x: "-5rem",
                duration: .75
            }, "<").from(a, {
                x: "5rem",
                duration: .75
            }, "<"),
            ScrollTrigger.create({
                animation: r,
                trigger: n,
                start: "top 80%",
                end: "bottom 75%",
                scrub: 1
            })
        }
        ))
    }
    ))
}
export function killConnectScroll() {
    ctx && ctx.revert()
}
