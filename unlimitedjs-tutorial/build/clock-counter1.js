import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
//============
const main = () => {
    const clockNodeTL = T(self => {
        const clockTL = T((self) => {
            const f = () => self.now = new Date().toLocaleTimeString();
            setInterval(f, 1000);
        });
        const dummyTL = clockTL.sync(clock => self.now = h("h3", null, clock));
    });
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
    const topNodeTL = T(self => {
        const updateTL = T((self) => {
            const tl1 = clockNodeTL
                .sync(() => self.now = true);
            const tl2 = counterNodeTL
                .sync(() => self.now = true);
        });
        const dummyTL = updateTL.sync(update => self.now = (h("div", null,
            h("h3", null, clockNodeTL.now),
            counterNodeTL.now)));
    });
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
};
export { main };
