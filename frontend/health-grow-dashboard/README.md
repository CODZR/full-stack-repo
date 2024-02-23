# Vibe Logistic Console

### Introduce

Vibe Logistic Console.

### 一、项目地址

- dev: https://dev-one.vibe-beta.com/
- beta: https://one.vibe-beta.com/
- prod: https://one.vibe.us/

### 二、 技术栈

- 🚀 React18、React-Router v6、React-Hooks、TypeScript、Vite2
- 🚀 Vite2 项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具……）
- 🚀 较完备的TypeScript支持
- 🚀 redux-toolkit 做状态管理，集成 immer、react-redux、redux-persist 开发
- 🚀 Axios 二次封装 （全局错误拦截、常用请求封装、全局请求 Loading、取消重复请求……）
- 🚀 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
- 🚀 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（项目规范配置）
- 🚀 why-did-you-render patches React to notify you about potentially avoidable re-renders.

**主要优点：**
* 提升开发效率：
  * 修改代码后热更新不刷新页面
  * 按需加载所需模块，run dev更快(<1s)
  * 支持配置需自动引入模块，省去烦琐的import
  * store更易管理和添加，后续操作也更便洁。
* lint更完备
  * 支持css module和styled-components，不与eslint冲突
* 支持脱离yarn workspace
  * pnpm减少幽灵依赖, 同时install更快

### 三、安装使用步骤 📑

## Version for

**npm > ^7.0.0 | ^8.0.0**
**pnpm**

NVM is recommended, install nvm by yourself.
(using node v16.11.0 (npm v8.0.0))

```
nvm install v16.11.0
nvm use v16.11.0
npm i pnpm -g
```

- **Install：**

```text
pnpm i
```

- **Run：**

```text
pnpm dev
pnpm serve
```

- **Build：**

```text
# 开发环境
pnpm build:dev

# 测试环境
pnpm build:test

# 生产环境
pnpm build:prod
```

- **Lint：**

```text
# eslint & prettier & stylelint
pnpm format

# eslint 检测代码
pnpm lint:eslint

# prettier 格式化代码
pnpm lint:prettier

# stylelint 格式化样式
lint:stylelint:module
lint:stylelint:styled
```

- **Commit：**

```text
# 提交代码（自动执行 format 命令）
pnpm commit

# Bypass hooks
git commit -m "xxx" --no-verify
```

- **Deploy**
1. 激活python虚拟环境 (virtualenv等)
2. `python install -r ./scripts/requirements.txt`
3. `pnpm deploy:dev`


### 四、代码规范
此仓库`代码规范`及`目录结构`的安排最终都是为了**在不是很影响性能的前提下方便开发者，提高可读性。**

开发的过程中关于规范及目录结构有好的想法和做法都可以提pr😊。

#### tips
* 查找组件时推荐通过command+p输入组件名查找
	* 查看**auto-import组件的props**通过**输入前缀comp+组件名快速跳转**到对应组件
* 目前新建文件ts会找不到依赖，应该是vscode的bug
	* 可以编辑keyboards中的reload window。
	* 修改when为：editorTextFocus || isDevelopment
	* 然后command + r 来reload window恢复


#### js
* 请**尽量修复ts的error提醒**。
  * 目前绝大多数type都已被定义，帮助快速发现问题所在。
  * 实在暂时解决不了使用 // @ts-ignore TODO: fix 去标识它
  * tsx组件中尽量保证只有当前view的UI/State逻辑，其他功能函数或者enum之类从同级/全局目录引入。
* ts type
  * import type 请使用 `import type {}` 而不是`import { type xxx }` (前者运行时完全不存在)
  * 全局type/interface请使用declare定义在`/src/@types/`目录下
  * react `onClick`的event可用全局的`NewClickEvent` type: `(event: NewClickEvent)`
    * 同理NewInputEvent...

#### css


### 五、文件资源目录 📚

```text
Vibe Customer Console
├─ .vscode                # vscode推荐配置
├─ .husky                 # husky配置
├─ public                 # 静态资源文件（忽略打包）
├─ scripts
│  ├─ rename.py           # 重命名.less => .module.less等
│  ├─ requirements.txt    # deploy: python的requirements
│  ├─ web_deploy.py       # 部署脚本deploy.py的依赖文件
├─ config                 # CI config files
│  ├─ .stylelintrc.js     # styled-components lint配置
├─ src
│  ├─ @types              # 全局 ts 声明
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ icons               # svg雪碧图
│  ├─ hooks               # 常用 Hooks
│  ├─ layouts             # 框架布局
│  ├─ models              # redux store
│  ├─ pages               # 项目所有页面
│  │  ├─vibeOne           # vibeOne项目入口
│  ├─ routers             # 路由管理
│  ├─ services            # API 接口管理
│  ├─ utils               # 工具库
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ vite-env.d.ts       # vite 声明文件
│  └─ wdyr.ts             # whyDidYouRender
├─ .editorconfig          # 编辑器配置（格式化）
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .npmrc                 # npm config file
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ commitlint.config.js   # git 提交规范配置
├─ deploy                 # 部署python文件
├─ env.ts                 # common及dev/beta/prod环境配置
├─ index.html             # 入口 html
├─ package.json           # 依赖包管理
├─ package-lock.json      # 依赖包包版本锁
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
├─ visualizer.html        # 项目打包体积可视化html
└─ vite.config.ts         # vite 配置
```
