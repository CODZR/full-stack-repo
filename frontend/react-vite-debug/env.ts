export const commonEnv = {
	// title
	VITE_GLOB_APP_TITLE: 'Vibe Customer Console',

	// port
	VITE_PORT: 8003,

	// open 运行 npm run dev 时自动打开浏览器
	VITE_OPEN: true,

	// 是否生成包预览文件
	VITE_REPORT: false,

	// 是否开启gzip压缩
	VITE_BUILD_GZIP: false,

	// 是否删除生产环境 console
	VITE_DROP_CONSOLE: true
};

export const devEnv = Object.freeze({
	NODE_ENV: 'development',
	VITE_REST_BASE_URL: 'https://dev-api.vibe-beta.com/v1/',
	VITE_WSS_BASE_URL: 'wss://dev-wss.vibe-beta.com',
	VITE_ACCOUNT_URL: 'https://dev-account.vibe-beta.com/',
	VITE_CANVAS_WEB_URL: 'https://dev-app.vibe-beta.com/'
});

export const betaEnv = Object.freeze({
	NODE_ENV: 'beta',
	VITE_REST_BASE_URL: 'https://api.vibe-beta.com/v1/',
	VITE_WSS_BASE_URL: 'wss://wss.vibe-beta.com',
	VITE_ACCOUNT_URL: 'https://account.vibe-beta.com/',
	VITE_CANVAS_WEB_URL: 'https://app.vibe-beta.com/'
});

export const prodEnv = Object.freeze({
	NODE_ENV: 'production',
	VITE_REST_BASE_URL: 'https://api.vibe.us/v1/',
	VITE_WSS_BASE_URL: 'wss://wss.vibe.us',
	VITE_ACCOUNT_URL: 'https://account.vibe.us/',
	VITE_CANVAS_WEB_URL: 'https://app.vibe.us/'
});

export type EnvSettings = {
	NODE_ENV?: string;
	VITE_GLOB_APP_TITLE: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_REPORT: boolean;
	VITE_BUILD_GZIP: boolean;
	VITE_DROP_CONSOLE: boolean;
	VITE_REST_BASE_URL?: string;
	VITE_WSS_BASE_URL?: string;
};
