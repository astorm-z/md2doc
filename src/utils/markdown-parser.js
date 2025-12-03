import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import markdownItHighlightjs from 'markdown-it-highlightjs';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItFootnote from 'markdown-it-footnote';

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
})
  .use(markdownItKatex, {
    throwOnError: false,
    errorColor: '#cc0000'
  })
  .use(markdownItHighlightjs)
  .use(markdownItTaskLists, {
    enabled: true,
    label: true
  })
  .use(markdownItFootnote);

// 自定义渲染规则 - 段落
const defaultParagraphOpen = md.renderer.rules.paragraph_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.paragraph_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'text-indent: 0; line-height: 1.5; margin: 0 0 12pt 0; text-align: left;');
  return defaultParagraphOpen(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 标题
const defaultHeadingOpen = md.renderer.rules.heading_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.heading_open = function(tokens, idx, options, env, self) {
  const level = tokens[idx].tag;
  const styles = {
    h1: 'font-size: 22pt; font-weight: bold; margin: 24pt 0 12pt 0; text-align: center; text-indent: 0;',
    h2: 'font-size: 18pt; font-weight: bold; margin: 18pt 0 10pt 0; text-indent: 0;',
    h3: 'font-size: 16pt; font-weight: bold; margin: 14pt 0 8pt 0; text-indent: 0;',
    h4: 'font-size: 14pt; font-weight: bold; margin: 12pt 0 6pt 0; text-indent: 0;',
    h5: 'font-size: 12pt; font-weight: bold; margin: 10pt 0 5pt 0; text-indent: 0;',
    h6: 'font-size: 12pt; font-weight: bold; margin: 8pt 0 4pt 0; text-indent: 0;'
  };

  tokens[idx].attrSet('style', styles[level] || '');
  return defaultHeadingOpen(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 表格
const defaultTableOpen = md.renderer.rules.table_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.table_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'border-collapse: collapse; width: 100%; margin: 12pt 0;');
  return defaultTableOpen(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 表格单元格
const defaultTdOpen = md.renderer.rules.td_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.td_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'border: 1pt solid #000; padding: 6pt 12pt; text-align: left;');
  return defaultTdOpen(tokens, idx, options, env, self);
};

const defaultThOpen = md.renderer.rules.th_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.th_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'border: 1pt solid #000; padding: 6pt 12pt; text-align: left; font-weight: bold; background-color: #f0f0f0;');
  return defaultThOpen(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 代码块
const defaultFenceOpen = md.renderer.rules.fence || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.fence = function(tokens, idx, options, env, self) {
  const token = tokens[idx];
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
  const langName = info ? info.split(/\s+/g)[0] : '';

  let highlighted;
  if (langName && options.highlight) {
    highlighted = options.highlight(token.content, langName, '') || md.utils.escapeHtml(token.content);
  } else {
    highlighted = md.utils.escapeHtml(token.content);
  }

  return `<pre style="background: #f5f5f5; border: 1pt solid #ccc; padding: 12pt; margin: 12pt 0; font-family: 'Courier New', monospace; font-size: 10pt; overflow-x: auto;"><code>${highlighted}</code></pre>\n`;
};

// 自定义渲染规则 - 行内代码
const defaultCodeInline = md.renderer.rules.code_inline || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.code_inline = function(tokens, idx, options, env, self) {
  const token = tokens[idx];
  return `<code style="background: #f0f0f0; padding: 2pt 4pt; font-family: 'Courier New', monospace; font-size: 10pt;">${md.utils.escapeHtml(token.content)}</code>`;
};

// 自定义渲染规则 - 列表
const defaultBulletListOpen = md.renderer.rules.bullet_list_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.bullet_list_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'margin: 12pt 0; padding-left: 24pt;');
  return defaultBulletListOpen(tokens, idx, options, env, self);
};

const defaultOrderedListOpen = md.renderer.rules.ordered_list_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.ordered_list_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'margin: 12pt 0; padding-left: 24pt;');
  return defaultOrderedListOpen(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 列表项
const defaultListItemOpen = md.renderer.rules.list_item_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.list_item_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'margin: 6pt 0; line-height: 1.5;');
  return defaultListItemOpen(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 段落关闭标签（用于处理段落后紧跟列表的情况）
const defaultParagraphClose = md.renderer.rules.paragraph_close || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.paragraph_close = function(tokens, idx, options, env, self) {
  // 检查段落后面是否紧跟列表
  const nextToken = tokens[idx + 1];
  if (nextToken && (nextToken.type === 'bullet_list_open' || nextToken.type === 'ordered_list_open')) {
    // 检查段落内容是否包含 strong 标签
    const paragraphOpen = tokens[idx - 2];
    const inline = tokens[idx - 1];
    if (inline && inline.type === 'inline' && inline.children) {
      const hasStrong = inline.children.some(child => child.type === 'strong_open');
      if (hasStrong) {
        // 在段落关闭标签后添加一个换行
        return '</p><div style="height: 6pt;"></div>\n';
      }
    }
  }
  return defaultParagraphClose(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 引用块
const defaultBlockquoteOpen = md.renderer.rules.blockquote_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.blockquote_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('style', 'border-left: 4pt solid #ccc; padding-left: 12pt; margin: 12pt 0; color: #666;');
  return defaultBlockquoteOpen(tokens, idx, options, env, self);
};

// 自定义渲染规则 - 水平线
const defaultHr = md.renderer.rules.hr || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.hr = function(tokens, idx, options, env, self) {
  return '<hr style="border: none; border-top: 1pt solid #ccc; margin: 24pt 0;" />\n';
};

/**
 * 解析 Markdown 文本为 HTML
 * @param {string} markdown - Markdown 文本
 * @returns {string} HTML 字符串
 */
export function parseMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  try {
    return md.render(markdown);
  } catch (error) {
    console.error('Markdown 解析错误:', error);
    return `<p style="color: red;">解析错误: ${error.message}</p>`;
  }
}

export default md;
