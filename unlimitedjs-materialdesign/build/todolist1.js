import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const main = () => {
    const listTL = T();
    const listNodeTL = T(self => listTL.sync(list => self.now = h("div", null,
        h("h1", { class: "mdc-typography--headline1" }, "Hello, World!"),
        h("button", { type: "button", class: "mdc-button mdc-button--raised mdc-button--primary" }, "Press Me"),
        h("div", { class: "mdc-text-field" },
            h("input", { type: "text", id: "my-text-field", class: "mdc-text-field__input first-name-input" }),
            h("label", { class: "mdc-floating-label", for: "my-text-field" }, "First name"),
            h("div", { class: "mdc-line-ripple" })),
        h("div", { class: "mdc-text-field" },
            h("input", { type: "text", id: "my-text-field", class: "mdc-text-field__input last-name-input" }),
            h("label", { class: "mdc-floating-label", for: "my-text-field" }, "Last name"),
            h("div", { class: "mdc-line-ripple" })),
        h("ul", { class: "mdc-list" }, list.map(item => h("li", { class: "mdc-list-item" },
            h("span", { class: "mdc-list-item__text" }, item)))))));
    const topNodeTL = listNodeTL;
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
    const styleTL = viewNodeTL.sync(() => {
        Array.from(document
            .querySelectorAll('.mdc-text-field'))
            .map(textField => window.mdc.textField.MDCTextField.attachTo(textField));
        Array.from(document
            .querySelectorAll('.mdc-button'))
            .map(button => window.mdc.ripple.MDCRipple.attachTo(button));
    });
    listTL.now = ["foo", "bar"];
};
export { main };
