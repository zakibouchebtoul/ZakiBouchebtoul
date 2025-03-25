let $ = window.$;
import { Lenis } from "../vendor.js";

// Set this flag to false to disable the Lenis scroll animation.
const enableLenis = false;

let lenis;

if (enableLenis) {
  lenis = new Lenis({
    smooth: true,
  });

  function raf(t) {
    lenis.raf(t);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    $(this).hasClass("stop-scroll") ? lenis.stop() : lenis.start();
  });
} else {
  // Optionally, if you need to export a default object even when disabled:
  lenis = {
    start: () => {},
    stop: () => {},
    raf: () => {}
  };
}

export default lenis;

