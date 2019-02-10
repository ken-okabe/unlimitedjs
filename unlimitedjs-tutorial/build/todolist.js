const main = () => {
    /*
    
      const counterNodeTL = T(self => {
        const countTL = T(self => {
          const f = () => self.now = 0;
          setTimeout(f, 0);
        });//timeline of the number of count
        const timeline = countTL.sync(count =>
          self.now = (<div>
            <p>You clicked {count} times</p>
            <button onclick={() => countTL.now = count + 1}>
              Click me
            </button>
          </div>)
        );
      });
    
      const topNodeTL = countTL.sync(count =>
        <div>
          <h3>{count}</h3>
          <button
            onclick={() => btnTL.now = 0}>Reset</button>
          <button
            onclick={() => btnTL.now = -1}>-</button>
          <button
            onclick={() => btnTL.now = 1}>+</button>
        </div>
      );
    
      const viewNodeTL = topNodeTL.sync(topNode =>
        patch(viewNodeTL.now, topNode, document.body)
      );
    */
};
export { main };
