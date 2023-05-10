const { createProxyMiddleware } = require('http-proxy-middleware');

const API_TARGET_DEV = 'http://localhost:7077';
const API_TARGET_PROD = 'https://apisuper.thedigitalliciouss.com/api';

module.exports = function(app) {
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    // Development proxy configuration
    console.log("does this even work?");
    app.use(
      '/api',
      createProxyMiddleware({
        target: API_TARGET_DEV,
        changeOrigin: true,
      })
    );
  } else {
    // Production proxy configuration
    app.use(
      '/api',
      createProxyMiddleware({
        target: API_TARGET_PROD,
        changeOrigin: true,
      })
    );
  }
};