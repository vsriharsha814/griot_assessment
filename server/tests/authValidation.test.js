const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeRole } = require("../utils/authValidation");

test("normalizeRole defaults to buyer when missing", () => {
  assert.equal(normalizeRole(undefined), "buyer");
});

test("normalizeRole normalizes valid role casing", () => {
  assert.equal(normalizeRole("SeLlEr"), "seller");
});

test("normalizeRole rejects unsupported role", () => {
  assert.equal(normalizeRole("admin"), null);
});
