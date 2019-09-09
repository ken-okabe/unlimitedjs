import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";

const main = () => {

  const countTL = T(self => self.now = 0);

  const btnTL = T(self =>
    self.sync(btn =>
      countTL.now = (btn === 0)
        ? 0
        : countTL.now + btn)
  );

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

  const viewNodeTL = topNodeTL.sync(
    node => patch(document.getElementById("app"), node)
  );

  world.now = btnTL;
  world.now = countTL;

};

export { main };