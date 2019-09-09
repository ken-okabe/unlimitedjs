import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";
//============
const main = () => {

  const clockNodeTL = T(self => {
    const clockTL = T(self => {
      const f = () =>
        self.now = new Date().toLocaleTimeString();
      setInterval(f, 1000);
    });
    const timeline = clockTL.sync(clock =>
      self.now = <div>{clock}</div>
    );

    world.now = clockTL;
  });

  const counterNodeTL = T(self => {
    const countTL = T(self => self.now = 0);
    const timeline = countTL.sync(count =>
      self.now = (<div>
        <p>You clicked {count} times</p>
        <button onclick={() => countTL.now = count + 1}>
          Click me
        </button>
      </div>)
    );
    world.now = countTL;
  });

  const mergeTL = (TLs => T(self =>
    TLs.map(TL => TL.sync(() =>
      self.now = TLs.map(TL => TL.now)
    ))
  ))([clockNodeTL, counterNodeTL]);

  const topNodeTL = T(self =>
    mergeTL.sync(([clockNode, counterNode]) =>
      self.now = <div>
        <h3>{clockNode}</h3>
        {counterNode}
      </div>
    )
  );

  const viewNodeTL = topNodeTL.sync(
    node => patch(document.getElementById("app"), node)
  );

  world.now = topNodeTL;
  world.now = mergeTL;
  world.now = clockNodeTL;
  world.now = counterNodeTL;

};

export { main };