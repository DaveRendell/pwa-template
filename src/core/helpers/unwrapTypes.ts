export type UnwrapPromise<PromiseType> =
  PromiseType extends Promise<infer T>
    ? T
    : never