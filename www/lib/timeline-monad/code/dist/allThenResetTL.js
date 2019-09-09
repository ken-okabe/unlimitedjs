import { T, world } from "./timeline-monad.js";
const right = (a) => (b) => b;
const replace = (arr) => (index) => (val) => [...arr.slice(0, index), val,
    ...arr.slice(index + 1)];
const updateFlagsTL = (TLs) => (selfAll) => world.now = T((self) => {
    self.now = Array(TLs.length).fill(0);
    TLs
        .map((TL, index1) => TL.sync(() => right(TLs.map((tl, index0) => (tl.now === undefined)
        ? self.now = replace(self.now)(index0)(0)
        : undefined))(self.now = replace(self.now)(index1)(1))));
    self.sync((updateFlags) => selfAll.now =
        (updateFlags //all  updated--------
            .reduce((a, b) => (a * b)) !== 1)
            ? undefined //no trigger
            : right(self.now = Array(TLs.length).fill(0))(TLs.map((TL) => TL.now)));
});
const allThenResetTL = (TLs) => world.now = T((selfAll) => updateFlagsTL(TLs)(selfAll));
export { allThenResetTL };
