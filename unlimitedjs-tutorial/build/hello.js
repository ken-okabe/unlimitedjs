import { h, patch } from "../../node_modules/superfine/src/index.js";
const main = () => {
    const helloNode = h("div", null, "hello");
    const lastNode = patch(undefined, helloNode, document.body);
};
export { main };
