const test = require("node:test");
const assert = require("node:assert/strict");
const { isOwner } = require("../utils/productOwnership");

test("isOwner returns true for same ids", () => {
  assert.equal(isOwner("507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011"), true);
});

test("isOwner handles object-like ids", () => {
  const ownerId = { toString: () => "507f1f77bcf86cd799439011" };
  assert.equal(isOwner(ownerId, "507f1f77bcf86cd799439011"), true);
});

test("isOwner returns false for different ids", () => {
  assert.equal(isOwner("507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"), false);
});
