import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import viteCompression from 'vite-plugin-compression';
import eslintPlugin from 'vite-plugin-eslint';
import vitePluginImp from 'vite-plugin-imp';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export const vitePlugins = (envSettings: ViteEnv) => [
	react(),
	vitePluginImp({
		libList: [
			{
				libName: 'antd',
				style: (name) => {
					if (name === 'spin' || name === 'layout') {
						return;
					}
					return `antd/es/${name}/style`;
				}
			}
		]
	}),
	AutoImport({
		imports: [
			'react',
			'react-router-dom',
			{
				'@/models': ['useSelector', 'useSelector1', 'useDispatch'],
				'@/models/action': ['setDetailState', 'fetchDeviceList'],
				'@/utils/auto-import': [
					'cls',
					'isEmpty',
					'jsonClone',
					'getFocusTeamId',
					'getCsrfToken',
					'isAdminPage'
				],
				'@/components': [
					'SvgIcon',
					'Button',
					'Dropdown',
					'DropdownOverlay',
					'DataSelect',
					'ItemRow',
					'message'
				],
				'@/hooks/useHooks': ['useOnceEffect', 'useWhyDidYouUpdate', 'useStableNavigate']
			}
		],
		dts: 'src/@types/auto-imports.d.ts'
	}),

	// * 使用 svg 图标
	createSvgIconsPlugin({
		iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
		symbolId: 'icon-[dir]-[name]'
	}),
	// * EsLint 报错信息显示在浏览器界面上
	eslintPlugin(),
	// * 是否生成包预览
	// envSettings.VITE_REPORT &&
	// 	visualizer({
	// 		gzipSize: true,
	// 		brotliSize: true,
	// 		emitFile: false,
	// 		filename: 'visualizer.html', //分析图生成的文件名
	// 		open: true //如果存在本地服务端口，将在打包后自动展示
	// 	}),
	// * gzip compress
	envSettings.VITE_BUILD_GZIP &&
		viteCompression({
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: 'gzip',
			ext: '.gz'
		})
];
