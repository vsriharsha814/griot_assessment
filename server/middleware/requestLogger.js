/**
 * One line per request; production uses JSON for log aggregators.
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const skipLog = req.path === "/health" || req.path.startsWith("/health/");
  res.on("finish", () => {
    if (skipLog) return;
    const durationMs = Date.now() - start;
    if (process.env.NODE_ENV === "production") {
      console.log(
        JSON.stringify({
          ts: new Date().toISOString(),
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          ms: durationMs,
        })
      );
    } else {
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`);
    }
  });
  next();
};

module.exports = requestLogger;
