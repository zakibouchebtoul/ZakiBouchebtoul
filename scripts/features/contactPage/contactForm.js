let ctx,
  validation,
  $ = window.$;
import helperFunctions from "../../utils/helperFunctions.js";
import { gsap, SplitType, axios, JustValidate, gtag } from "../../vendor.js";
import {
  fullClipPath,
  rightClipPath,
  topClipPath,
} from "../../utils/variables.js";
export default function initContactForm() {
  (ctx = gsap.context(() => {
    const e = $("#contact-form"),
      t = e.find("[data-focus=input]"),
      a = [e.find("[data-form=select-wrap]"), e.find("[data-form=radio-wrap]")],
      i = e.find("[data-animate=form-alternate-item]"),
      o = $("[data-form=submit-wrap]"),
      n = gsap.timeline({
        paused: !0,
        defaults: { duration: 0.5, ease: "back.inOut" },
      });
    n.to(o, { scale: 0.925 }),
      e.hide(),
      o.on("mouseenter", (e) => {
        o.hasClass("is-active") && n.play();
      }),
      o.on("mouseleave", (e) => {
        o.hasClass("is-active") && n.reverse();
      }),
      t.each((e, t) => {
        const a = $(t).siblings("[data-focus=text]"),
          i = gsap.timeline({
            paused: !0,
            defaults: { duration: 0.5, ease: "power3.inOut" },
          });
        i.to(a, { top: "-1.25rem" }),
          $(t).on("focusin", function () {
            i.play();
          }),
          $(t).on("focusout", function () {
            $(t).val() || i.reverse();
          });
      }),
      $(a).each((e, t) => {
        t.each((e, t) => {
          const a = $(t).find("[data-form=bg-fill-path]");
          $(t).on("mouseenter", (e) => {
            const i = helperFunctions.getMouseEnterDirection(e, t),
              o = helperFunctions.handleCardHoverIn(i, !0);
            helperFunctions.animateCardHover(a, o.start, o.end);
          }),
            $(t).on("mouseleave", (e) => {
              const i = helperFunctions.getMouseEnterDirection(e, t),
                o = helperFunctions.handleCardHoverOut(i, !0);
              helperFunctions.animateCardHover(a, o.start, o.end);
            });
        });
      }),
      $(i).each((e, t) => {
        const a = $(t).find("[data-animate=card-fill-path]"),
          i = $(t).find("[data-animate=form-alternate-item-inner]"),
          o = $(t).find("[data-animate=arrow]"),
          n = gsap.timeline({
            paused: !0,
            defaults: { duration: 0.5, ease: "power3.inOut" },
          });
        n.to(i, { padding: "0 0.5rem" }),
          o.length > 0 && n.to(o, { rotate: -45 }, "<"),
          $(t).on("mouseenter", (e) => {
            const i = helperFunctions.getMouseEnterDirection(e, t),
              o = helperFunctions.handleCardHoverIn(i, !0);
            helperFunctions.animateCardHover(a, o.start, o.end), n.play();
          }),
          $(t).on("mouseleave", (e) => {
            const i = helperFunctions.getMouseEnterDirection(e, t),
              o = helperFunctions.handleCardHoverOut(i, !0);
            helperFunctions.animateCardHover(a, o.start, o.end), n.reverse();
          });
      });
  })),
    initValidation();
}
function initValidation() {
  const e = new JustValidate("#contact-form"),
    t = $("[data-form=input]"),
    a = $("[data-form=required-select-group]"),
    i = $("[data-form=required-radio-group]"),
    o = $("[data-form=missing-fields]"),
    n = $("[data-form=submit-wrap]"),
    r = $("[data-form=submit-button]"),
    s = $("[data-animate=submit-loading-wrap]");
  s.hide(),
    t.each((t, a) => {
      "email" === $(a).attr("type")
        ? e.addField(a, [
            { rule: "required", errorMessage: "This field is required" },
            { rule: "email", errorMessage: "Invalid email" },
          ])
        : e.addField(a, [
            { rule: "required", errorMessage: "This field is required" },
            {
              rule: "minLength",
              value: 3,
              errorMessage: "This field must have at least 3 characters",
            },
          ]);
    }),
    e.addField("[data-form=textarea-input]", [
      { rule: "required", errorMessage: "This field is required" },
      {
        rule: "minLength",
        value: 25,
        errorMessage: "This field must have at least 25 characters",
      },
    ]),
    a.each((t, a) => {
      e.addRequiredGroup(a, "Select at least one or more options!");
    }),
    i.each((t, a) => {
      e.addRequiredGroup(a, "Select one option!");
    }),
    e.onValidate(async function (e) {
      const t = Object.keys(e.fields).length + Object.keys(e.groups).length;
      let a = 0;
      $.each(e.fields, function (e, t) {
        t.isValid && a++;
      }),
        $.each(e.groups, function (e, t) {
          t.isValid && a++;
        }),
        o.text(`${a}/${t}`),
        a === t
          ? (n.addClass("is-active"), r.prop("disabled", !1))
          : (n.removeClass("is-active"), r.prop("disabled", !0));
    }),
    e.onSuccess(async function (t) {
      t.preventDefault(), s.show();
      const a = new FormData(t.target),
        i = a.get("name"),
        o = a.get("company-name"),
        n = a.get("email"),
        r = a.get("textarea"),
        d = a.getAll("contact-origin"),
        l = a.getAll("services"),
        c = a.get("start"),
        u = a.get("deadline"),
        m = {
          name: i,
          companyName: o,
          email: n,
          text: r,
          contactOrigin: d,
          services: l,
          start: c,
          deadline: u,
        };
      try {
        if (
          (await axios.post(
            "https://us-central1-helical-root-426623-m4.cloudfunctions.net/receiveEmail",
            m
          ),
          animateSubmitFeedback(!0),
          s.hide(),
          e.lockForm(!0),
          !helperFunctions.isGoogleAnalyticsCookieSet())
        )
          return;
        gtag("event", "form_submission", {
          form_category: "Contact Form",
          form_label: "Contact Form Submission",
          form_contactOrigin: d,
          form_services: l,
          form_startDate: c,
          form_deadline: u,
          value: 1,
        });
      } catch (e) {
        console.error("Submission failed:", e),
          animateSubmitFeedback(!1),
          s.hide();
      }
    }),
    e.onFail(async function (e) {
      s.hide();
    });
}
export function animateContactForm() {
  const e = gsap.timeline({ defaults: { duration: 2, ease: "expo.out" } }),
    t = $("#contact-form"),
    a = t.find("[data-form=headline]");
  new SplitType(a, { types: "chars, words" });
  const i = t.find("[data-focus=input]"),
    o = t.find("[data-form=input-text]"),
    n = t.find("[data-form=select-wrap]"),
    r = t.find("[data-form=radio-wrap]"),
    s = t.find("[data-form=submit-outer]"),
    d = t.find("[data-animate=divider][data-direction=horizontal]"),
    l = t.find("[data-animate=divider][data-direction=vertical]"),
    c = t.find("[data-animate=alternate-item-content]");
  a.each((t, a) => {
    e.fromTo(
      $(a).find(".char"),
      { yPercent: 100 },
      { yPercent: 0, duration: 1.5, stagger: 0.015 },
      "<+0.05"
    );
  }),
    t.show(),
    e
      .fromTo(
        o,
        { clipPath: topClipPath, yPercent: 50 },
        { yPercent: 0, clipPath: fullClipPath, stagger: 0.1 },
        "<"
      )
      .fromTo(
        i,
        { clipPath: rightClipPath },
        { clipPath: fullClipPath, stagger: 0.1 },
        "<"
      )
      .fromTo(
        [n, r, s],
        { clipPath: topClipPath, yPercent: 50 },
        {
          yPercent: 0,
          clipPath: fullClipPath,
          duration: 1,
          ease: "power2.out",
          stagger: 0.05,
        },
        "<"
      )
      .fromTo(d, { width: 0 }, { width: "100%" }, "<")
      .fromTo(l, { height: 0 }, { height: "100%" }, "<")
      .from(c, { yPercent: 100, stagger: 0.1 }, "<");
}
function animateSubmitFeedback(e) {
  const t = $("[data-animate=form-feedback-wrap]"),
    a = t.find("[data-animate=form-feedback-inner]"),
    i = $("[data-animate=form-feedback-blur]"),
    o = t.find("[data-animate=feedback-logo]"),
    n = o.find("[data-animate=feedback-logo-path-left]"),
    r = o.find("[data-animate=feedback-logo-path-right]"),
    s = t.find("[data-animate=form-success-message]"),
    d = t.find("[data-animate=form-error-message]"),
    l = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
  return (
    !0 === e ? l.set(d, { display: "none" }) : l.set(s, { display: "none" }),
    l.set([s, d], { yPercent: 100 }),
    l
      .set(t, { display: "flex" })
      .set(i, { display: "block" })
      .from(t, { opacity: 0, duration: 1 })
      .from(i, { opacity: 0, duration: 1 }, "<"),
    !0 === e
      ? l.to(n, { x: 0 }, "<25%").to(r, { x: 0 }, "<")
      : l.to(n, { x: "-1rem" }, "<+25%").to(r, { x: "1rem" }, "<"),
    l.to([s, d], { yPercent: 0, stagger: 0.2 }, "<"),
    !0 === e &&
      l
        .to(a, { scale: 0.95, duration: 0.5 }, "+=2")
        .to(t, { opacity: 0, duration: 0.5 }, "<")
        .to(i, { opacity: 0, duration: 0.5 }, "<")
        .set(i, { display: "none" }, ">")
        .to(t, { display: "none" }, "<"),
    l
  );
}
export function killContactForm() {
  ctx && ctx.revert(), validation && validation.destroy();
}
