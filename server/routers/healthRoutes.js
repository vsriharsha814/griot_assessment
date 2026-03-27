const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

/** Liveness: process is up (load balancers / k8s). */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "property-rent-sale-api",
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

/** Readiness: MongoDB connection is usable. */
router.get("/ready", (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  if (ready) {
    return res.status(200).json({
      status: "ready",
      db: "connected",
    });
  }
  return res.status(503).json({
    status: "not_ready",
    db: "disconnected",
    readyState: mongoose.connection.readyState,
  });
});

module.exports = router;
