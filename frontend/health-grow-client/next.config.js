const path = require('path');

module.exports = {
	swcMinify: true,
	pageExtensions: ['page.js', 'page.tsx', 'page.ts'],
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, 'src'),
			'@comp': path.resolve(__dirname, 'src/components'),
			'@css': path.resolve(__dirname, 'src/assets/css'),
			'@img': path.resolve(__dirname, 'src/assets/img')
		};
		config.plugins.push(
			new webpack.ProvidePlugin({
				React: 'react'
			})
		);
		config.module.rules.push({
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		});
		config.module.rules.push({
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'less-loader']
		});

		return config;
	}
};
