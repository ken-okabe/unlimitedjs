import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
let promise1resolve;
const promise1 = new Promise(resolve => {
    promise1resolve = resolve;
});
const timeline1 = T();
const promise2 = promise1.then(a => a + " promise");
const timeline2 = timeline1.sync(a => a + " timeline");
const promise3 = promise2.then(a => console.log(a));
const timeline3 = timeline2.sync(a => console.log(a));
promise1resolve("hello");
timeline1.now = "hello";
//===============
