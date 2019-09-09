import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
const main = () => {
    const topNodeTL = T(self => self.sync(node => patch(document.body, node)));
    world.now = topNodeTL; //initialize topNode
    topNodeTL.now = h("div", null, "hello timeline");
};
export { main };
