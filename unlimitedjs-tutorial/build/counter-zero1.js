import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
//============
const main = () => {
    const counterNodeTL = T(self => {
        const countTL = T(self => {
            const f = () => self.now = 0;
            setTimeout(f, 0);
        }); //timeline of the number of count
        const dummyTL = countTL.sync(count => self.now = (h("div", null,
            h("p", null,
                "You clicked ",
                count,
                " times"),
            h("button", { onclick: () => countTL.now = count + 1 }, "Click me"))));
    });
    const topNodeTL = counterNodeTL;
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
};
export { main };
