import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

const main = () => {

  const listTL = T();

  const listNodeTL = T(self =>
    listTL.sync(list =>
      self.now = <ul>
        {list.map(item => <li>{item}</li>)}
      </ul>
    )
  );

  const topNodeTL = listNodeTL;

  const viewNodeTL = topNodeTL.sync(topNode =>
    patch(viewNodeTL.now, topNode, document.body)
  );

  listTL.now = ["foo", "bar"];

};

main();