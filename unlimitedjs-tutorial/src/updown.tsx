import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

const main = () => {
  const countTL = T();

  const upNode = (
    <button onclick={() => countTL.now = countTL.now + 1}>+</button>
  );

  const dnNode = (
    <button onclick={() => countTL.now = countTL.now - 1}>-</button>
  );

  const topNodeTL = countTL.sync(
    count => <div>
      <h1>{count}</h1>
      {dnNode}{upNode}
    </div>
  );

  const viewNodeTL = topNodeTL.sync(
    topNode => patch(
      viewNodeTL.now,
      topNode,
      document.body
    )
  );

  countTL.now = 0;
};

export { main };