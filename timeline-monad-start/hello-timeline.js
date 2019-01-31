import { T } from "timeline-monad";

const timeline = T();
timeline.now = "Hello";
console.log(timeline.now);
