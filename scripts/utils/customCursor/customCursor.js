let $ = window.$;
import { gsap } from "../../vendor.js";
import Cursor from "./cursor.js";
import Magnetic from "./magnetic.js";
import { isDesktop } from "../variables.js";
const mm = gsap.matchMedia();
export let cursor;
mm.add(isDesktop, () => {
  cursor = new Cursor({
    container: "body",
    speed: 0.7,
    ease: "expo.out",
    visibleTimeout: 300,
  });
});
export const magneticCursor = () => {

};
