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
} from "d3-array";
//} from "https://cdn.skypack.dev/d3-array@^2.4.0";
//export * from "d3-array"

type Accessor<T, U> = (
  datum: T,
  index: number,
  array: Iterable<T>,
) => U | undefined | null;
type Reducer<T, U> = (value: T[]) => U;

export class D3Array<T> extends Array<T> implements Array<T> {
  constructor(...array: T[]) {
    super(...array);
  }

  // d3-array methods

  max(): T | undefined {
    //@ts-ignore .
    return max(this);
  }

  min(): T | undefined {
    //@ts-ignore .
    return min(this);
  }

  maxIndex(this: D3Array<T>): number {
    return maxIndex(this);
  }

  minIndex(this: D3Array<T>): number {
    return minIndex(this);
  }

  extent<T extends number>(
    this: D3Array<T>,
  ): [T, T] | [undefined, undefined] {
    return extent(this);
  }

  mean(this: D3Array<number | undefined | null>): number | undefined {
    return mean(this);
  }

  median(this: D3Array<number | undefined | null>): number | undefined {
    return median(this);
  }

  quantile(
    this: D3Array<number | undefined | null>,
    p: number,
  ): number | undefined {
    return quantile(this, p);
  }

  sum(this: D3Array<number | undefined | null>): number {
    return sum(this);
  }

  deviation(this: D3Array<number | undefined | null>): number | undefined {
    return deviation(this);
  }

  variance(this: D3Array<number | undefined | null>): number | undefined {
    return variance(this);
  }

  group<TKey>(
    ...keys: Accessor<T, TKey>[]
  ): Map<TKey, T[]> {
    return group(this, ...keys);
  }

  groups<TKey>(
    ...keys: Accessor<T, TKey>[]
  ) {
    return d3a(groups(this, ...keys));
  }

  index<TKey>(
    ...keys: Accessor<T, TKey>[]
  ): Map<TKey, T> {
    return index(this, ...keys);
  }

  indexes<TKey>(
    ...keys: Accessor<T, TKey>[]
  ) {
    return d3a(indexes(this, ...keys));
  }

  rollup<TKey, TReduce>(
    reduce: (value: T[]) => TReduce,
    ...keys: ((value: T) => TKey)[]
  ): Map<TKey, TReduce> {
    return rollup(this, reduce, ...keys);
  }

  rollups<TKey, TReduce>(
    reduce: Reducer<T, TReduce>,
    ...keys: Accessor<T, TKey>[]
  ) {
    return d3a(rollups(this, reduce, ...keys));
  }

  count(): number {
    return count(this);
  }

  least<T>(
    this: D3Array<T>,
    comparator?: (a: T, b: T) => number,
  ): T | undefined {
    return comparator ? least(this, comparator) : least(this);
  }

  leastIndex(
    comparator?: (a: T, b: T) => number,
  ): number | undefined {
    return comparator ? leastIndex(this, comparator) : leastIndex(this);
  }

  greatest<T>(
    this: D3Array<T>,
    comparator?: (a: T, b: T) => number,
  ) {
    return comparator ? greatest(this, comparator) : greatest(this);
  }

  greatestIndex(
    comparator?: (a: T, b: T) => number,
  ): number | undefined {
    return comparator ? greatestIndex(this, comparator) : greatestIndex(this);
  }

  cross<S, U>(
    b: Iterable<S>,
    reducer?: (a: T, b: S) => U,
  ): D3Array<[T, S]> | D3Array<U> {
    return reducer ? d3a(cross(this, b, reducer)) : d3a(cross(this, b));
  }

  pairs<U>(
    reducer?: (a: T, b: T) => U,
  ): D3Array<[T, T]> | D3Array<U> {
    return reducer ? d3a(pairs(this, reducer)) : d3a(pairs(this));
  }

  permute(
    this: D3Array<T>,
    keys: ArrayLike<number>,
  ) {
    return d3a(permute(this, keys));
  }

  arrange<K extends keyof T>(
    keys: ArrayLike<K>,
  ) {
    return d3a(this.map((d) => d3a(permute(d, keys))));
  }
  shuffle(lo?: number, hi?: number) {
    return d3a(shuffle(this, lo, hi));
  }
  transpose(this: D3Array<ArrayLike<T>>) {
    return d3a(transpose(this));
  }
  zip(...arrays: D3Array<ArrayLike<T>>) {
    return d3a(zip(this, ...arrays));
  }
  union(...arrays: T[][]) {
    return d3a(union(this, ...arrays));
  }
  difference(...arrays: T[][]) {
    return d3a(difference(this, ...arrays));
  }
  intersection(...arrays: T[][]) {
    return d3a(intersection(this, ...arrays));
  }
  subset(array: Array<T>): boolean {
    return subset(this, array);
  }
  superset(array: Array<T>): boolean {
    return superset(this, array);
  }
  disjoint(array: Array<T>): boolean {
    return disjoint(this, array);
  }

  // other helper methods

