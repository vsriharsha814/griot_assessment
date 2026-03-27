const toNumber = (value) => Number(value);

const getCurrentHighestBid = (product) => {
  const bidHistory = Array.isArray(product?.bidHistory) ? product.bidHistory : [];
  if (bidHistory.length === 0) {
    return toNumber(product?.startingBid) || 0;
  }

  return bidHistory.reduce((max, bid) => {
    const amount = toNumber(bid.bidAmount);
    if (Number.isNaN(amount)) {
      return max;
    }
    return amount > max ? amount : max;
  }, toNumber(product?.startingBid) || 0);
};

const getMinimumAllowedBid = (product) => {
  const highestBid = getCurrentHighestBid(product);
  const minIncrement = toNumber(product?.minBidAmount) || 0;
  return highestBid + minIncrement;
};

const validateBid = (product, rawBidAmount) => {
  const bidAmount = toNumber(rawBidAmount);
  if (Number.isNaN(bidAmount)) {
    return {
      isValid: false,
      message: "Bid amount must be a valid number",
    };
  }

  const minimumAllowedBid = getMinimumAllowedBid(product);
  if (bidAmount < minimumAllowedBid) {
    return {
      isValid: false,
      message: `Bid amount must be at least ${minimumAllowedBid}`,
    };
  }

  return { isValid: true };
};

const formatBidHistory = (product) => {
  const bidHistory = Array.isArray(product?.bidHistory) ? product.bidHistory : [];
  const bids = [...bidHistory]
    .map((bid) => ({
      bidderName: bid.bidderName,
      bidAmount: toNumber(bid.bidAmount) || 0,
      bidTimestamp: bid.bidTimestamp,
    }))
    .sort((a, b) => new Date(b.bidTimestamp) - new Date(a.bidTimestamp));

  const currentHighestBid = getCurrentHighestBid(product);
  const minimumNextBid = getMinimumAllowedBid(product);

  return {
    productId: product?._id,
    totalBids: bids.length,
    currentHighestBid,
    minimumNextBid,
    bids,
  };
};

module.exports = {
  getCurrentHighestBid,
  getMinimumAllowedBid,
  validateBid,
  formatBidHistory,
};
