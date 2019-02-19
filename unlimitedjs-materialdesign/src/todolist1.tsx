import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

const left = a => b => a;
const right = a => b => b;

const addArray = arr => item =>
  arr.concat(item);

const removeArray = arr => index =>
  [...arr.slice(0, index),
  ...arr.slice(index + 1)];

const replaceArray = arr => index => val =>
  [...arr.slice(0, index), val,
  ...arr.slice(index + 1)];

const mergeTL = TLs => T(self =>
  TLs.map(TL => TL.sync(() =>
    self.now = TLs.map(TL => TL.now)
  ))
);

const main = () => {

  const addTL = T();
  const removeTL = T();
  const editTL = T(self =>
    setTimeout(() => (self.now = {}), 0));

  const listTL = (addTL => removeTL => editTL =>
    T(self => {
      const timeline1 = addTL.sync(add =>
        self.now = addArray(self.now)(add)
      );
      const timeline2 = removeTL.sync(index =>
        self.now = removeArray(self.now)(index)
      );
      const timeline3 = editTL.sync(edit =>
        self.now = (edit.index === undefined)
          ? []
          : replaceArray(self.now)(edit.index)
            (edit.text)
      );
    })
  )(addTL)(removeTL)(editTL);

  {//debug timelines
    const debugTL1 = addTL.sync(add =>
      console.log(add));
    const debugTL2 = removeTL.sync(remove =>
      console.log(remove));
    const debugTL3 = editTL.sync(edit =>
      console.log(edit));
    const debugTL4 = listTL.sync(list =>
      console.log(list));
  }

  const listNodeTL = (listTL =>
    T(self =>
      listTL.sync(list => self.now =
        <ul>{list.map((item, index) =>
          <li>
            {itemNode(item)(index)
              (editTL.now)
              (T(self => self.now = item))}
          </li>
        )}</ul>
      )
    )
  )(listTL);

  const itemNode = item => index => edit =>
    editTextTL =>
      right(edit.mode === undefined
        ? edit.mode = false
        : undefined)
        (<div>
          {itemTextNode(item)(index)(edit)(editTextTL)}
          {itemEditNode(index)(edit)(editTextTL)}
          {itemRemoveNode(index)(edit)}
        </div>);

  const itemTextNode =
    item => index => edit => editTextTL =>
      (edit.mode) && (edit.index === index)
        ? <input type="text" id="edit"
          value={item}
          onchange={e =>
            editTextTL.now = e.currentTarget.value} />
        : item;

  const itemEditNode = (editTL =>
    index => edit => editTextTL =>
      <button type="button"
        disabled={edit.mode &&
          edit.index !== index}
        onclick={() => editTL.now =
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
            }
        } >
        {(edit.mode) &&
          (edit.index === index)
          ? "EditDone"
          : "Edit"}
      </button>)
    (editTL);

  const itemRemoveNode = (removeTL =>
    index => edit =>
      <button type="button"
        disabled={edit.mode}
        onclick={() =>
          removeTL.now = index} >
        Remove</button>)
    (removeTL);

  const inputTextTL = T(self =>
    setTimeout(() => (self.now = ""), 0)
  );

  const inputTextNodeTL = (inputTextTL =>
    T(self =>
      inputTextTL.sync(inputText =>
        self.now =
        <input type="text"
          value={inputText}
          onchange={e =>
            inputTextTL.now = e.currentTarget.value} />
      )
    )
  )(inputTextTL);

  const inputBtnTL = (inputTextTL => addTL =>
    T(self =>
      self.sync(() => addTL.now =
        (inputTextTL.now === undefined ||
          inputTextTL.now.length === 0)
          ? undefined
          : left(inputTextTL.now)
            (inputTextTL.now = "")
      )
    )
  )(inputTextTL)(addTL);

  const inputBtnNodeTL = (inputBtnTL => editTL =>
    T(self =>
      editTL.sync(edit =>
        self.now =
        <button type="button" disabled={edit.mode}
          onclick={() => inputBtnTL.now = true} >
          Add</button>
      )
    )
  )(inputBtnTL)(editTL);

  const inputNodeTL =
    (inputTextNodeTL => inputBtnNodeTL =>
      T(self => mergeTL(
        [inputTextNodeTL, inputBtnNodeTL])
        .sync(([inputTextNode, inputBtnNode]) =>
          self.now = <div>
            {inputTextNode}
            {inputBtnNode}
          </div>
        )
      )
    )(inputTextNodeTL)(inputBtnNodeTL);

  const topNodeTL =
    (inputNodeTL => listNodeTL =>
      T(self =>
        mergeTL([inputNodeTL, listNodeTL])
          .sync(([inputNode, listNode]) => self.now =
            <div>
              {inputNode}
              {listNode}
            </div>
          )
      )
    )(inputNodeTL)(listNodeTL);

  const viewNodeTL = topNodeTL.sync(topNode =>
    patch(viewNodeTL.now, topNode, document.body)
  );

};

export { main };