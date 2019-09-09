import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
const main = () => {
    const countTL = T(self => self.now = 0);
    const btnTL = T(self => self.sync(btn => countTL.now = (btn === 0)
        ? 0
        : countTL.now + btn));
    const topNodeTL = countTL.sync(count => h("div", null,
        h("h3", null, count),
        h("button", { onclick: () => btnTL.now = 0 }, "Reset"),
        h("button", { onclick: () => btnTL.now = -1 }, "-"),
        h("button", { onclick: () => btnTL.now = 1 }, "+")));
    const viewNodeTL = topNodeTL.sync(node => patch(document.getElementById("app"), node));
    world.now = btnTL;
    world.now = countTL;
};
export { main };
