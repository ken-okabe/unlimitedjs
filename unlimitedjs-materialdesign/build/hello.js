import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const main = () => {
    const messageTL = T(self => setTimeout(() => (self.now = ""), 0));
    const outputNodeTL = (messageTL => T(self => messageTL.sync(message => self.now = h("h2", { "mdc-typography--headline2": true }, message))))(messageTL);
    const inputNode = (messageTL => {
        const firstTL = T();
        const lastTL = T();
        const btnTL = T(self => self.sync(() => messageTL.now =
            firstTL.now === undefined
                || lastTL.now === undefined
                ? undefined
                : "Welcome " +
                    firstTL.now + " " + lastTL.now));
        //===
        return h("div", null,
            h("h2", { class: "mdc-typography--headline2" }, "Hello, unlimitedjs!"),
            h("div", { class: "mdc-text-field" },
                h("input", { type: "text", id: "first-name", class: "mdc-text-field__input", onchange: e => firstTL.now = e.currentTarget.value }),
                h("label", { class: "mdc-floating-label", for: "first-name" }, "First name"),
                h("div", { class: "mdc-line-ripple" })),
            h("br", null),
            h("div", { class: "mdc-text-field" },
                h("input", { type: "text", id: "last-name", class: "mdc-text-field__input", onchange: e => lastTL.now = e.currentTarget.value }),
                h("label", { class: "mdc-floating-label", for: "last-name" }, "Last name"),
                h("div", { class: "mdc-line-ripple" })),
            h("br", null),
            h("button", { type: "button", class: "mdc-button \n    mdc-button--raised mdc-button--primary", onclick: () => btnTL.now = true }, "Press Me"));
        //===
    })(messageTL);
    const topNodeTL = outputNodeTL.sync(outputNode => h("div", null,
        inputNode,
        outputNode));
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
    const mdcTL = viewNodeTL.sync(() => {
        Array.from(document
            .querySelectorAll('.mdc-text-field'))
            .map(textField => window.mdc.textField
            .MDCTextField.attachTo(textField));
        Array.from(document
            .querySelectorAll('.mdc-button'))
            .map(button => window.mdc.ripple
            .MDCRipple.attachTo(button));
    });
};
export { main };
