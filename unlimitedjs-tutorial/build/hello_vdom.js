import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const _canvas = document.getElementById('vdom1');
const canvas = (_canvas == null)
    ? {}
    : _canvas;
const pointerTL = T(self => {
    canvas.onmousemove = e => self.now = { x: e.clientX, y: e.clientY };
});
const drawTL = T(self => {
    const topNodeTL = self.sync(pointer => h("div", { style: {
            "left": (pointer.x - 20) + "px",
            "top": (pointer.y - 20) + "px",
            "width": "20px",
            "height": "20px",
            "border-radius": "50%",
            "background-color": "red",
            "position": "relative"
        } }));
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, canvas));
});
const timeline = pointerTL.sync(pointer => drawTL.now = pointer);
