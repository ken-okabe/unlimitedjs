import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
const main = () => {
    const clockNodeTL = T(self => {
        const clockTL = T(self => {
            const f = () => self.now = new Date().toLocaleTimeString();
            setInterval(f, 1000);
        });
        const timeline = clockTL.sync(clock => self.now = h("div", null, clock));
        world.now = clockTL;
    });
    const topNodeTL = clockNodeTL;
    const viewNodeTL = topNodeTL.sync(node => patch(document.getElementById("app"), node));
    world.now = clockNodeTL;
};
export { main };
