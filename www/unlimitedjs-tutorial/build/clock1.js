import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
const main = () => {
    const clockTL = T(self => {
        const f = () => self.now = new Date().toLocaleTimeString();
        setInterval(f, 1000);
    });
    const clockNodeTL = clockTL.sync(clock => patch(document.getElementById("app"), (h("div", null, clock))));
    world.now = clockTL;
};
export { main };
