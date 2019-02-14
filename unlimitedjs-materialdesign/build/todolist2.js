import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const main = () => {
    const todoTL = T();
    const listTL = (todoTL => T(self => {
        setTimeout(() => (self.now = []), 0);
        const timeline = todoTL.sync(todo => self.now = self.now.concat(todo));
    }))(todoTL);
    const debugTL1 = todoTL.sync(todo => console.log(todo));
    const debugTL2 = listTL.sync(list => console.log(list));
    const listNodeTL = T(self => listTL.sync(list => self.now = h("ul", null, list.map(item => h("li", null, item)))));
    const inputNodeTL = (todoTL => T(self => {
        const textTL = T(self => setTimeout(() => (self.now = []), 0));
        const btnPushTL = T(self => self.sync(() => (todoTL.now =
            (textTL.now === undefined ||
                textTL.now.length === 0)
                ? undefined
                : textTL.now) &&
            (textTL.now = "")));
        const timeline = textTL.sync(text => self.now = h("div", null,
            h("input", { type: "text", id: "todo", value: text, onchange: e => textTL.now = e.currentTarget.value }),
            h("button", { type: "button", onclick: () => btnPushTL.now = true }, "Add")));
    }))(todoTL);
    const mergeTL = TLs => T(self => TLs.map(TL => TL.sync(() => self.now = TLs.map(TL => TL.now))));
    const topNodeTL = T(self => mergeTL([inputNodeTL, listNodeTL])
        .sync(([inputNode, listNode]) => self.now = h("div", null,
        inputNode,
        listNode)));
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
};
export { main };
