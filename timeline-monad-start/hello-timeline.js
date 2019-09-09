import { T, world } from "../node_modules/timeline-monad/code/dist/timeline-monad.js";

const timeline = T();
timeline.now = "Hello";
console.log(timeline.now);

world.now = timeline;