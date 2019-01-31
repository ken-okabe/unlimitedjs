import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

const topNodeTL = T();
const viewNodeTL = topNodeTL.sync(
    topNode => patch(viewNodeTL.now, topNode, document.body)
);

const helloNode = <div>hello</div>;
topNodeTL.now = helloNode;

