# Markdown 转 Word 格式工具

一个纯前端 Web 应用，实现 Markdown 到富文本的实时转换和一键复制功能。用户可以在左侧输入 Markdown 文档，右侧实时预览转换后的富文本效果，并支持一键复制到剪贴板（可直接粘贴到 Word/WPS 等应用）。

## 功能特点

- ✨ **实时预览**：左侧输入 Markdown，右侧实时显示富文本效果
- 📋 **一键复制**：点击按钮即可将富文本复制到剪贴板
- 🎨 **Word 样式**：预览效果模拟 Word 文档样式，复制后样式完整保留
- 💾 **自动保存**：输入内容自动保存到本地存储
- 🚀 **纯前端**：无需后端服务，可直接部署到静态托管平台

## 支持的 Markdown 语法

- 标题（H1-H6）
- 段落和换行
- 粗体、斜体、删除线
- 有序列表、无序列表、任务列表
- 表格
- 代码块和行内代码（支持语法高亮）
- 引用块
- 链接和图片
- 数学公式（LaTeX）
- 脚注
- 水平线

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite 5
- **Markdown 解析**：markdown-it + 插件生态
- **数学公式**：KaTeX
- **代码高亮**：highlight.js
- **样式方案**：CSS Modules + Word 主题样式

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 即可使用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. 在左侧编辑器中输入或粘贴 Markdown 文本
2. 右侧会实时显示转换后的富文本效果
3. 点击右上角的"一键复制"按钮
4. 打开 Word 或 WPS，按 Ctrl+V 粘贴即可

## 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入 GitHub 仓库
3. Vercel 自动检测 Vite 配置并构建
4. 获得部署 URL

### Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 导入仓库
3. 配置构建命令：`npm run build`
4. 配置发布目录：`dist`

## 项目结构

```
md2doc/
├── public/                      # 静态资源
├── src/
│   ├── components/              # React 组件
│   │   ├── Editor/              # Markdown 编辑器
│   │   ├── Preview/             # 富文本预览
│   │   └── Layout/              # 布局组件
│   ├── utils/                   # 工具函数
│   │   ├── markdown-parser.js   # Markdown 解析
│   │   ├── clipboard-handler.js # 富文本复制
│   │   └── style-inliner.js     # 样式内联
│   ├── assets/                  # 资源文件
│   │   └── styles/              # 样式文件
│   ├── App.jsx                  # 应用主组件
│   └── main.jsx                 # 应用入口
├── index.html                   # HTML 入口
├── package.json                 # 项目配置
├── vite.config.js               # Vite 配置
└── README.md                    # 项目说明
```

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 许可证

MIT License

## 致谢

本项目参考了 [PasteMD](https://github.com/yourusername/PasteMD) 的设计思路。
