import React, { useMemo, useState, useRef } from 'react';
import { parseMarkdown } from '../../utils/markdown-parser';
import { copyRichText } from '../../utils/clipboard-handler';
import styles from './Preview.module.css';
import '../../assets/styles/word-theme.css';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

function RichTextPreview({ markdown }) {
  const [copyStatus, setCopyStatus] = useState('idle'); // idle, copying, success, error
  const previewRef = useRef(null);

  const htmlContent = useMemo(() => {
    return parseMarkdown(markdown);
  }, [markdown]);

  const handleCopy = async () => {
    if (!previewRef.current || copyStatus === 'copying') {
      return;
    }

    try {
      setCopyStatus('copying');
      await copyRichText(previewRef.current);
      setCopyStatus('success');

      // 3秒后重置状态
      setTimeout(() => {
        setCopyStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('复制失败:', error);
      setCopyStatus('error');

      // 3秒后重置状态
      setTimeout(() => {
        setCopyStatus('idle');
      }, 3000);
    }
  };

  const getCopyButtonText = () => {
    switch (copyStatus) {
      case 'copying':
        return '复制中...';
      case 'success':
        return '✓ 复制成功！';
      case 'error':
        return '✗ 复制失败';
      default:
        return '一键复制';
    }
  };

  const getCopyButtonClass = () => {
    const baseClass = styles.copyButton;
    if (copyStatus === 'success') return `${baseClass} ${styles.success}`;
    if (copyStatus === 'error') return `${baseClass} ${styles.error}`;
    return baseClass;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>富文本预览</h2>
        <button
          className={getCopyButtonClass()}
          onClick={handleCopy}
          disabled={copyStatus === 'copying' || !markdown}
        >
          {getCopyButtonText()}
        </button>
      </div>
      <div className={styles.previewWrapper}>
        <div
          ref={previewRef}
          className="word-document"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}

export default RichTextPreview;
