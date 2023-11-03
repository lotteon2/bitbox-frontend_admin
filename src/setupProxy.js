// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function proxy(app) {
	app.use(
		createProxyMiddleware('https://bitbox.kro.kr/authentication-service/auth/admin', {
			target: 'https://bitbox.kro.kr',
			changeOrigin: true,
		}),
	);
};
