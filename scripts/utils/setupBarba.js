let $ = window.$;
import { gsap, barba } from "../vendor.js";
import { isDesktop } from "./variables.js";
import transitions from "./animatePageTransitions.js";
import animateTransitions from "./animatePageTransitions.js";
import animateHero from "../features/general/animateHero.js";
import helperFunctions from "./helperFunctions.js";
import { proxy } from "./pageReadyHandler.js";
import { animateContactForm } from "../features/contactPage/contactForm.js";
import animatePageTransitions from "./animatePageTransitions.js";
import { cursor, magneticCursor } from "./customCursor/customCursor.js";
const matchMedia = gsap.matchMedia();
function setupBarba() {
  let e;
  return (
    barba.hooks.after((a) => {
      (e = $("[data-barba-namespace]").data("barbaNamespace")),
        matchMedia.add(isDesktop, () => {
          $(".cb-cursor").remove(), cursor.init(), magneticCursor();
        }),
        helperFunctions.handleResponsiveElementRemoval();
    }),
    barba.hooks.once(() => {
      if ("404-page" === e) return;
      let a;
      animatePageTransitions.loader(3),
        helperFunctions.handleResponsiveElementRemoval(),
        window.addEventListener("resize", function () {
          clearTimeout(a),
            (a = setTimeout(function () {
              helperFunctions.handleResponsiveElementRemoval();
            }, 250));
        }),
        (e = $("[data-barba-namespace]").data("barbaNamespace")),
        document.addEventListener("onPageReady", (a) => {
          if (!0 === a.detail) {
            if ((animateHero().play(), "detail-page" === e)) {
              const e = $("[data-animate=nav-bar]"),
                a = $("[data-animate=detail-nav-wrap]");
              helperFunctions.slideInNavigations(e, a, 1).play();
            }
            "contact-page" === e && animateContactForm();
          } else a.detail;
        });
    }),
    barba.init({
      preventRunning: !0,
      views: [
        {
          namespace: "home-page",
          beforeEnter() {
            helperFunctions.fadeInPage(0.5);
          },
          beforeLeave() {
            helperFunctions.fadeOutPage(0.5);
          },
        },
        {
          namespace: "about-page",
          beforeEnter() {
            helperFunctions.fadeInPage(0.5);
          },
          beforeLeave() {
            helperFunctions.fadeOutPage(0.5);
          },
        },
        {
          namespace: "list-page",
          beforeEnter() {
            helperFunctions.fadeInPage(0.5);
          },
          beforeLeave() {
            helperFunctions.fadeOutPage(0.5);
          },
        },
        {
          namespace: "award-page",
          beforeEnter() {
            helperFunctions.fadeInPage(0.5);
          },
          beforeLeave() {
            helperFunctions.fadeOutPage(0.5);
          },
        },
        {
          namespace: "contact-page",
          beforeEnter() {
            helperFunctions.fadeInPage(0.5);
          },
          beforeLeave() {
            helperFunctions.fadeOutPage(0.5);
          },
        },
        {
          namespace: "legal-page",
         
        },
        { namespace: "404-page", beforeEnter() {}, beforeLeave() {} },
        {
          namespace: "detail-page",
          afterEnter() {
            requestAnimationFrame(() => {}),
              setTimeout(() => {
                helperFunctions.refreshScrollTriggers();
              }, 1e3);
          },
          beforeLeave() {},
        },
      ],
      transitions: [
        {
          to: {
            namespace: [
              "about-page",
              "home-page",
              "list-page",
              "award-page",
              "contact-page",
              "legal-page",
            ],
          },
          async leave(e) {
            await transitions.transitionIn(),
             
              $(e.current.container).hide();
          },
          async enter() {
            await transitions.transitionOut(!1);
          },
        },
        { once: () => {} },
        {
          name: "list-detail-transition",
          to: { namespace: ["detail-page"] },
          from: { namespace: ["list-page", "home-page"] },
          async enter(e) {
            helperFunctions.createHeroSplitTypes(
              $("[data-hero-element=headline]")
            ),
              animateTransitions.makeItemActive(e);
            return gsap
              .timeline()
              .to(e.current.container, { opacity: 0, duration: 0.5 })
              .call(
                async () => {
                  $(e.next.container).addClass("fixed"),
                    await animateTransitions.flipAnimation(
                      $(".active-flip-item"),
                      $("[data-flip-element=hero]"),
                      $("[data-flip-element=first-target]")
                    );
                },
                [],
                "<"
              );
          },
          after(e) {
            $(e.next.container).removeClass("fixed"),
              $(".active-flip-item").removeClass("active-flip-item");
          },
        },
        {
          name: "detail-detail-transition",
          to: { namespace: ["detail-page"] },
          from: { namespace: ["detail-page"] },
          leave() {
            proxy.pageReady = !1;
          },
          after() {
            setTimeout(() => {
              proxy.pageReady = !0;
            }, 50);
          },
        },
      ],
    }),
    barba
  );
}
export default setupBarba;
