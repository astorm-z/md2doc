import React, { useState, useEffect, useRef } from 'react';
import styles from './Editor.module.css';

function MarkdownEditor({ value, onChange }) {
  const [stats, setStats] = useState({ chars: 0, lines: 0 });
  const textareaRef = useRef(null);

  useEffect(() => {
    if (value) {
      const chars = value.length;
      const lines = value.split('\n').length;
      setStats({ chars, lines });
    } else {
      setStats({ chars: 0, lines: 0 });
    }
  }, [value]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    // 支持 Tab 键缩进
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      // 设置光标位置
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Markdown 编辑器</h2>
        <div className={styles.stats}>
          <span>{stats.chars} 字符</span>
          <span className={styles.separator}>|</span>
          <span>{stats.lines} 行</span>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="在此输入 Markdown 文本..."
        spellCheck={false}
      />
    </div>
  );
}

export default MarkdownEditor;
