import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";

const main = () => {

  const newNodeTL = T(self =>
    self.sync(node =>
      patch(document.getElementById("app"), node)
    )
  );

  world.now = newNodeTL;

  const f = () => {
    const timeString = new Date().toLocaleTimeString();
    const clockNode = <div>{timeString}</div>;
    newNodeTL.now = clockNode;
  };
  setInterval(f, 1000);
};

export { main };




