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
    const timeline = clockTL.sync(clock =>
      self.now = <h3>{clock}</h3>
    );
  });

  const counterNodeTL = T(self => {
    const countTL = T();
    const buttonNode = <button
      onclick={() => countTL.now = countTL.now + 1}>
      Click me
      </button>;
    const timeline = countTL.sync(count =>
      self.now = <div>
        <p>You clicked {countTL.now} times</p>
        {buttonNode}
      </div>
    );
    const f = () => countTL.now = 0;
    setTimeout(f, 0);
  });

  const mergeTL = TLs => T(self =>
    TLs.map(TL => TL.sync(() =>
      self.now = TLs.map(TL => TL.now)
    ))
  );

  const topNodeTL = T(self =>
    mergeTL([clockNodeTL, counterNodeTL])
      .sync(([clockNode, counterNode]) =>
        self.now = <div>
          <h3>{clockNode}</h3>
          {counterNode}
        </div>
      )
  );

  const viewNodeTL = topNodeTL.sync(topNode =>
    patch(viewNodeTL.now, topNode, document.body)
  );

};

export { main };