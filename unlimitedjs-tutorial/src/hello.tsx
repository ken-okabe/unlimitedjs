
import { h, patch } from "../../node_modules/superfine/src/index.js";

const main = () => {
  const helloNode = <div>hello</div>;

  const lastNode = patch(
    undefined,
    helloNode,
    document.body
  );
};

export { main };