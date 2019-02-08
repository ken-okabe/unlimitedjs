import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

const main = () => {

  const clockTL = T((self) => {
    const f = () =>
      self.now = new Date().toLocaleTimeString();
    setInterval(f, 1000);
  });

  const topNodeTL = clockTL.sync(
    clock => (<div>{clock}</div>)
  );

  const viewNodeTL = topNodeTL.sync(
    topNode => patch(viewNodeTL.now, topNode, document.body)
  );

};

export { main };


