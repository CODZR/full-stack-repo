const path = require('path');
const { getEnvSettingsByMode } = require('./env.ts');

module.exports = {
	output: 'export',
	images: {
		unoptimized: true
	},
	swcMinify: true,
	pageExtensions: ['page.js', 'page.tsx', 'page.ts'],
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	},
	webpack: (config, { webpack }) => {
		const NODE_ENV = process.env.NODE_ENV || 'development';
		const envSettings = getEnvSettingsByMode(NODE_ENV);
		const safeEnv = Object.assign(
			Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith('VITE_'))),
			envSettings
		);

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
			}),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(safeEnv) // 这会将 env 变量传入代码中
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
