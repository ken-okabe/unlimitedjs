//the timeline property `now` means
//time-index of the current time
// on the timeline from now until the future / next - now
const right = (a) => (b) => b;
const Events = () => ((observers) => ({
    register: (f) => (observers[observers.length] = f),
    trigger: (val) => right(observers.map((f) => f(val)))(val)
}))([]);
const world = {
    set now(timeline) {
        timeline.timeFunction(timeline);
    }
};
const T = ((Events) => (timeFunction = () => { }) => ((currentVal) => {
    //immutable in the frozen universe
    const timeline = ((ev) => ({
        type: "timeline-monad",
        timeFunction: timeFunction,
        get now() {
            return currentVal;
        },
        set now(val) {
            currentVal = val;
            (currentVal === undefined)
                ? undefined
                : ev.trigger(currentVal);
        },
        sync: ((ev) => (f) =>
            world.now = T((self) => right
                (ev.register((val) => ((newVal) =>
                    // RightIdentity: join = TTX => TX  
                    ((newVal !== undefined) &&
                        (newVal.type === timeline.type)
                        ? newVal.sync((val) => self.now = val)
                        : self.now = newVal))(f(val))))
                (timeline.now = timeline.now)
            ))(ev)
    }))(Events());
    return timeline;
})(undefined))(Events);
export { T, world };
