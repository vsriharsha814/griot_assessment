const ALLOWED_ROLES = ["buyer", "seller"];

const normalizeRole = (role) => {
  if (!role) return "buyer";
  const normalized = String(role).trim().toLowerCase();
  return ALLOWED_ROLES.includes(normalized) ? normalized : null;
};

module.exports = {
  ALLOWED_ROLES,
  normalizeRole,
};
