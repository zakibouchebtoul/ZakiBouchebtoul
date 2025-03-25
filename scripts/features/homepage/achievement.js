let ctx, $ = window.$;
import {gsap, ScrollTrigger, SplitType} from "../../vendor.js";
import {fullClipPath, topClipPath} from "../../utils/variables.js";
export default function initAchievement() {
    ctx = gsap.context(( () => {
        const t = $("[data-animate=achievement-section]")
          , e = t.find("[data-animate=achievement-headline]")
          , a = t.find("[data-animate=achievement-element]")
          , i = new SplitType(e,{
            types: "chars,words"
        })
          , r = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power1.inOut"
            }
        });
        r.fromTo(i.chars, {
            clipPath: topClipPath,
            y: 100
        }, {
            y: 0,
            clipPath: fullClipPath,
            duration: .5,
            stagger: .005
        }, 0),
        a.each(( (t, e) => {
            const a = $(e).find("[data-animate=achievement-value]")
              , i = $(e).find("[data-animate=achievement-type]")
              , n = $(e).find("[data-animate=achievement-unit]")
              , o = new SplitType(a,{
                types: "chars"
            })
              , c = new SplitType(i,{
                types: "chars"
            })
              , s = new SplitType(n,{
                types: "chars"
            });
            r.from(o.chars, {
                y: 125,
                duration: 1,
                stagger: .01
            }, "<+0.5").from(c.chars, {
                y: 125,
                duration: 1,
                stagger: .001
            }, "<").from(s.chars, {
                y: 125,
                duration: 1,
                stagger: .001
            }, "<").to(s.chars, {
                y: -125,
                duration: 1,
                stagger: .001
            }, ">+0.1").to(o.chars, {
                y: -125,
                duration: 1,
                stagger: .01
            }, "<").to(c.chars, {
                y: -125,
                duration: 1,
                stagger: .001
            }, "<")
        }
        )),
        ScrollTrigger.create({
            animation: r,
            trigger: t,
            start: "top center",
            end: "bottom bottom",
            scrub: 1
        })
    }
    ))
}
export function killAchievement() {
    ctx && ctx.revert()
}
