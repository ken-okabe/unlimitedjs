interface timeline {
    type: string;
    now: any;
    sync: Function;
}
declare const allThenResetTL: (TLs: timeline[]) => timeline;
export { allThenResetTL };
