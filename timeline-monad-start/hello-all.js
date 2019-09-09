import { T, world } from "../node_modules/timeline-monad/code/dist/timeline-monad.js";

import { allThenResetTL } from "../node_modules/timeline-monad/code/dist/allThenResetTL.js";

const timelineA = T();
const timelineB = timelineA.sync(a => a * 2);

const log = msg => console.log(msg);
//log on every timeline Atomic update
const timelineAB =
    allThenResetTL([timelineA, timelineB])
        .sync(log);

{
    world.now = timelineA;
    world.now = timelineB;

    // set the current values-----
    timelineA.now = 1;
}
