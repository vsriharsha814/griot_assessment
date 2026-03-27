const isOwner = (productOwnerId, requestUserId) =>
  String(productOwnerId) === String(requestUserId);

module.exports = {
  isOwner,
};
