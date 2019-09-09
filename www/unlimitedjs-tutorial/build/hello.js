import { h, patch } from "../../lib/superfine/src/index.js";
const main = () => {
    const helloNode = h("div", null, "hello");
    const lastNode = patch(document.body, helloNode);
};
export { main };
