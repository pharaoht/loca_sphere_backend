const logger = require('../logger/logger.middleware');

function errorHandler(err, req, res, next) {
  // Log the full error
  logger.error({
    message: err.message,
    name: err.name,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
  });

  // Handle known cases
  if (err.name === 'PayloadTooLargeError' || err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'File too large' });
  }

  // Default fallback
  res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;
