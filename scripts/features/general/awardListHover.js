let ctx, $ = window.$;
import {gsap} from "../../vendor.js";
import helperFunctions from "../../utils/helperFunctions.js";
import {isDesktop} from "../../utils/variables.js";
const mm = gsap.matchMedia();
export default function initAwardListHover() {
    ctx = gsap.context(( () => {
        const e = $("[data-animate=award-list-section]")
          , t = $("[data-animate=award-list-wrap]")
          , a = $("[data-animate=award-list-image-wrap]")
          , n = $("[data-animate=award-list-image-list]");
        e.each(( (e, i) => {
            mm.add(isDesktop, ( () => {
                const e = gsap.timeline({
                    paused: !0
                });
                e.fromTo(a, {
                    rotateZ: -15,
                    scale: 0
                }, {
                    scale: 1,
                    rotateZ: 0,
                    duration: .25,
                    ease: "power2.inOut"
                }),
                $(t).on("mouseenter", (function() {
                    e.play()
                }
                )),
                $(t).on("mouseleave", (function() {
                    e.reverse()
                }
                ))
            }
            ));
            $(i).find("[data-animate=award-list-item]").each(( (e, t) => {
                const a = $(t).find("[data-animate=award-list-filler-path]")
                  , i = $(t).find("[data-animate=award-list-content]")
                  , r = gsap.timeline({
                    paused: !0
                });
                r.to(i, {
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    duration: .25,
                    ease: "power1.inOut"
                }),
                $(t).on("mouseenter", (i => {
                    const o = helperFunctions.getMouseEnterDirection(i, t)
                      , s = helperFunctions.handleCardHoverIn(o, !1);
                    helperFunctions.animateCardHover(a, s.start, s.end),
                    function(e, t) {
                        gsap.to(n, {
                            y: `-${t}00%`,
                            duration: .5,
                            ease: "power2.inOut"
                        })
                    }(0, e),
                    r.play()
                }
                )),
                $(t).on("mouseleave", (e => {
                    const n = helperFunctions.getMouseEnterDirection(e, t)
                      , i = helperFunctions.handleCardHoverOut(n, !1);
                    helperFunctions.animateCardHover(a, i.start, i.end),
                    r.reverse()
                }
                ))
            }
            ))
        }
        ))
    }
    ))
}
export function killAwardListHover() {
    ctx && ctx.revert()
}
