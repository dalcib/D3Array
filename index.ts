// @deno-types="./d3-array.d.ts"
import {
  max,
  min,
  maxIndex,
  minIndex,
  extent,
  mean,
  median,
  quantile,
  sum,
  deviation,
  variance,
  group,
  groups,
  rollup,
  rollups,
  count,
  least,
  leastIndex,
  greatest,
  greatestIndex,
  index,
  indexes,
  cross,
  pairs,
  permute,
  shuffle,
  transpose,
  zip,
  difference,
  union,
  intersection,
  subset,
  superset,
  disjoint,
} from "https://cdn.skypack.dev/d3-array@^2.4.0";
//export * from "https://cdn.skypack.dev/d3-array@^2.4.0";

type NestedMap<TDatum, TKey> = Map<TKey, NestedMap<TDatum, TKey> | TDatum[]>;
type NestedArray<TDatum, TKey> = [TKey, NestedArray<TDatum, TKey> | TDatum[]];
type Accessor<T, U> = (
  datum: T,
  index: number,
  array: Iterable<T>,
) => U | undefined | null;
type Comparator<T> = (a: T, b: T) => number;
type Reducer<T, U> = (value: T[]) => U;

export class D3Array<T> extends Array<T> {
  constructor(arrayLike: ArrayLike<T> | Iterable<T>) {
    const array = Array.from(arrayLike);
    super(...array);
  }

  // d3-array methods

  max(this: string[]): string | undefined;
  max<T extends number>(this: T[]): T | undefined {
    return max(this);
  }

  min(this: string[]): string | undefined;
  min<T extends number>(this: T[]): T | undefined {
    return min(this);
  }

  maxIndex<T>(this: T[]): number {
    return maxIndex(this);
  }

  minIndex<T>(this: T[]): number {
    return minIndex(this);
  }

  extent(
    this: string[],
  ): [string, string] | [undefined, undefined];
  extent<T extends number>(
    this: T[],
  ): [T, T] | [undefined, undefined] {
    return extent(this);
  }

  mean<T extends number>(
    this: (T | undefined | null)[],
  ): number | undefined {
    return mean(this);
  }

  median<T extends number>(
    this: (T | undefined | null)[],
  ): number | undefined {
    return median(this);
  }

  quantile<T extends number>(
    this: (T | undefined | null)[],
    p: number,
  ): number | undefined {
    return quantile(this, p);
  }

  sum<T extends number>(
    this: (T | undefined | null)[],
  ): number {
    return sum(this);
  }

  deviation<T extends number>(
    this: (T | undefined | null)[],
  ): number | undefined {
    return deviation(this);
  }

  variance<T extends number>(
    this: (T | undefined | null)[],
  ): number | undefined {
    return variance(this);
  }

  group<TKey>(
    this: T[],
    ...keys: Accessor<T, TKey>[]
  ): Map<TKey, T[]> {
    return group(this, ...keys);
  }

  groups<T, TKey>(
    this: T[],
    ...keys: Accessor<T, TKey>[]
  ): NestedArray<T, TKey> {
    return groups(this, ...keys);
  }

  index<TKey>(
    this: T[],
    ...keys: Accessor<T, TKey>[]
  ): Map<TKey, T> {
    return index(this, ...keys);
  }

  indexes<TKey>(
    this: T[],
    ...keys: Accessor<T, TKey>[]
  ): NestedArray<T, TKey> {
    return indexes(this, ...keys);
  }

  rollup<TKey, TReduce>(
    this: T[],
    reduce: (value: T[]) => TReduce,
    ...keys: ((value: T) => TKey)[]
  ): Map<TKey, TReduce> {
    return rollup(this, reduce, ...keys);
  }

  rollups<TKey, TReduce>(
    this: T[],
    reduce: Reducer<T, TReduce>,
    ...keys: Accessor<T, TKey>[]
  ): [TKey, TReduce][] {
    return rollups(this, reduce, ...keys);
  }

  count(this: T[]): number {
    return count(this);
  }

  least<T>(
    this: T[],
    comparator?: (a: T, b: T) => number,
  ): T | undefined {
    return comparator ? least(this, comparator) : least(this);
  }

  leastIndex(
    this: T[],
    comparator?: (a: T, b: T) => number,
  ): number | undefined {
    return comparator ? leastIndex(this, comparator) : leastIndex(this);
  }

  greatest<T>(
    this: T[],
    comparator?: (a: T, b: T) => number,
  ): T | undefined {
    return comparator ? greatest(this, comparator) : greatest(this);
  }

  /** isto é um teste */

  greatestIndex(
    this: T[],
    comparator?: (a: T, b: T) => number,
  ): number | undefined {
    return comparator ? greatestIndex(this, comparator) : greatestIndex(this);
  }

