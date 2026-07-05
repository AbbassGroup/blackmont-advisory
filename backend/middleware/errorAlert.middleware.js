const { notifyError } = require('../utils/errorNotifier');

function getClientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.length) return xf.split(',')[0].trim();
  return req.ip;
}

function errorAlert(req, res, next) {
  res.on('finish', () => {
    if (res.statusCode < 500) return;

    notifyError({
      source: 'API 5xx',
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      error: res.locals.error,
      ip: getClientIp(req),
      body: req.body,
    });
  });

  next();
}


function errorHandler(err, req, res, next) {
  res.locals.error = err;
  console.error('Unhandled route error:', err && err.stack ? err.stack : err);

  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { errorAlert, errorHandler };
