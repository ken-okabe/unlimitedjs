import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
//============
const main = () => {
    const counterNodeTL = T(self => {
        const countTL = T(); //timeline of the number of count
        const buttonNode = ( //define buttonNode
        h("button", { onclick: () => countTL.now = countTL.now + 1 }, "Click me"));
        const dummyTL = countTL.sync(count => self.now = (h("div", null,
            h("p", null,
                "You clicked ",
                countTL.now,
                " times"),
            buttonNode)));
        const f = () => countTL.now = 0;
        setTimeout(f, 0);
    });
    const topNodeTL = counterNodeTL;
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
};
export { main };
