const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`, err.stack);
  if (err.config) console.error("Axios Config URL:", err.config.url);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = errorHandler;
