import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
//============
const main = () => {
  const clockNodeTL = T(self => {
    const clockTL = T((self) => {
      const f = () => self.now = new Date().toLocaleTimeString();
      setInterval(f, 1000);
    });
    const timeline = clockTL.sync(clock => self.now = h("h3", null, clock));
  });
  const counterNodeTL = T(self => {
    const countTL = T();
    const buttonNode = h("button", { onclick: () => countTL.now = countTL.now + 1 }, "Click me");
    const timeline = countTL.sync(count => self.now = h("div", null,
      h("p", null,
        "You clicked ",
        countTL.now,
        " times"),
      buttonNode));
    const f = () => countTL.now = 0;
    setTimeout(f, 0);
  });
  const mergeTL = TLs => T(self => TLs.map(TL => TL.sync(() => self.now = TLs.map(TL => TL.now))));
  const topNodeTL = T(self => mergeTL([clockNodeTL, counterNodeTL])
    .sync(([clockNode, counterNode]) => self.now = h("div", null,
      h("h3", null, clockNode),
      counterNode)));
  const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
};
export { main };
