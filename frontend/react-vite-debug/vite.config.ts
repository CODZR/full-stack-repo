import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';

import { getEnvSettingsByMode } from './src/utils/vite';

import { vitePlugins } from './config/vite-plugin';

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	// 加载不同生产环境下的配置
	const NODE_ENV = mode || 'development';

	// let base = mode === 'beta' ? '/new/' : '/';
	let base = '/';

	const envSettings = getEnvSettingsByMode(NODE_ENV);
	process.env = Object.assign(process.env, envSettings);

	return {
		base,
		resolve: {
			alias: [
				{ find: '@', replacement: resolve(__dirname, './src') },
				{ find: '@one', replacement: resolve(__dirname, './src/pages/vibeOne') },
				{ find: '@comp', replacement: resolve(__dirname, './src/components') },
				{ find: '@img', replacement: resolve(__dirname, './src/assets/img') },
				{ find: /^~/, replacement: '' }
			]
		},
		// global css
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true
				},
				scss: {
					javascriptEnabled: true,
					additionalData: `
						@import "@one/assets/styles/theme/color.scss";
						@import "@one/assets/styles/theme/font.scss";
						@import "@one/assets/styles/utils/_mixin.scss";
						@import "@one/assets/styles/layout/index.scss";
						// @import "@one/assets/styles/common.scss";
					`
				},
				postcss: {
					plugins: [autoprefixer()]
				}
			}
		},
		// server config
		server: {
			host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: envSettings.VITE_PORT,
			open: envSettings.VITE_OPEN,
			cors: true,
			// https: false,
			// 代理跨域
			proxy: {
				'/api': {
					target: 'https://dev-api.vibe-beta.com/v1/',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		},
		// plugins
		plugins: vitePlugins(envSettings),
		esbuild: {
			pure: NODE_ENV === 'production' ? ['console.log', 'debugger'] : []
			// target: 'node12'
		},
		// build configure
		build: {
			outDir: 'dist',
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			minify: 'esbuild',
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		},
		define: {
			'process.env': process.env
		}
	};
});
