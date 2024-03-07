### Full stack health grow project

Refactoring...

### 一、注意事项

本仓库将各个项目放在一起仅为了方便学习，**dev 请直接在对应目录下运行 vscode**

### 二、运行

```
# 持续运行
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d

# 清空
docker compose -f docker-compose.yml -f docker-compose.override.yml down
```

### 三、文件资源目录 📚

```text
backend
├─ data_projects                        # data相关项目入口
│ ├─ dagster_project                    # dagster 数据调度引擎
│ │ ├─ ...
│ ├─ dbt_project                        # dbt databse及数据模型管理
│ │ ├─ ...
├─ fastapi-project                      # web api构建框架 (python)
│ ├─ ...
├─ chalicelib-project                   # aws web框架 (openai, embedding, vector retriever)
│ ├─ ...
├─ .vscode                              # 当前目录下(/backend)vscode的配置
├─ pyproject.toml                       # python package 配置（poetry）
├─ poetry.lock                          # poetry package版本锁定
frontend
├─ next-client                          # 服务端渲染 SSR（next，webpack）
│ ├─ ...
├─ react-dashboard                      # 单页面 SPA（react，vite）
│ ├─ ...
├─ vitepress-docs                       # 服务端渲染 SSR（vue，vite)
│ ├─ ...
```
