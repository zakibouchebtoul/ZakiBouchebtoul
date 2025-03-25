let ctx,
  $ = window.$;
import { gsap, SplitType } from "../../vendor.js";
export default function initVariableFontWeight() {
  ctx = gsap.context(() => {
    const t = $("[data-animate=font-weight]"),
      e = gsap.timeline();
    return (
      t.each((t, i) => {
        let n;
        if (0 === $(i).find(".char").length) {
          n = new SplitType(i, { types: "chars,words" }).chars;
        } else n = $(i).find(".char");
        $(n).each((t, i) => {
          $(i).data("initialWeight", parseInt($(i).css("font-weight"))),
            $(i).on("mouseenter", () => {
              gsap.timeline().to(i, { fontWeight: 550, duration: 0.5 });
            }),
            $(i).on("mouseleave", () => {
              const t = gsap.timeline();
              t.to(i, {
                fontWeight: $(i).data("initialWeight"),
                duration: 0.5,
              }),
                e.add(t);
            });
        });
      }),
      $(document).mousemove(function (e) {
        const mouseX = e.pageX,
              mouseY = e.pageY;
    
        t.find(".char").each((index, element) => {
            const offset = $(element).offset(),
                  width = $(element).outerWidth(),
                  height = $(element).outerHeight(),
                  centerX = offset.left + width / 2,
                  centerY = offset.top + height / 2;
    
            // Calculate distance between the mouse and the character
            const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
    
            // Scale and shadow intensity based on proximity
            let scale = 1;
            let shadowIntensity = 0;
    
            if (distance < 200) {
                scale = 1 + 0.1 * ((300 - distance) / 300); // Increase scale
                shadowIntensity = 50 * ((300 - distance) / 300); // Increase shadow blur
            }
    
            // Apply GSAP animation
            gsap.to(element, {
                scale: scale,
                fontWeight:shadowIntensity,
                textShadow: `0px 0px ${shadowIntensity}px rgb(255, 255, 255)`,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    })
    
      [e]
    );
  });
}
export function killVariableFontWeight() {
  ctx && ctx.revert();
}
