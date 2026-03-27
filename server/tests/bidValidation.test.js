const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getCurrentHighestBid,
  getMinimumAllowedBid,
  validateBid,
} = require("../utils/bidValidation");

test("getCurrentHighestBid uses startingBid when no history", () => {
  const product = { startingBid: 100, bidHistory: [] };
  assert.equal(getCurrentHighestBid(product), 100);
});

test("getCurrentHighestBid returns max history bid", () => {
  const product = {
    startingBid: 100,
    bidHistory: [{ bidAmount: 105 }, { bidAmount: 130 }, { bidAmount: 120 }],
  };
  assert.equal(getCurrentHighestBid(product), 130);
});

test("getMinimumAllowedBid adds min increment to highest bid", () => {
  const product = {
    startingBid: 100,
    minBidAmount: 10,
    bidHistory: [{ bidAmount: 120 }],
  };
  assert.equal(getMinimumAllowedBid(product), 130);
});

test("validateBid rejects non-numeric values", () => {
  const product = { startingBid: 100, minBidAmount: 10, bidHistory: [] };
  const result = validateBid(product, "abc");
  assert.equal(result.isValid, false);
});

test("validateBid rejects amounts below minimum", () => {
  const product = {
    startingBid: 100,
    minBidAmount: 20,
    bidHistory: [{ bidAmount: 150 }],
  };
  const result = validateBid(product, 160);
  assert.equal(result.isValid, false);
});

test("validateBid accepts amounts at or above minimum", () => {
  const product = {
    startingBid: 100,
    minBidAmount: 20,
    bidHistory: [{ bidAmount: 150 }],
  };
  const result = validateBid(product, 170);
  assert.equal(result.isValid, true);
});
