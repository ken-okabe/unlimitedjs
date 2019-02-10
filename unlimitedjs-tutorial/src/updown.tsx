import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

const main = () => {

  const btnTL = T();

  const countTL = T(self => {
    const timeline = btnTL.sync(btn =>
      self.now = (btn === 0)
        ? 0
        : self.now + btn);
  });

  const topNodeTL = countTL.sync(count =>
    <div>
      <h3>{count}</h3>
      <button
        onclick={() => btnTL.now = 0}>Reset</button>
      <button
        onclick={() => btnTL.now = -1}>-</button>
      <button
        onclick={() => btnTL.now = 1}>+</button>
    </div>
  );

  const viewNodeTL = topNodeTL.sync(topNode =>
    patch(viewNodeTL.now, topNode, document.body)
  );

  countTL.now = 0;
};

export { main };