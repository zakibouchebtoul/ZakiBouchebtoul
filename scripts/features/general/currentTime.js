import { gsap } from "../../vendor.js";
let ctx, timeElement;
export default function initCurrentTime() {
  ctx = gsap.context(() => {
    const t = document.querySelector("[data-time=element]");
    function e(t) {
      (t.innerHTML = (function () {
        const t = new Date(),
          e = t.toLocaleDateString("en-US", {
            timeZone: "Europe/Rome",
            month: "long",
            day: "numeric",
          }),
          n = t.toLocaleTimeString("en-US", {
            timeZone: "Europe/Rome",
            hour: "2-digit",
            minute: "2-digit",
            hour12: !1,
          }),
          [o, r] = e.split(" "),
          [i, c] = n.split(":"),
          a = (function (t) {
            if (t > 3 && t < 21) return "th";
            switch (t % 10) {
              case 1:
                return "st";
              case 2:
                return "nd";
              case 3:
                return "rd";
              default:
                return "th";
            }
          })(parseInt(r, 10));
        return `${o} ${r}${a} ${i}:${c}`.replace(
          ":",
          '<span class="colon">:</span>'
        );
      })()),
        gsap.fromTo(
          ".colon",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, repeat: -1, yoyo: !0 }
        );
    }
    t && (e(t), setInterval(() => e(t), 6e4));
  });
}
export function killCurrentTime() {
  ctx && ctx.revert();
}
