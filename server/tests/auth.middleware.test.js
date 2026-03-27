const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

const createRes = () => {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
};

test("authenticateToken rejects missing token", () => {
  const req = { headers: {} };
  const res = createRes();
  let nextCalled = false;

  authMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { error: "Access token required" });
});

test("authenticateToken accepts valid bearer token", () => {
  const token = jwt.sign(
    { userId: "507f1f77bcf86cd799439011", role: "seller" },
    process.env.JWT_SECRET
  );
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = createRes();
  let nextCalled = false;

  authMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user._id, "507f1f77bcf86cd799439011");
  assert.equal(req.user.role, "seller");
});
