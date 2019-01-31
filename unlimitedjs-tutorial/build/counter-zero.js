import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
//============
const main = () => {
    const countTL = T(); //timeline of the number of count
    const topNodeTL = countTL.sync(//synchronized with countTL
    //synchronized with countTL
    count => (h("div", null,
        h("p", null,
            "You clicked ",
            countTL.now,
            " times"),
        h("button", { onclick: () => countTL.now = countTL.now + 1 }, "Click me"))));
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
    countTL.now = 0;
};
export { main };
