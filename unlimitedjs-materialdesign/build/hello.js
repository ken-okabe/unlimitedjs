import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const main = () => {
    const topNodeTL = T(self => {
        const f = () => (self.now =
            h("div", null,
                h("h2", { class: "mdc-typography--headline2" }, "Flawlessly with Material Design"),
                h("div", { class: "main" },
                    h("div", { class: "mdc-layout-grid login-box mdc-elevation--z6" },
                        h("h1", null, "Login"),
                        h("div", { class: "mdc-text-field username", "data-mdc-auto-init": "MDCTextField" },
                            h("input", { type: "text", class: "mdc-text-field__input", id: "username-input", name: "username", required: true }),
                            h("label", { class: "mdc-floating-label", for: "username-input" }, "Username"),
                            h("div", { class: "mdc-line-ripple" })),
                        h("div", { class: "mdc-text-field password", "data-mdc-auto-init": "MDCTextField" },
                            h("input", { type: "password", class: "mdc-text-field__input", id: "password-input", name: "password", required: true, minlength: "8" }),
                            h("label", { class: "mdc-floating-label", for: "password-input" }, "Password"),
                            h("div", { class: "mdc-line-ripple" })),
                        h("div", { class: "mdc-form-field" },
                            h("div", { class: "mdc-checkbox" },
                                h("input", { type: "checkbox", class: "mdc-checkbox__native-control", id: "checkbox-1", "asp-for": "RememberLogin" }),
                                h("div", { class: "mdc-checkbox__background" },
                                    h("svg", { class: "mdc-checkbox__checkmark", viewBox: "0 0 24 24" },
                                        h("path", { class: "mdc-checkbox__checkmark-path", fill: "none", d: "M1.73,12.91 8.1,19.28 22.79,4.59" })),
                                    h("div", { class: "mdc-checkbox__mixedmark" }))),
                            h("label", { for: "checkbox-1", "asp-for": "RememberLogin" },
                                h("strong", null, "Remember My Login"))),
                        h("div", { class: "button-container" },
                            h("button", { type: "button", class: "mdc-button cancel", "data-mdc-auto-init": "MDCRipple" }, "Cancel"),
                            h("button", { class: "mdc-button mdc-button--raised next", "data-mdc-auto-init": "MDCRipple" }, "Next"))))));
        setTimeout(f, 0);
    });
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
main();
