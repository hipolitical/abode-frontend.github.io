const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://20.41.44.16:8080',
      changeOrigin: true,
    })
  );
};