import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";
import { h, patch } from "../../node_modules/superfine/src/index.js";

const main = () => {

  const messageTL = T(self =>
    setTimeout(() => (self.now = ""), 0)
  );

  const outputNodeTL = (messageTL =>
    T(self =>
      messageTL.sync(message =>
        self.now = <h2 mdc-typography--headline2
        >{message}</h2>
      )
    )
  )(messageTL);

  const inputNode = (messageTL => {
    const firstTL = T();
    const lastTL = T();
    const btnTL = T(self =>
      self.sync(() =>
        messageTL.now =
        firstTL.now === undefined
          || lastTL.now === undefined
          ? undefined
          : "Welcome " +
          firstTL.now + " " + lastTL.now
      )
    );

    //===
    return <div>

    

    <h2 class="mdc-typography--headline2">
    Flawlessly with Material Design</h2>

    <div class="mdc-text-field">
      <input type="text" id="first-name"
        class="mdc-text-field__input" 
        onchange = {e=> 
          firstTL.now = e.currentTarget.value}/>
      <label class="mdc-floating-label"
        for="first-name">First name</label>
      <div class="mdc-line-ripple"></div>
    </div>

    <br/>

    <div class="mdc-text-field">
      <input type="text" id="last-name"
        class="mdc-text-field__input" 
        onchange = {e=> 
          lastTL.now = e.currentTarget.value}/>
      <label class="mdc-floating-label"
        for="last-name">Last name</label>
      <div class="mdc-line-ripple"></div>
    </div>

    <br/>
    
    <button type="button" class="mdc-button 
    mdc-button--raised mdc-button--primary"
    onclick = {()=> btnTL.now = true} >
      Press Me</button>

    </div>;
    //===
  })(messageTL);

  const topNodeTL = outputNodeTL.sync(outputNode =>
    <div>
      {inputNode}
      {outputNode}
    </div>
  );

  const viewNodeTL = topNodeTL.sync(topNode =>
    patch(viewNodeTL.now, topNode, document.body)
  );

  const mdcTL = viewNodeTL.sync(() => {

    Array.from(document
      .querySelectorAll('.mdc-text-field'))
      .map(textField =>
        (window as any).mdc.textField
          .MDCTextField.attachTo(textField));

    Array.from(document
      .querySelectorAll('.mdc-button'))
      .map(button =>
        (window as any).mdc.ripple
          .MDCRipple.attachTo(button));

  });

};

export { main };