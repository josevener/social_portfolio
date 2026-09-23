import assert from "node:assert/strict";
import test from "node:test";

import {
  getNextGalleryIndex,
  getPreviousGalleryIndex,
} from "../lib/gallery-navigation.mjs";

test("gallery navigation wraps from the first image to the last image", () => {
  assert.equal(getPreviousGalleryIndex(0, 3), 2);
});

test("gallery navigation wraps from the last image to the first image", () => {
  assert.equal(getNextGalleryIndex(2, 3), 0);
});

test("gallery navigation keeps a single-image gallery on its only image", () => {
  assert.equal(getPreviousGalleryIndex(0, 1), 0);
  assert.equal(getNextGalleryIndex(0, 1), 0);
});
