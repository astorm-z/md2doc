/**
 * 富文本复制处理器
 * 实现将富文本 HTML 复制到剪贴板的功能
 */

import { inlineStyles, cleanHTML } from './style-inliner';

/**
 * 将 HTML 转换为纯文本
 * @param {string} html - HTML 字符串
 * @returns {string} 纯文本
 */
function htmlToPlainText(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

/**
 * 使用 Clipboard API 复制富文本
 * @param {HTMLElement} element - 要复制的 HTML 元素
 * @returns {Promise<void>}
 */
async function copyWithClipboardAPI(element) {
  // 内联样式
  const inlinedElement = inlineStyles(element);

  // 获取 HTML 内容
  let htmlContent = inlinedElement.innerHTML;

  // 清理 HTML
  htmlContent = cleanHTML(htmlContent);

  // 获取纯文本内容
  const plainText = htmlToPlainText(htmlContent);

  // 创建 Blob
  const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
  const textBlob = new Blob([plainText], { type: 'text/plain' });

  // 创建 ClipboardItem
  const clipboardItem = new ClipboardItem({
    'text/html': htmlBlob,
    'text/plain': textBlob
  });

  // 写入剪贴板
  await navigator.clipboard.write([clipboardItem]);
}

/**
 * 使用 execCommand 复制富文本（降级方案）
 * @param {HTMLElement} element - 要复制的 HTML 元素
 * @returns {Promise<void>}
 */
async function copyWithExecCommand(element) {
  // 内联样式
  const inlinedElement = inlineStyles(element);

  // 创建临时容器
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'fixed';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.innerHTML = cleanHTML(inlinedElement.innerHTML);

  document.body.appendChild(tempDiv);

  try {
    // 选择内容
    const range = document.createRange();
    range.selectNodeContents(tempDiv);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // 执行复制
    const success = document.execCommand('copy');

    if (!success) {
      throw new Error('execCommand 复制失败');
    }

    // 清除选择
    selection.removeAllRanges();
  } finally {
    // 移除临时容器
    document.body.removeChild(tempDiv);
  }
}

/**
 * 复制富文本到剪贴板
 * @param {HTMLElement} element - 要复制的 HTML 元素
 * @returns {Promise<void>}
 */
export async function copyRichText(element) {
  if (!element) {
    throw new Error('没有要复制的内容');
  }

  // 检查是否支持 Clipboard API
  if (navigator.clipboard && navigator.clipboard.write) {
    try {
      await copyWithClipboardAPI(element);
      return;
    } catch (error) {
      console.warn('Clipboard API 复制失败，尝试使用 execCommand:', error);
    }
  }

  // 降级到 execCommand
  try {
    await copyWithExecCommand(element);
  } catch (error) {
    console.error('execCommand 复制失败:', error);
    throw new Error('复制失败，请检查浏览器权限设置');
  }
}

/**
 * 检查是否支持富文本复制
 * @returns {boolean}
 */
export function isRichTextCopySupported() {
  return (
    (navigator.clipboard && navigator.clipboard.write) ||
    document.queryCommandSupported('copy')
  );
}

export default {
  copyRichText,
  isRichTextCopySupported
};
