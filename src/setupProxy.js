const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		createProxyMiddleware('/authentication-service', {
			// 백엔드 주소
			target: 'https://bitbox.kro.kr',
			changeOrigin: true,
		}),
	);
};
