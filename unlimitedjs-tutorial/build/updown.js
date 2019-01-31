import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const main = () => {
    const countTL = T();
    const upNode = (h("button", { onclick: () => countTL.now = countTL.now + 1 }, "+"));
    const dnNode = (h("button", { onclick: () => countTL.now = countTL.now - 1 }, "-"));
    const topNodeTL = countTL.sync(count => h("div", null,
        h("h1", null, count),
        dnNode,
        upNode));
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
    countTL.now = 0;
};
export { main };
