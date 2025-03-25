let ctx, $ = window.$;
import {gsap, ScrollTrigger, SplitType} from "../../vendor.js";
export default function initHeadlineScroll() {
    ctx = gsap.context(( () => {
        $("[data-animate~=headline-scroll-section]").each(( (e, t) => {
            let r = 0;
            const o = $(t).find("[data-animate=headline-scroll-item]")
              , a = gsap.timeline({
                defaults: {
                    duration: .75,
                    ease: "power2.out",
                    stagger: .1
                }
            });
            ScrollTrigger.create({
                animation: a,
                trigger: t,
                start: "top bottom",
                end: "top 60%",
                toggleActions: "none play none reset"
            }),
            o.each(( (e, t) => {
                const o = $(t).data("scrollReveal")
                  , l = $(t).data("move")
                  , n = $(t).data("delay");
                n && (r = n);
                const d = i(t, "words");
                function i(e, t) {
                    return new SplitType(e,{
                        types: t
                    })
                }
                o && (o.includes("letter-bottom") && a.from(i(t, "words,chars").chars, {
                    yPercent: 100,
                    duration: .5,
                    delay: r,
                    rotateZ: 2.5,
                    stagger: .02
                }, "<"),
                o.includes("words-top") && a.from(d.words, {
                    yPercent: -100,
                    delay: r,
                    duration: .5
                }, 0),
                o.includes("words-bottom") && a.from(d.words, {
                    yPercent: 100,
                    delay: r,
                    duration: .5
                }, 0),
                o.includes("line-top") && a.from(t, {
                    yPercent: -100,
                    delay: r
                }, 0),
                o.includes("line-bottom") && a.from(t, {
                    yPercent: 100,
                    delay: r
                }, 0),
                o.includes("opacity") && a.from(t, {
                    opacity: 0,
                    delay: r,
                    duration: .5,
                    ease: "power2.out"
                }, 0)),
                l && ("line-right" === l && a.from(t, {
                    x: "-10rem",
                    delay: r,
                    stagger: -.1
                }, ">"),
                "line-left" === l && a.from(t, {
                    x: "10rem",
                    delay: r,
                    stagger: .1
                }, ">"),
                "words-right" === l && a.from(d.words, {
                    x: "-10rem",
                    duration: 1,
                    delay: r,
                    stagger: -.05
                }, ">-0.2"),
                "words-left" === l && a.from(d.words, {
                    x: "10rem",
                    duration: 1,
                    delay: r,
                    stagger: .05
                }, ">-0.2"))
            }
            ))
        }
        ))
    }
    ))
}
export function killHeadlineScroll() {
    ctx && ctx.revert()
}
