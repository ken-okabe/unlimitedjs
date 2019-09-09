import { h, patch } from "../../lib/superfine/src/index.js";

const main = () => {
  const helloNode = <div>hello</div>;

  const lastNode = patch(
    document.body,
    helloNode
  );
};

export { main };