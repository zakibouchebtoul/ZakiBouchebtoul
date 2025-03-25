import initMenu, { closeMenu } from "./features/general/menu.js";
import animatePageTransitions from "./utils/animatePageTransitions.js";
import createInitialState from "./utils/createInitialState.js";
import { magneticCursor, cursor } from "./utils/customCursor/customCursor.js";
import helperFunctions from "./utils/helperFunctions.js";
import setupBarba from "./utils/setupBarba.js";

import { isDesktop, isTablet } from "./utils/variables.js";
import { gsap } from "./vendor.js";



// Helper to prevent default behavior
function preventDefault(e) {
  e.preventDefault();
}

// Disable scrolling by adding event listeners
function disableWheelScroll() {
  window.addEventListener("wheel", preventDefault, { passive: false });
  window.addEventListener("touchmove", preventDefault, { passive: false });
}

// Re-enable scrolling by removing the event listeners
function enableWheelScroll() {
  window.removeEventListener("wheel", preventDefault, { passive: false });
  window.removeEventListener("touchmove", preventDefault, { passive: false });
}

initMenu();
const barba = setupBarba(),
  matchMedia = gsap.matchMedia();
gsap.config({ force3D: !0 }), createInitialState();
let currentAnimationModule = null;
const transitionSection = $("[data-animate=transition]"),
  transitionLogo = transitionSection.find("[data-animate=transition-logo]");
function cleanupCurrentModule() {
  currentAnimationModule &&
    (matchMedia.add(isDesktop, () => {
      "function" == typeof currentAnimationModule.cleanup &&
        currentAnimationModule.cleanup();
    }),
    matchMedia.add(isTablet, () => {
      "function" == typeof currentAnimationModule.mobileCleanup &&
        currentAnimationModule.mobileCleanup();
    })),
    ScrollTrigger.getAll().forEach((e) => e.kill()),
    (currentAnimationModule = null);
}
function getBaseUrl() {
  const e = document.querySelector('script[src*="main.js"]'),
    t = e?.src || "";
  return t.substring(0, t.lastIndexOf("/") + 1);
}
function loadPageModule(e) {
  const t = getBaseUrl();
  const baseUrl = window.location.origin;
import(`${baseUrl}/ZakiBouchebtoul/scripts/pages/homepage.js`)

    .then((t) => {
      (currentAnimationModule = t.default || {}),
        "function" == typeof currentAnimationModule.init &&
        "function" == typeof currentAnimationModule.mobileInit
          ? (matchMedia.add(isDesktop, () => {
              currentAnimationModule.init();
            }),
            matchMedia.add(isTablet, () => {
              currentAnimationModule.mobileInit();
            }))
          : console.warn(
              `Module for page ${e} does not have an init or mobileInit function.`
            );
    })
    .catch((t) => {
      console.error(`Failed to load module for page: ${e}`, t),
        (currentAnimationModule = {});
    });
}
const initialPageName = document.querySelector('[data-barba="container"]')
  .dataset.barbaNamespace;
loadPageModule(initialPageName),
  barba.hooks.once(() => {
  
      matchMedia.add(isDesktop, () => {
        cursor.init(), magneticCursor();
      });
  }),

  barba.hooks.afterLeave((e) => {
    loadPageModule(e.next.namespace);
  });
