let ctx, $ = window.$;
import {gsap, ScrollTrigger, SplitType} from "../../vendor.js";
import {bottomClipPath, centerHalfClipPath, fullClipPath, isDesktop} from "../../utils/variables.js";
const mm = gsap.matchMedia();
export default function initReducedTeaser() {
    ctx = gsap.context(( () => {
        $("[data-animate=reduced-teaser-list]").find("[data-animate=reduced-teaser]").each(( (e, t) => {
            const a = $(t).find("[data-animate=reduced-teaser-img-wrap]")
              , i = ($(t).find("[data-animate=reduced-teaser-img]"),
            $(t).find("[data-animate=reduced-teaser-video-wrap]"))
              , r = $(t).find("[data-animate=reduced-teaser-video]")
              , o = $(t).find("[data-animate=reduced-teaser-headline]")
              , n = new SplitType(o,{
                types: "chars"
            })
              , d = gsap.timeline({
                paused: !0,
                defaults: {
                    duration: 1,
                    ease: "power4.inOut"
                }
            })
              , s = gsap.timeline();
            mm.add(isDesktop, ( () => {
                d.to(a, {
                    scale: 1.1,
                    filter: "blur(5px)"
                }).from(n.chars, {
                    yPercent: 100,
                    duration: .5,
                    stagger: .0075
                }, "<"),
                i.length > 0 && d.fromTo(i, {
                    clipPath: bottomClipPath
                }, {
                    clipPath: fullClipPath,
                    duration: 1.5,
                    ease: "expo.inOut"
                }, "<"),
                $(t).on("mouseenter", (async () => {
                    await d.timeScale(1).play(),
                    r[0].play()
                }
                )),
                $(t).on("mouseleave", (async () => {
                    await d.timeScale(1.5).reverse(),
                    r[0].pause()
                }
                ))
            }
            )),
            s.fromTo(a, {
                yPercent: -5
            }, {
                yPercent: 5
            }),
            gsap.set(t, {
                clipPath: centerHalfClipPath
            }),
            ScrollTrigger.create({
                animation: s,
                trigger: t,
                onEnter: () => {
                    gsap.to(t, {
                        clipPath: fullClipPath,
                        duration: 1,
                        ease: "expo.out"
                    })
                }
                ,
                start: "top bottom",
                end: "bottom top",
                scrub: .5
            })
        }
        ))
    }
    ))
}
export function killReducedTeaser() {
    ctx && ctx.revert()
}
