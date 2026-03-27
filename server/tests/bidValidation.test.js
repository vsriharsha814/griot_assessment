const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getCurrentHighestBid,
  getMinimumAllowedBid,
  validateBid,
  formatBidHistory,
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

test("formatBidHistory returns sorted bids and summary fields", () => {
  const product = {
    _id: "product-1",
    startingBid: 100,
    minBidAmount: 20,
    bidHistory: [
      { bidderName: "Alice", bidAmount: 120, bidTimestamp: "2026-01-02T00:00:00.000Z" },
      { bidderName: "Bob", bidAmount: 150, bidTimestamp: "2026-01-03T00:00:00.000Z" },
    ],
  };

  const result = formatBidHistory(product);
  assert.equal(result.productId, "product-1");
  assert.equal(result.totalBids, 2);
  assert.equal(result.currentHighestBid, 150);
  assert.equal(result.minimumNextBid, 170);
  assert.equal(result.bids[0].bidderName, "Bob");
});
