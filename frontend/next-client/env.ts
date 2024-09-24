const commonEnv = {
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

const devEnv = {
	NODE_ENV: 'development',
	VITE_REST_BASE_URL: 'https://api.dzrlab.top/api/'
	// VITE_REST_BASE_URL: 'http://127.0.0.1:7001/api/'
};

const betaEnv = {
	NODE_ENV: 'beta',
	VITE_REST_BASE_URL: 'https://api.dzrlab.top/api/'
};

const prodEnv = {
	NODE_ENV: 'production',
	VITE_REST_BASE_URL: 'https://api.dzrlab.top/api/'
};

function getEnvSettingsByMode(mode) {
	let envSettings = commonEnv;
	if (mode === 'development') {
		envSettings = { ...commonEnv, ...devEnv }; // 使用展开运算符来合并对象
	} else if (mode === 'beta') {
		envSettings = { ...commonEnv, ...betaEnv };
	} else if (mode === 'production') {
		envSettings = { ...commonEnv, ...prodEnv };
	}
	return envSettings;
}

// 导出常量和函数
module.exports = {
	commonEnv,
	devEnv,
	betaEnv,
	prodEnv,
	getEnvSettingsByMode
};
