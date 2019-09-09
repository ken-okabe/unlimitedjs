import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
const topNodeTL = T(self => self.now =
    h("button", { class: "mdc-button mdc-button--raised" }, "Press Me"));
const viewNodeTL = topNodeTL.sync(node => patch(document.getElementById("app"), node));
const mdcTL = viewNodeTL.sync(() => {
    Array.from(document
        .querySelectorAll('.mdc-button'))
        .map(button => window.mdc.ripple
        .MDCRipple.attachTo(button));
});
world.now = topNodeTL;
