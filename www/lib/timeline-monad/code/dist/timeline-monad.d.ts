interface timeline {
    type: string;
    timeFunction: Function;
    now: any;
    sync: Function;
}
declare const world: {
    now: timeline;
};
declare const T: (timeFunction?: Function) => timeline;
export { T, world };
