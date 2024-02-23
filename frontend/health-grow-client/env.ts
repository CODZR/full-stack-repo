export const commonEnv = {
	// title
	VITE_GLOB_APP_TITLE: 'Health grow app',

	// port
	VITE_PORT: 8000,

	// open 运行 npm run dev 时自动打开浏览器
	VITE_OPEN: true,

	// 是否生成包预览文件
	VITE_REPORT: false,

	// 是否开启gzip压缩
	VITE_BUILD_GZIP: false,

	// 是否删除生产环境 console
	VITE_DROP_CONSOLE: true
};

export const devEnv = {
	NODE_ENV: 'development',
	VITE_REST_BASE_URL: 'http://127.0.0.1:7001/'
};
export const betaEnv = {
	NODE_ENV: 'beta',
	VITE_REST_BASE_URL: 'https://dzrlab.top/'
};

export const prodEnv = {
	NODE_ENV: 'production',
	VITE_REST_BASE_URL: 'https://dzrlab.top/'
};

export type EnvSettings = {
	NODE_ENV?: string;
};
