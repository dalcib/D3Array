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
/*  import {
  ticks,
  tickIncrement,
  tickStep,
  range,
  ascending,
  descending,
} from "https://cdn.skypack.dev/d3-array@^2.4.0";  */

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
  /*   static ascending = ascending;
  static descending = descending;
  static range(start: number, stop: number, step?: number): number[] {
    return step
      ? range(start, stop, step)
      : stop
      ? range(start, stop)
      : range(start);
  } */

  constructor(arrayLike: ArrayLike<T> | Iterable<T>) {
    const array = Array.from(arrayLike);
    super(...array);
  }

  by<Z extends keyof T>(field: Z): T[Z][] {
    return this.map((val) => val[field]) as T[Z][];
  }

  max(this: Iterable<string>): string | undefined;
  max<T extends number>(this: Iterable<T>): T | undefined {
    return max(this);
  }

  min(this: Iterable<string>): string | undefined;
  min<T extends number>(this: Iterable<T>): T | undefined {
    return min(this);
  }

  maxIndex<T>(this: Iterable<T>): number {
    return maxIndex(this);
  }

  minIndex<T>(this: Iterable<T>): number {
    return minIndex(this);
  }

  extent(
    this: Iterable<string>,
  ): [string, string] | [undefined, undefined];
  extent<T extends number>(
    this: Iterable<T>,
  ): [T, T] | [undefined, undefined] {
    return extent(this);
  }

  mean<T extends number>(
    this: Iterable<T | undefined | null>,
  ): number | undefined {
    return mean(this);
  }

  median<T extends number>(
    this: Iterable<T | undefined | null>,
  ): number | undefined {
    return median(this);
  }

  quantile<T extends number>(
    this: Iterable<T | undefined | null>,
    p: number,
  ): number | undefined {
    return quantile(this, p);
  }

  sum<T extends number>(
    this: Iterable<T | undefined | null>,
  ): number {
    return sum(this);
  }

  deviation<T extends number>(
    this: Iterable<T | undefined | null>,
  ): number | undefined {
    return deviation(this);
  }

  variance<T extends number>(
    this: Iterable<T | undefined | null>,
  ): number | undefined {
    return variance(this);
  }

  group<TKey>(
    this: Iterable<T>,
    ...keys: Accessor<T, TKey>[]
  ): Map<TKey, T[]> {
    return group(this, ...keys);
  }

  groups<T, TKey>(
    this: Iterable<T>,
    ...keys: Accessor<T, TKey>[]
  ): NestedArray<T, TKey> {
    return groups(this, ...keys);
  }

  index<TKey>(
    this: Iterable<T>,
    ...keys: Accessor<T, TKey>[]
  ): Map<TKey, T> {
    return index(this, ...keys);
  }

  indexes<TKey>(
    this: Iterable<T>,
    ...keys: Accessor<T, TKey>[]
  ): NestedArray<T, TKey> {
    return indexes(this, ...keys);
  }

  rollup<TKey, TReduce>(
    this: Iterable<T>,
    reduce: (value: T[]) => TReduce,
    ...keys: ((value: T) => TKey)[]
  ): Map<TKey, TReduce> {
    return rollup(this, reduce, ...keys);
  }

  rollups<TKey, TReduce>(
    this: Iterable<T>,
    reduce: Reducer<T, TReduce>,
    ...keys: Accessor<T, TKey>[]
  ): [TKey, TReduce][] {
    return rollups(this, reduce, ...keys);
  }

  count(this: Iterable<T>): number {
    return count(this);
  }

  least<T>(
    this: Iterable<T>,
    comparator?: (a: T, b: T) => number,
  ): T | undefined {
    return comparator ? least(this, comparator) : least(this);
  }

  leastIndex(
    this: Iterable<T>,
    comparator?: (a: T, b: T) => number,
  ): number | undefined {
    return comparator ? leastIndex(this, comparator) : leastIndex(this);
  }

  greatest<T>(
    this: Iterable<T>,
    comparator?: (a: T, b: T) => number,
  ): T | undefined {
    return comparator ? greatest(this, comparator) : greatest(this);
  }

  greatestIndex(
    this: Iterable<T>,
    comparator?: (a: T, b: T) => number,
  ): number | undefined {
    return comparator ? greatestIndex(this, comparator) : greatestIndex(this);
  }

  cross<S, U>(
    this: Iterable<T>,
    b: Iterable<S>,
    reducer?: (a: T, b: S) => U,
  ): Array<[T, S]> | U[] {
    return reducer ? cross(this, b, reducer) : cross(this, b);
  }

  pairs<U>(
    this: Iterable<T>,
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
}

export function d3a<T>(arrayLike: ArrayLike<T> | Iterable<T>) {
  return new D3Array<T>(arrayLike);
}
