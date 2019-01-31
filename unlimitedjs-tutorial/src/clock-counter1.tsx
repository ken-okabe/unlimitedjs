import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
//============
const main = () => {
  const clockNodeTL = T(self => {
    const clockTL = T(
      (self) => {
        const f = () =>
          self.now = new Date().toLocaleTimeString();
        setInterval(f, 1000);
      }
    );
    const dummyTL = clockTL.sync(
      clock => self.now = <h3>{clock}</h3>
    );
  });

  const counterNodeTL = T(self => {
    const countTL = T();//timeline of the number of count
    const buttonNode = (//define buttonNode
      <button onclick={() => countTL.now = countTL.now + 1}>
        Click me
      </button>);
    const dummyTL = countTL.sync(
      count => self.now = (<div>
        <p>You clicked {countTL.now} times</p>
        {buttonNode}
      </div>)
    );
    const f = () => countTL.now = 0;
    setTimeout(f, 0);
  });

  const topNodeTL = T(self => {
    const updateTL = T((self) => {
      const tl1 = clockNodeTL
        .sync(() => self.now = true);
      const tl2 = counterNodeTL
        .sync(() => self.now = true);
    });
    const dummyTL = updateTL.sync(
      update => self.now = (<div>
        <h3>{clockNodeTL.now}</h3>
        {counterNodeTL.now}
      </div>)
    );
  });

  const viewNodeTL = topNodeTL.sync(
    topNode => patch(viewNodeTL.now, topNode, document.body)
  );
};

export { main };