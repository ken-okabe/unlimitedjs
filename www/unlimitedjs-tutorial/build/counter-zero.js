import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
//============
const main = () => {
    const countTL = T(self => self.now = 0);
    //timeline of the number of count
    const topNodeTL = countTL.sync(//synchronized with countTL
    //synchronized with countTL
    count => (h("div", null,
        h("p", null,
            "You clicked ",
            count,
            " times"),
        h("button", { onclick: () => countTL.now = count + 1 }, "Click me"))));
    const viewNodeTL = topNodeTL.sync(node => patch(document.getElementById("app"), node));
    world.now = countTL;
};
export { main };
