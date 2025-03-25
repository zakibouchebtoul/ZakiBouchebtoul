let ctx, $ = window.$;
import {gsap, SplitType} from "../../vendor.js";
export default function initButtons() {
    ctx = gsap.context(( () => {
        $(".button:not(.is-round)").each(( (t, e) => {
            const o = $(e).find(".button_text.is-out")
              , n = $(e).find(".button_text.is-in")
              , i = ($(e).find(".button_text"),
            new SplitType(o,{
                types: "chars"
            }))
              , s = new SplitType(n,{
                types: "chars"
            })
              , a = gsap.timeline({
                paused: !0,
                defaults: {
                    stagger: .005,
                    ease: "expo.out"
                }
            });
            a.to(i.chars, {
                y: "-120%",
                duration: .5
            }).to(s.chars, {
                y: "-100%",
                duration: .4
            }, "<+0.1"),
            $(e).on("mouseenter", ( () => {
                a.timeScale(1).play()
            }
            )),
            $(e).on("mouseleave", ( () => {
                a.timeScale(1.5).reverse()
            }
            ))
        }
        ));
        $(".button.is-round").each(( (t, e) => {
            const o = $(e).find(".button_text")
              , n = $(e).find(".button-icon")
              , i = new SplitType(o,{
                types: "words"
            })
              , s = gsap.timeline({
                paused: !0
            });
            s.to(i.words, {
                y: "-100%",
                stagger: .025,
                duration: .75,
                ease: "expo.inOut"
            }).to(n, {
                clipPath: "polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)",
                duration: .5,
                ease: "expo.inOut"
            }, ">-0.4"),
            $(e).on("mouseenter", ( () => {
                s.timeScale(1).play()
            }
            )),
            $(e).on("mouseleave", ( () => {
                s.timeScale(1).reverse()
            }
            ))
        }
        ))
    }
    ))
}
export function killButtons() {
    ctx && ctx.revert()
}
