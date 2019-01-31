import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
const promise = new Promise(resolve => {
    const f = () => resolve("Hello promise!");
    setTimeout(f, 1000);
});
const timeline = T(self => {
    const f = () => (self.now = "Hello timeline!");
    setTimeout(f, 1000);
});
const promise1 = promise.then(a => console.log(a));
const timeline1 = timeline.sync(a => console.log(a));
const timeline2 = T(self => {
    const f = () => (self.now = "Hello timeline!");
    setInterval(f, 1000);
});
const timeline3 = timeline2.sync(a => console.log(a));
