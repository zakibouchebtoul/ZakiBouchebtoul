let ctx, $ = window.$;
import {gsap, ScrollTrigger} from "../../vendor.js";
gsap.registerPlugin(ScrollTrigger);
export default function initProjectTeaser() {
    ctx = gsap.context(( () => {
        $("[data-animate=project-teaser]").each(( (e, t) => {
            const r = $(t).find("[data-animate=project-teaser-reveal-item]")
              , a = gsap.timeline({
                paused: !0
            });
            a.from(r, {
                yPercent: 100,
                stagger: .05,
                duration: 1,
                ease: "expo.out"
            }),
            $(t).on("mouseenter", ( () => {
                a.timeScale(1).play()
            }
            )),
            $(t).on("mouseleave", ( () => {
                a.timeScale(2).reverse()
            }
            ))
        }
        ))
    }
    ))
}
export function killProjectTeaser() {
    ctx && ctx.revert()
}
