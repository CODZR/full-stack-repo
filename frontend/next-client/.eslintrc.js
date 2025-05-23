// @see: http://eslint.cn
/** @type {import('eslint').Linter.BaseConfig} */

module.exports = {
	settings: {
		react: {
			version: 'detect'
		}
	},
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	/* 指定如何解析语法 */
	parser: '@typescript-eslint/parser',
	/* 优先级低于 parse 的语法解析配置 */
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'react-hooks',
		'prettier',
		'simple-import-sort',
		'import',
		'unused-imports',
		'@wogns3623/better-exhaustive-deps'
	],
	/* 继承某些已有的规则 */
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'prettier',
		'plugin:prettier/recommended'
	],
	/*
	 * "off" 或 0    ==>  关闭规则
	 * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
	 * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
	 */
	rules: {
		// eslint (http://eslint.cn/docs/rules)
		'default-param-last': 'warn',
		'no-var': 'error', // 要求使用 let 或 const 而不是 var
		'no-debugger': 'warn',
		'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
		'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
		'prefer-const': 'off', // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
		'no-irregular-whitespace': 'off', // 禁止不规则的空白
		'unused-imports/no-unused-imports': 'warn',
		'arrow-parens': 'warn',
		'padding-line-between-statements': [
			// 空行
			'warn',
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: ['return', 'export'] }
		],

		// typeScript (https://typescript-eslint.io/rules)
		'@typescript-eslint/no-unused-vars': 'warn', // 禁止定义未使用的变量
		'@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
		'@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
		'@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
		'@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用 @ts-ignore
		'@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
		'@typescript-eslint/explicit-function-return-type': 'off', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
		'@typescript-eslint/no-var-requires': 'off', // 不允许在 import 语句中使用 require 语句
		'@typescript-eslint/no-empty-function': 'off', // 禁止空函数
		'@typescript-eslint/no-use-before-define': 'off', // 禁止在变量定义之前使用它们
		'@typescript-eslint/ban-ts-comment': 'off', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
		'@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
		'@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-this-alias': [
			'error',
			{
				allowedNames: ['that'] // Allow `const self = this`; `[]` by default
			}
		],

		// react (https://github.com/jsx-eslint/eslint-plugin-react)
		'react/no-unescaped-entities': 0, // 可以直接使用撇号
		'react/jsx-no-undef': 'off',
		'react-hooks/rules-of-hooks': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'react/prop-types': 0,
		'react/jsx-sort-props': [
			'warn',
			{
				shorthandFirst: false,
				shorthandLast: true,
				multiline: 'last',
				ignoreCase: true,
				noSortAlphabetically: false,
				reservedFirst: false,
				callbacksLast: true
			}
		],
		'react-hooks/rules-of-hooks': 'warn', // 检查 Hook 的规则

		'@wogns3623/better-exhaustive-deps/exhaustive-deps': [
			'warn',
			{
				// additionalHooks: 'useStableNavigate',
				staticHooks: {
					useDispatch: true,
					useState: [false, true]
				}
			}
		],

		//simple-import-sort
		'import/first': 'warn',
		'import/newline-after-import': 'warn',
		'import/no-duplicates': 'warn',
		'simple-import-sort/exports': 'warn',
		'simple-import-sort/imports': [
			'warn',
			{
				groups: [
					['^node:'],
					// Packages. `react` related packages come first.
					['^react', '^@?\\w'],
					// Internal components
					['^(@comp|@ui|components|./components|./containers)(/.*|$)', '^\\./[A-Z]\\w+$'],
					// Side effect imports.
					['^\\u0000'],
					// Parent imports.
					['^@(/.*|$)$', '^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./\\w+$'],
					// Style imports.
					['^.+\\.less$']
				]
			}
		]
	},
	overrides: [
		{
			files: ['*.tsx'],
			parser: '@typescript-eslint/parser',
			rules: {
				'max-lines': ['warn', { max: 300 }]
			}
		}
	]
};
