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

  const initData =
    ["Breakfast", "Lunch", "Dinner", "Sleep"];

  const addTL = T();
  const removeTL = T();
  const editTL = T();

  const listTL = (addTL => removeTL => editTL =>
    T(self => {
      const timeline1 = addTL.sync(add =>
        self.now = addArray(self.now)(add)
      );
      const timeline2 = removeTL.sync(index =>
        self.now = removeArray(self.now)(index)
      );

      const timeline3 = editTL.sync(edit => (
        self.now = replaceArray(self.now)(edit.index)
          (edit.text))
      );

      setTimeout(() => (self.now = initData), 0);
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

  const inputTextTL = T(self =>
    setTimeout(() => (self.now = ""), 0)
  );

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

  const inputBtnNode = (inputBtnTL =>
    <i class="material-icons mdc-text-field__icon"
      role="button"
      tabindex={0}
      onclick={() => inputBtnTL.now = true} >
      add</i>
  )(inputBtnTL);

  const inputNodeTL =
    (inputTextTL =>
      T(self =>
        inputTextTL
          .sync(inputText =>
            self.now =
            <div class="mdc-text-field mdc-text-field--with-trailing-icon">
              <input type="text" id="todoinput"
                class="mdc-text-field__input"
                value={inputText}
                onchange={e =>
                  inputTextTL.now = e.currentTarget.value} />
              <label class="mdc-floating-label"
                for="todopinput">ToDo Here</label>

              {inputBtnNode}

              <div class="mdc-line-ripple"></div>
            </div>
          )
      )
    )(inputTextTL);

  const itemRemoveNode = (removeTL =>
    index =>
      <i class="material-icons mdc-text-field__icon"
        role="button"
        tabindex={index * 3 + 3}
        onclick={() =>
          removeTL.now = index} >
        delete</i>)
    (removeTL);

  const itemNode = (editTL =>
    item => index =>
      <div class="mdc-text-field  mdc-text-field--with-trailing-icon" >

        <input type="text" id={"todoedit" + index}
          class="mdc-text-field__input"
          tabindex={index * 3 + 1}
          value={item}
          onchange={e =>
            editTL.now = {
              index: index,
              text: e.currentTarget.value
            }
          } />

        {itemRemoveNode(index)}

        <div class="mdc-line-ripple"></div>
      </div>)
    (editTL);

  const listNodeTL = (inputNodeTL => listTL =>
    T(self =>
      mergeTL([inputNodeTL, listTL])
        .sync(([inputNode, list]) => self.now =
          <ul class="mdc-list">

            <li class="mdc-list-item">
              {inputNode}
            </li>

            {list.map((item, index) =>
              <li class="mdc-list-item">
                {itemNode(item)(index)}
              </li>
            )}
          </ul>
        )
    )
  )(inputNodeTL)(listTL);

  const topNodeTL = listNodeTL;

  const viewNodeTL = topNodeTL.sync(topNode =>
    patch(viewNodeTL.now, topNode, document.body)
  );

  const mdcTL = viewNodeTL.sync(() => {

    Array.from(document
      .querySelectorAll(".mdc-text-field"))
      .map(textField =>
        (window as any).mdc.textField
          .MDCTextField.attachTo(textField));

    Array.from(document
      .querySelectorAll(".mdc-text-field"))
      .map(textField =>
        (window as any).mdc.ripple
          .MDCRipple.attachTo(textField));


    Array.from(document
      .querySelectorAll(".mdc-text-field-icon"))
      .map(textFieldIcon =>
        (window as any).mdc.textField.icon
          .MDCTextFieldIcon.attachTo(textFieldIcon));

    Array.from(document
      .querySelectorAll(".mdc-list"))
      .map(list =>
        (window as any).mdc.list
          .MDCList.attachTo(list));

  });


};

export { main };