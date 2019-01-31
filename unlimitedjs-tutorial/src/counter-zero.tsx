import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

//============
const main = () => {

  const countTL = T();//timeline of the number of count

  const topNodeTL = countTL.sync(//synchronized with countTL
    count => (<div>
      <p>You clicked {countTL.now} times</p>
      <button onclick={() => countTL.now = countTL.now + 1}>
        Click me
    </button>
    </div>)
  );

  const viewNodeTL = topNodeTL.sync(
    topNode => patch(viewNodeTL.now, topNode, document.body)
  );

  countTL.now = 0;
};

export { main };