  item(n: number) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += this.length;
    if (n < 0 || n >= this.length) return undefined;
    return this[n];
  }

  by<Z extends keyof T>(field: Z): D3Array<T[Z]> {
    return d3a(this.map((val) => val[field]));
  }

  // eslint-disable-next-line ban-types
  to(func: Function) {
    return func(this);
  }

  unique() {
    return d3a(this.filter((d, i, a) => a.indexOf(d) === i));
  }

  cast<U>(
    def: { [key in keyof T]: Accessor<T, U> },
  ) {
    return d3a(this.map((obj, i, a) => {
      const keys = Object.keys(def) as (keyof T)[];
      keys.map((key) => {
        const func = def[key];
        //@ts-ignore .
        obj[key] = func(obj[key]) as U;
      });
      return obj;
    }));
  }

  drop(field: keyof T) {
    return d3a(
      this.map(({ [field]: dropedField, ...rest }: T) => ({ ...rest })),
    );
  }

  rename(oldField: keyof T, newField: string) {
    return d3a(this.map(({ [oldField]: renamedFiled, ...rest }: T) => ({
      [newField]: renamedFiled,
      ...rest,
    })));
  }

  insert<U>(array: U[], field: string | keyof T, overwrite = false) {
    if (array.length !== this.length) {
      throw new Error("The array must have the same lentgh");
    }
    return d3a(this.map((d, i) => {
      //@ts-ignore .
      if (d[field] && overwrite === false) {
        throw new Error("The property already exist");
      }
      //@ts-ignore .
      d[field] = array[i];
      return d;
    }));
  }

  pivot_longer<K extends keyof T>(cols: K[]) {
    const longer = cols
      .map((col) =>
        this.map((d) => {
          var keysToKeep = Object.keys(d).filter((k) =>
            !cols.some((c) => c == k)
          );
          var keep = keysToKeep.reduce(
            //@ts-ignore .
            (obj, cur) => ({ [cur]: (d)[cur], ...obj }),
            {},
          );
          const val = d[col];
          type Col = typeof val;
          return ({ ...keep, key: col, value: d[col] } as unknown) as
            & Pick<T, Exclude<keyof T, K>>
            & {
              key: string;
              value: Col;
            };
        })
      )
      .reduce((acc, val) => acc.concat(val), []);
    return d3a(longer);
  }

  pivot_wider<K extends keyof T>(key: K, value: K) {
    const keys = this.by(key).unique();
    const countId = Array(keys.length).fill(0);
    const res = this.map(({ [(key)]: tKey, [value]: tValue, ...rest }) => {
      let xKey = tKey as unknown as string;
      xKey = xKey.toString();
      countId[keys.indexOf(tKey)]++;
      return {
        ...rest,
        [xKey]: tValue,
        idD3Array: countId[keys.indexOf(tKey)],
      };
    });
    return d3a(res).groups((d) => d.idD3Array).map(([idD3Array, values]) => {
      //@ts-ignore .
      return values.reduce((prev, cur) => ({ ...prev, ...cur }), {});
    }).map(({ idD3Array, ...rest }) => ({ ...rest }));
  }
}

//Public API

export function d3a<T>(iterable: ArrayLike<T> | T[] | Iterable<T>) {
  const array = Array.isArray(iterable) ? iterable : Array.from(iterable);
  if (array.length === 1) {
    const d3Array = new D3Array() as unknown as D3Array<T>;
    d3Array.push(array[0]);
    return d3Array;
  } else {
    return new D3Array(...array);
  }
}

// Utils

export function toInt(value: string) {
  return parseInt(value, 10);
}

export const toFloat = parseFloat;

export function toDate(value: string) {
  return new Date(value);
}

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

export function fromDataframe<
  T,
  Z extends Record<string, unknown[]>,
  K extends keyof Z,
>(
  dataframe: Z,
) {
  const lengths: number[] = [];
  const columns: unknown[][] = [];
  const keys = Object.keys(dataframe) as K[];
  keys.forEach((key) => {
    lengths.push(dataframe[key].length);
    columns.push(dataframe[key]);
  });
  if (!lengths.every((v) => v === lengths[0])) {
    throw new Error("The length of the columns are not equal");
  }
  return d3a(
    Array(lengths[0]).fill({}).map((obj, i) => {
      const data = {} as { [key in K]: unknown };
      keys.forEach((key, k) => {
        data[key] = columns[k][i];
      });
      return data;
    }),
  );
}

export function toDataframe<T>(data: Array<T>) {
  var dataframe: Record<string, unknown[]> = {};
  data.forEach((record) => {
    Object.keys(record).forEach((key) => {
      if (!dataframe[key]) dataframe[key] = [];
      const typedKey = key as keyof T;
      dataframe[key].push(record[typedKey]);
    });
  });
  return dataframe;
}

/* after(n: number): D3Array<T> {
    if (n > this.length) throw Error("Index must be less or equal than length");
    return d3a(this.slice(n + 1, this.length));
  }
  before(n: number): D3Array<T> {
    return d3a(this.slice(0, n));
  }
  between(start: number, end: number): D3Array<T> {
    if (end > this.length) throw Error("End must be less or equal than length");
    //const n = end > this.length ? this.length : end;
    return d3a(this.slice(start, end + 1));
  }
  head(n = 10) {
    return n < 0
      ? d3a(this.slice(this.length + n, this.length))
      : d3a(this.slice(0, n));
  } 

  leftJoin(array: T[]): D3Array<T> {
    return this;
  }*/
