declare type NestedArray<TDatum, TKey> = [
  TKey,
  NestedArray<TDatum, TKey> | TDatum[],
];
declare type Accessor<T, U> = (
  datum: T,
  index: number,
  array: Iterable<T>,
) => U | undefined | null;
declare type Reducer<T, U> = (value: T[]) => U;
export declare class D3Array<T> extends Array<T> {
  // eslint-disable-next-line constructor-super
  constructor(arrayLike: ArrayLike<T> | Iterable<T>);
  max(this: string[]): string | undefined;
  min(this: string[]): string | undefined;
  maxIndex<T>(this: T[]): number;
  minIndex<T>(this: T[]): number;
  extent(this: string[]): [string, string] | [undefined, undefined];
  mean<T extends number>(this: (T | undefined | null)[]): number | undefined;
  median<T extends number>(this: (T | undefined | null)[]): number | undefined;
  quantile<T extends number>(
    this: (T | undefined | null)[],
    p: number,
  ): number | undefined;
  sum<T extends number>(this: (T | undefined | null)[]): number;
  deviation<T extends number>(
    this: (T | undefined | null)[],
  ): number | undefined;
  variance<T extends number>(
    this: (T | undefined | null)[],
  ): number | undefined;
  group<TKey>(this: T[], ...keys: Accessor<T, TKey>[]): Map<TKey, T[]>;
  groups<T, TKey>(
    this: T[],
    ...keys: Accessor<T, TKey>[]
  ): NestedArray<T, TKey>;
  index<TKey>(this: T[], ...keys: Accessor<T, TKey>[]): Map<TKey, T>;
  indexes<TKey>(this: T[], ...keys: Accessor<T, TKey>[]): NestedArray<T, TKey>;
  rollup<TKey, TReduce>(
    this: T[],
    reduce: (value: T[]) => TReduce,
    ...keys: ((value: T) => TKey)[]
  ): Map<TKey, TReduce>;
  rollups<TKey, TReduce>(
    this: T[],
    reduce: Reducer<T, TReduce>,
    ...keys: Accessor<T, TKey>[]
  ): [TKey, TReduce][];
  count(this: T[]): number;
  least<T>(this: T[], comparator?: (a: T, b: T) => number): T | undefined;
  leastIndex(
    this: T[],
    comparator?: (a: T, b: T) => number,
  ): number | undefined;
  greatest<T>(this: T[], comparator?: (a: T, b: T) => number): T | undefined;
  /** isto é um teste */
  greatestIndex(
    this: T[],
    comparator?: (a: T, b: T) => number,
  ): number | undefined;
  cross<S, U>(
    this: T[],
    b: Iterable<S>,
    reducer?: (a: T, b: S) => U,
  ): Array<[T, S]> | U[];
  pairs<U>(this: T[], reducer?: (a: T, b: T) => U): Array<[T, T]> | U[];
  permute(this: {
    [key: number]: T;
  }, keys: ArrayLike<number>): T[];
  permuteObject<K extends keyof T>(
    this: T[],
    keys: ArrayLike<K>,
  ): Array<T[K]>[];
  shuffle<T>(this: T[], lo?: number, hi?: number): T[];
  transpose(this: ArrayLike<ArrayLike<T>>): T[][];
  zip(...arrays: Array<ArrayLike<T>>): T[][];
  union(this: T[], ...arrays: Array<T[]>): T[];
  difference(this: Array<T>, ...arrays: Array<T[]>): T[];
  intersection<T>(this: Array<T>, ...arrays: Array<T[]>): T[];
  subset(this: Array<T>, array: Array<T>): boolean;
  superset(this: Array<T>, array: Array<T>): boolean;
  disjoint(this: Array<T>, array: Array<T>): boolean;

  item(n: number): T | undefined;
  by<Z extends keyof T>(field: Z): T[Z][];
  after(n: number): T[];
  before(n: number): T[];
  between(start: number, end: number): T[];
  head(n?: number): T[];
  leftJoin(array: T[]): T[];
  unique(): T[];
  cast<U extends T[keyof T]>(
    def: {
      [key in keyof T]: Accessor<U, U>;
    },
  ): T[];
  drop(field: keyof T): Pick<T, Exclude<keyof T, keyof T>>[];
  rename(oldField: keyof T, newField: string): ({
    [x: string]: T[keyof T];
  } & Pick<T, Exclude<keyof T, keyof T>>)[];
}
export declare function d3a<T>(arrayLike: ArrayLike<T> | T[]): D3Array<T>;
export declare function toInt(value: string): number;
export declare const toFloat: typeof parseFloat;
export declare function toDate(value: string): Date;
export declare function toBool(value: string | number | boolean, def: {
  True: string | number | boolean;
  False: string | number | boolean;
  Undefined?: string | number | boolean;
}): boolean | null | undefined;
export declare function autoType(
  object: Record<string, string>,
): Record<string, string | number | boolean | Date | null>;
export {};
