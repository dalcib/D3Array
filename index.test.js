// @deno-types="./d3-array.d.ts"
import { expect } from "https://deno.land/x/expect/mod.ts";
import {
  test,
  group,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "https://deno.land/x/hooked/mod.ts";
import {
  ascending,
  descending,
} from "https://cdn.skypack.dev/d3-array@^2.4.0";
//} from "./node_modules/d3-array/src/index.js";
import { D3Array, d3a } from "./index.ts";

const data = [
  { name: "jim", amount: "34.0", date: "11/12/2015" },
  { name: "carl", amount: "120.11", date: "11/12/2015" },
  { name: "stacy", amount: "12.01", date: "01/04/2016" },
  { name: "stacy", amount: "34.05", date: "01/04/2016" },
];
const d3Array = new D3Array(data);

test("should create an array from array", () => {
  expect(d3Array).toEqual(d3Array);
});

test("should create an arroy from Map", () => {
  const map = new Map().set("a", 1).set("b", 2).set("c", 10).set("d", 200);
  expect(new D3Array(map)).toEqual([["a", 1], ["b", 2], ["c", 10], ["d", 200]]);
});

test("should chain a map fn", () => {
  expect(d3Array.map((d) => d.name)).toEqual(["jim", "carl", "stacy", "stacy"]);
});

test("should by", () => {
  expect(d3Array.by("name")).toEqual(["jim", "carl", "stacy", "stacy"]);
});

test("should emit max and min", () => {
  const testMinMax = new D3Array([3, 2, 1, 1, 6, 2, 4]);
  expect(d3Array.by("name").max()).toEqual("stacy");
  expect(d3Array.by("name").min()).toEqual("carl");
  expect(testMinMax.min()).toEqual(1);
  expect(testMinMax.max()).toEqual(6);
  expect(testMinMax.maxIndex()).toEqual(4);
  expect(testMinMax.minIndex()).toEqual(2);
  expect(testMinMax.extent()).toEqual([1, 6]);
  expect(testMinMax.mean()).toEqual(2.7142857142857144);
  expect(testMinMax.median()).toEqual(2);
  expect(testMinMax.quantile(0.25)).toEqual(1.5);
});

test("should group ", () => {
  expect(d3Array.groups((d) => d.name)[1]).toEqual(
    ["carl", [{ name: "carl", amount: "120.11", date: "11/12/2015" }]],
  );
  const grouped = d3Array.group((d) => d.name);
  expect(grouped.has("jim")).toBeTruthy();
  expect(grouped.get("jim")).toEqual(
    [{ name: "jim", amount: "34.0", date: "11/12/2015" }],
  );
  expect(grouped.get("stacy").length).toEqual(2);
});

test("should index", () => {
  expect(d3Array.indexes((d) => d.amount)[1]).toEqual(
    ["120.11", { name: "carl", amount: "120.11", date: "11/12/2015" }],
  );
  //expect(d3Array.index((d) => d.name)).toThrow('duplicate key')
  const indexed = d3Array.index((d) => d.amount);
  expect(indexed.has("120.11")).toBeTruthy();
  expect(indexed.get("34.0")).toEqual(
    { name: "jim", amount: "34.0", date: "11/12/2015" },
  );
});

test("should rollup ", () => {
  expect(d3Array.rollups((v) => v.length, (d) => d.name)[1]).toEqual(
    ["carl", 1],
  );
  const rolluped = d3Array.rollup((v) => v.length, (d) => d.name);
  expect(rolluped.has("jim")).toBeTruthy();
  expect(rolluped.get("stacy")).toEqual(
    2,
  );
});

test("should count", () => {
  expect(d3Array.by("amount").count()).toEqual(4);
  expect(d3Array.by("date").count()).toEqual(0);
});

test("should search with least, greatest ams Index", () => {
  expect(d3Array.by("name").least()).toEqual("carl");
  expect(d3Array.by("name").leastIndex()).toEqual(1);
  expect(d3Array.by("name").greatest()).toEqual("stacy");
  expect(d3Array.by("name").greatestIndex()).toEqual(2);
  expect(d3Array.by("name").least(ascending)).toEqual("carl");
  expect(d3Array.by("name").least(descending)).toEqual("stacy");
});

test("should cross ", () => {
  expect(new D3Array([1, 2]).cross(["x", "y"], (a, b) => `${a}/${b}`)).toEqual(
    ["1/x", "1/y", "2/x", "2/y"],
  );
});

test("should pairs", () => {
  expect(new D3Array([1, 2, 3, 4]).pairs()).toEqual([[1, 2], [2, 3], [3, 4]]);
});

/* test('should range', ()=>{
  expect(D3Array.range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) 
  expect(D3Array.range(5, 10)).toEqual([5, 6, 7, 8, 9]) 
  expect(D3Array.range(10,20,2)).toEqual([10, 12, 14, 16, 18]) 
}) */

test("should permute", () => {
  expect(new D3Array(["a", "b", "c", "d", "e"]).permute([1, 2, 0, 4, 3]))
    .toEqual(["b", "c", "a", "e", "d"]);
  const arrayObject = new D3Array([
    { yield: 27, variety: "Manchuria", year: 1931, site: "University Farm" },
    { yield: 17, variety: "Other", year: 1931, site: "University House" },
  ]);
  expect(arrayObject.permuteObject(["site", "variety", "yield"])).toEqual([
    ["University Farm", "Manchuria", 27],
    ["University House", "Other", 17],
  ]);
});

test("should shuffle", () => {
  expect((new D3Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).shuffle().length).toBe(
    10,
  );
  expect((new D3Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).shuffle(5).length).toBe(
    10,
  );
  expect((new D3Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).shuffle(0, 5).length)
    .toBe(10);
});

test("should perform sets", () => {
  expect((new D3Array([0, 1, 2, 0])).difference([1])).toEqual([0, 2]);
  expect((new D3Array([0, 2, 1, 0])).union([1, 3])).toEqual([0, 2, 1, 3]);
  expect((new D3Array([0, 2, 1, 0])).intersection([1, 3])).toEqual([1]);
  expect((new D3Array([0, 2, 1, 3, 0])).superset([1, 3])).toEqual(true);
  expect((new D3Array([1, 3])).subset([0, 2, 1, 3, 0])).toEqual(true);
  expect((new D3Array([1, 3])).disjoint([2, 4])).toEqual(true);
});

test("should perform sets", () => {
  expect(d3a(new Set([1, 2, 3]))).toEqual([1, 2, 3]);
  expect(d3a(new Set([1, 2, 3]))).toHaveProperty("min");
});
