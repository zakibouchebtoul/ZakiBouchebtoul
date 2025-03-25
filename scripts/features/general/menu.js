let $ = window.$;
import { gsap, SplitType } from "../../vendor.js";
import lenis from "../../utils/smoothScroll.js";
export default function initMenu() {
  const e = $("[data-animate=navigation-section]"),
    t = $(".navigation-flyout"),
    i = e.find(".js-menu-trigger"),
    n = $(".navigation-blur"),
    a = t.find(".navigation-flyout_menu-list-item").children(),
    s = t.find(".contact-list_item-inner"),
    o = new SplitType(a, { types: "chars" }),
    r = gsap.timeline({ paused: !0 });
  r
    .set(t, { display: "flex" })
    .set(n, { display: "block" })
    .from(n, { opacity: 0, duration: 0.5 })
    .from(t, { height: "0svh", duration: 1, ease: "power4.inOut" }, 0)
    .from(
      [o.chars],
      { y: "150%", duration: 1, stagger: 0.03, ease: "power4.out" },
      ">-50%"
    )
    .from(
      s,
      { y: "150%", duration: 1.5, stagger: 0.1, ease: "power4.out" },
      "<+0.25"
    ),
    document.addEventListener("click", function (e) {
      $(e.target).is(n) && $(i).hasClass("is-active") && closeMenu(!1);
    }),
    i.on("click", async function () {
      i.toggleClass("is-active"),
        i.hasClass("is-active")
          ? (r.timeScale(1).play(), lenis.stop())
          : (await r.timeScale(2.5).reverse(), lenis.start());
    }),
    $(document).keyup(function (e) {
      27 == e.keyCode && $(i).hasClass("is-active") && closeMenu(!1),
        e.preventDefault();
    });
}
export function closeMenu(e) {
  const t = $("[data-animate=navigation-section]").find(".js-menu-trigger");
  if (t.hasClass("is-active")) {
    if ((t[0].click(), !0 === e)) return;
    lenis.start();
  }
}
