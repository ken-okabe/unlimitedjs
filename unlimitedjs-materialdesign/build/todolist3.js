import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";
const left = a => b => a;
const right = a => b => b;
const addArray = arr => item => arr.concat(item);
const removeArray = arr => index => [...arr.slice(0, index),
    ...arr.slice(index + 1)];
const replaceArray = arr => index => val => [...arr.slice(0, index), val,
    ...arr.slice(index + 1)];
const mergeTL = TLs => T(self => TLs.map(TL => TL.sync(() => self.now = TLs.map(TL => TL.now))));
const main = () => {
    const initData = ["Breakfast", "Lunch", "Dinner", "Sleep"];
    const addTL = T();
    const removeTL = T();
    const editTL = T(self => setTimeout(() => (self.now = {}), 0));
    const listTL = (addTL => removeTL => editTL => T(self => {
        const timeline1 = addTL.sync(add => self.now = addArray(self.now)(add));
        const timeline2 = removeTL.sync(index => self.now = removeArray(self.now)(index));
        const timeline3 = editTL.sync(edit => self.now = (edit.index === undefined)
            ? initData
            : replaceArray(self.now)(edit.index)(edit.text));
    }))(addTL)(removeTL)(editTL);
    { //debug timelines
        const debugTL1 = addTL.sync(add => console.log(add));
        const debugTL2 = removeTL.sync(remove => console.log(remove));
        const debugTL3 = editTL.sync(edit => console.log(edit));
        const debugTL4 = listTL.sync(list => console.log(list));
    }
    const inputTextTL = T(self => setTimeout(() => (self.now = ""), 0));
    const inputBtnTL = (inputTextTL => addTL => T(self => self.sync(() => addTL.now =
        (inputTextTL.now === undefined ||
            inputTextTL.now.length === 0)
            ? undefined
            : left(inputTextTL.now)(inputTextTL.now = ""))))(inputTextTL)(addTL);
    const inputBtnNodeTL = (inputBtnTL => editTL => T(self => editTL.sync(edit => self.now =
        h("i", { class: "material-icons mdc-text-field__icon", role: "button", tabindex: edit.mode
                ? undefined
                : 0, onclick: () => inputBtnTL.now = true }, "add"))))(inputBtnTL)(editTL);
    const inputNodeTL = (inputTextTL => inputBtnNodeTL => T(self => mergeTL([inputTextTL, inputBtnNodeTL])
        .sync(([inputText, inputBtnNode]) => self.now =
        h("div", { class: "mdc-text-field mdc-text-field--with-trailing-icon" },
            h("input", { type: "text", id: "todoinput", class: "mdc-text-field__input", value: inputText, onchange: e => inputTextTL.now = e.currentTarget.value }),
            h("label", { class: "mdc-floating-label", for: "todopinput" }, "ToDo Here"),
            inputBtnNode,
            h("div", { class: "mdc-line-ripple" })))))(inputTextTL)(inputBtnNodeTL);
    const itemEditNode = (editTL => index => edit => editTextTL => h("i", { class: "material-icons mdc-text-field__icon", role: "button", tabindex: edit.mode &&
            edit.index !== index
            ? undefined
            : index * 3 + 2, onclick: () => editTL.now =
            (edit.mode === false)
                ? {
                    "index": index,
                    "text": editTextTL.now,
                    "mode": true
                }
                : {
                    "index": index,
                    "text": editTextTL.now,
                    "mode": false
                } }, (edit.mode) &&
        (edit.index === index)
        ? "done"
        : "edit"))(editTL);
    const itemRemoveNode = (removeTL => index => edit => h("i", { class: "material-icons mdc-text-field__icon", role: "button", tabindex: edit.mode
            ? undefined
            : index * 3 + 3, onclick: () => removeTL.now = index }, "delete"))(removeTL);
    const itemNode = item => index => edit => editTextTL => right(edit.mode === undefined
        ? edit.mode = false
        : undefined)(h("div", { class: "mdc-text-field mdc-text-field--with-leading-icon mdc-text-field--with-trailing-icon" },
        itemEditNode(index)(edit)(editTextTL),
        h("input", { type: "text", id: "todoedit" + index, class: "mdc-text-field__input", tabindex: index * 3 + 1, disabled: !(edit.mode &&
                edit.index === index), value: item, onchange: e => editTextTL.now = e.currentTarget.value }),
        itemRemoveNode(index)(edit),
        h("div", { class: "mdc-line-ripple" })));
    const focusTL = editTL.sync(edit => {
        const _editIndexNode = window.document
            .getElementById("todoedit" + edit.index);
        return _editIndexNode === null
            ? undefined
            : _editIndexNode.focus();
    });
    const listNodeTL = (inputNodeTL => listTL => T(self => mergeTL([inputNodeTL, listTL])
        .sync(([inputNode, list]) => self.now =
        h("ul", { class: "mdc-list" },
            h("li", { class: "mdc-list-item" }, inputNode),
            list.map((item, index) => h("li", { class: "mdc-list-item" }, itemNode(item)(index)(editTL.now)(T(self => self.now = item))))))))(inputNodeTL)(listTL);
    const topNodeTL = listNodeTL;
    const viewNodeTL = topNodeTL.sync(topNode => patch(viewNodeTL.now, topNode, document.body));
    const mdcTL = viewNodeTL.sync(() => {
        Array.from(document
            .querySelectorAll(".mdc-text-field"))
            .map(textField => window.mdc.textField
            .MDCTextField.attachTo(textField));
        Array.from(document
            .querySelectorAll(".mdc-text-field"))
            .map(textField => window.mdc.ripple
            .MDCRipple.attachTo(textField));
        Array.from(document
            .querySelectorAll(".mdc-text-field-icon"))
            .map(textFieldIcon => window.mdc.textField.icon
            .MDCTextFieldIcon.attachTo(textFieldIcon));
        Array.from(document
            .querySelectorAll(".mdc-list"))
            .map(list => window.mdc.list
            .MDCList.attachTo(list));
    });
};
main();