  cross<S, U>(
    this: T[],
    b: Iterable<S>,
    reducer?: (a: T, b: S) => U,
  ): Array<[T, S]> | U[] {
    return reducer ? cross(this, b, reducer) : cross(this, b);
  }

  pairs<U>(
    this: T[],
    reducer?: (a: T, b: T) => U,
  ): Array<[T, T]> | U[] {
    return reducer ? pairs(this, reducer) : pairs(this);
  }

  permute(
    this: { [key: number]: T },
    keys: ArrayLike<number>,
  ): T[] {
    return permute(this, keys);
  }

  permuteObject<K extends keyof T>(
    this: T[],
    keys: ArrayLike<K>,
  ): Array<T[K]>[] {
    return this.map((d) => permute(d, keys));
  }
  shuffle<T>(this: T[], lo?: number, hi?: number): T[] {
    return shuffle(this, lo, hi);
  }
  transpose(this: ArrayLike<ArrayLike<T>>): T[][] {
    return transpose(this);
  }
  zip(...arrays: Array<ArrayLike<T>>): T[][] {
    return zip(this, ...arrays);
  }
  union(this: T[], ...arrays: Array<T[]>): T[] {
    return Array.from(union(this, ...arrays));
  }
  difference(this: Array<T>, ...arrays: Array<T[]>): T[] {
    return Array.from(difference(this, ...arrays));
  }
  intersection<T>(this: Array<T>, ...arrays: Array<T[]>): T[] {
    return Array.from(intersection(this, ...arrays));
  }
  subset(this: Array<T>, array: Array<T>): boolean {
    return subset(this, array);
  }
  superset(this: Array<T>, array: Array<T>): boolean {
    return superset(this, array);
  }
  disjoint(this: Array<T>, array: Array<T>): boolean {
    return disjoint(this, array);
  }

  // other helper methods

  item(n: number) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += this.length;
    if (n < 0 || n >= this.length) return undefined;
    return this[n];
  }

  by<Z extends keyof T>(field: Z): T[Z][] {
    return this.map((val) => val[field]) as T[Z][];
  }
  after(n: number): T[] {
    if (n > this.length) throw Error("Index must be less or equal than length");
    return this.slice(n + 1, this.length);
  }
  before(n: number): T[] {
    return this.slice(0, n);
  }
  between(start: number, end: number): T[] {
    if (end > this.length) throw Error("End must be less or equal than length");
    //const n = end > this.length ? this.length : end;
    return this.slice(start, end + 1);
  }
  head(n = 10): T[] {
    return n < 0 ? this.slice(this.length + n, this.length) : this.slice(0, n);
  }

  leftJoin(array: T[]): T[] {
    return this;
  }

  unique() {
    return this.filter((d, i, a) => a.indexOf(d) === i);
  }

  cast<U extends T[keyof T]>(def: { [key in keyof T]: Accessor<U, U> }) {
    return this.map((obj, i, a) => {
      const keys = Object.keys(def) as (keyof T)[];
      keys.map((key) => {
        obj[key] = def[key](obj[key] as U, i, []) as T[keyof T];
      });
      return obj;
    });
  }

  //pivot

  drop(field: keyof T) {
    return this.map(({ [field]: dropedField, ...rest }: T) => ({ ...rest }));
  }

  rename(oldField: keyof T, newField: string) {
    return this.map(({ [oldField]: renamedFiled, ...rest }: T) => ({
      [newField]: renamedFiled,
      ...rest,
    }));
  }
}

export function d3a<T>(arrayLike: ArrayLike<T> | T[]) {
  return new D3Array<T>(arrayLike);
}

/* export function toInt(value: string) {
  return parseInt(value, 10);
}

export const toFloat = parseFloat;

export function toDate(value: string) {
  return new Date(value);
} */

export function toBool(value: string | number | boolean, def: {
  True: string | number | boolean;
  False: string | number | boolean;
  Undefined?: string | number | boolean;
}) {
  if (!def) def = { True: "true", False: "false" };
  if (value === def.True) return true;
  else if (value === def.False) return false;
  else if (value === def.Undefined) return undefined;
  return null;
}

export function autoType(
  object: Record<string, string>,
) {
  const newObject: Record<string, string | null | boolean | number | Date> = {};
  Object.keys(object).forEach((key) => {
    var value: string | null | boolean | number | Date = object[key],
      number,
      m;
    if (typeof value === "string") value = value.trim();
    if (!value) value = null;
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "NaN") value = NaN;
    else if (!isNaN(number = +value)) value = number;
    else if (
      m = (value as string).match(
        /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/,
      )
    ) {
      if (
        (new Date("2019-01-01T00:00").getHours() ||
          new Date("2019-07-01T00:00").getHours()) && !!m[4] && !m[7]
      ) {
        value = value.replace(/-/g, "/").replace(/T/, " ");
      }
      value = new Date(value);
    }
    //else continue;
    newObject[key] = value;
  });
  return newObject;
}
