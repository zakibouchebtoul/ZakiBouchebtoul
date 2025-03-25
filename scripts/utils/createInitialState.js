import { SplitType } from "../vendor.js";
let $ = window.$;
export default function createInitialState() {
  const e = $("[data-hero] [data-hero-element=headline]"),
    t = $("[data-hero] [data-hero-element=paragraph]");
  new SplitType(e, { types: "chars" }), new SplitType(t, { types: "lines" });
}
