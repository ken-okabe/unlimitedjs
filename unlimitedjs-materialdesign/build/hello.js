import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const topNodeTL = T(self => {
  const f = () => (self.now =
    h("button", { class: "mdc-button mdc-button--raised" }, "Press Me"));
  setTimeout(f, 0);
});
const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
const mdcTL = viewNodeTL.sync(() => {
  Array.from(document
    .querySelectorAll('.mdc-button'))
    .map(button => window.mdc.ripple
      .MDCRipple.attachTo(button));
});
