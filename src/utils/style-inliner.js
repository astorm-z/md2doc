/**
 * 样式内联工具
 * 将 CSS 样式内联到 HTML 元素，以便复制到 Word 时保持样式
 */

// Word 支持的 CSS 属性列表
const WORD_SUPPORTED_STYLES = [
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'color',
  'background-color',
  'text-align',
  'text-indent',
  'text-decoration',
  'line-height',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-color',
  'border-style',
  'border-width',
  'border-collapse',
  'width',
  'height',
  'vertical-align'
];

/**
 * 提取元素的相关样式
 * @param {CSSStyleDeclaration} computedStyle - 计算后的样式
 * @returns {string} 内联样式字符串
 */
function extractRelevantStyles(computedStyle) {
  const styles = [];

  WORD_SUPPORTED_STYLES.forEach(prop => {
    const value = computedStyle.getPropertyValue(prop);
    if (value && value !== 'none' && value !== 'normal' && value !== 'auto') {
      styles.push(`${prop}: ${value}`);
    }
  });

  return styles.join('; ');
}

/**
 * 将 CSS 样式内联到 HTML 元素
 * @param {HTMLElement} element - 要处理的 HTML 元素
 * @returns {HTMLElement} 处理后的元素
 */
export function inlineStyles(element) {
  // 克隆元素以避免修改原始 DOM
  const clonedElement = element.cloneNode(true);

  // 遍历所有元素
  const allElements = clonedElement.querySelectorAll('*');

  // 处理克隆元素本身
  processElement(clonedElement);

  // 处理所有子元素
  allElements.forEach(el => {
    processElement(el);
  });

  return clonedElement;
}

/**
 * 处理单个元素，将样式内联
 * @param {HTMLElement} el - 要处理的元素
 */
function processElement(el) {
  // 获取计算后的样式
  const computedStyle = window.getComputedStyle(el);

  // 提取相关样式
  const inlineStyle = extractRelevantStyles(computedStyle);

  // 获取元素已有的内联样式
  const existingStyle = el.getAttribute('style') || '';

  // 合并样式（已有样式优先）
  if (existingStyle) {
    el.setAttribute('style', `${existingStyle}; ${inlineStyle}`);
  } else if (inlineStyle) {
    el.setAttribute('style', inlineStyle);
  }

  // 移除 class 属性（因为样式已经内联）
  el.removeAttribute('class');
}

/**
 * 将 HTML 字符串转换为内联样式的 HTML
 * @param {string} html - HTML 字符串
 * @returns {string} 内联样式后的 HTML 字符串
 */
export function inlineStylesFromHTML(html) {
  // 创建临时容器
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // 内联样式
  const inlinedElement = inlineStyles(tempDiv);

  return inlinedElement.innerHTML;
}

/**
 * 清理 HTML，移除不必要的属性
 * @param {string} html - HTML 字符串
 * @returns {string} 清理后的 HTML 字符串
 */
export function cleanHTML(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // 移除所有 data-* 属性
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach(el => {
    // 移除 data-* 属性
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        el.removeAttribute(attr.name);
      }
    });

    // 移除 id 属性（除非是脚注引用）
    if (el.id && !el.id.startsWith('fn')) {
      el.removeAttribute('id');
    }
  });

  return tempDiv.innerHTML;
}

export default {
  inlineStyles,
  inlineStylesFromHTML,
  cleanHTML,
  extractRelevantStyles
};
