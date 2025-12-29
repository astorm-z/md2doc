import React, { useState, useEffect, useCallback } from 'react';
import SplitPane from './components/Layout/SplitPane';
import MarkdownEditor from './components/Editor/MarkdownEditor';
import RichTextPreview from './components/Preview/RichTextPreview';
import OptionsPanel from './components/Options/OptionsPanel';
import './assets/styles/global.css';

// 默认示例 Markdown
const DEFAULT_MARKDOWN = `# Markdown 转 Word 格式工具

欢迎使用 Markdown 转 Word 格式工具！在左侧输入 Markdown 文本，右侧将实时显示转换后的富文本效果。

## 功能特点

- **实时预览**：左侧输入，右侧实时显示效果
- **一键复制**：点击"一键复制"按钮，即可将富文本复制到剪贴板
- **完美兼容**：复制后可直接粘贴到 Word、WPS 等应用，样式完整保留

## 支持的 Markdown 语法

### 文本格式

这是一段普通文本。支持 **粗体**、*斜体*、~~删除线~~ 和 \`行内代码\`。

### 列表

无序列表：
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

有序列表：
1. 第一项
2. 第二项
3. 第三项

任务列表：
- [x] 已完成的任务
- [ ] 未完成的任务

### 引用块

> 这是一段引用文本。
> 可以包含多行内容。

### 代码块

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### 表格

| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |

### 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

### 水平线

---

## 使用说明

1. 在左侧编辑器中输入或粘贴 Markdown 文本
2. 右侧会实时显示转换后的富文本效果
3. 点击右上角的"一键复制"按钮
4. 打开 Word 或 WPS，按 Ctrl+V 粘贴即可

祝您使用愉快！
`;

// 默认配置
const DEFAULT_OPTIONS = {
  addSpaceBeforeFirstLevelList: true, // 是否在一级列表的文字前加一个空格
};

function App() {
  const [markdown, setMarkdown] = useState('');
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  // 从 localStorage 加载保存的内容和配置
  useEffect(() => {
    const saved = localStorage.getItem('markdown-content');
    if (saved) {
      setMarkdown(saved);
    } else {
      setMarkdown(DEFAULT_MARKDOWN);
    }

    const savedOptions = localStorage.getItem('md2doc-options');
    if (savedOptions) {
      try {
        setOptions({ ...DEFAULT_OPTIONS, ...JSON.parse(savedOptions) });
      } catch (e) {
        // 解析失败时使用默认配置
      }
    }
  }, []);

  // 使用 debounce 保存到 localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (markdown) {
        localStorage.setItem('markdown-content', markdown);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [markdown]);

  const handleMarkdownChange = useCallback((value) => {
    setMarkdown(value);
  }, []);

  const handleOptionsChange = useCallback((newOptions) => {
    setOptions(newOptions);
    localStorage.setItem('md2doc-options', JSON.stringify(newOptions));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <OptionsPanel options={options} onChange={handleOptionsChange} />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <SplitPane
          left={<MarkdownEditor value={markdown} onChange={handleMarkdownChange} />}
          right={<RichTextPreview markdown={markdown} options={options} />}
        />
      </div>
    </div>
  );
}

export default App;
