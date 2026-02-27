import React from 'react';
import styles from './OptionsPanel.module.css';

function OptionsPanel({ options, onChange }) {
  const handleCheckboxChange = (key) => (e) => {
    onChange({
      ...options,
      [key]: e.target.checked,
    });
  };

  const handleInputChange = (key) => (e) => {
    onChange({
      ...options,
      [key]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <label className={styles.option}>
        <input
          type="checkbox"
          checked={options.addSpaceBeforeFirstLevelList}
          onChange={handleCheckboxChange('addSpaceBeforeFirstLevelList')}
        />
        <span className={styles.label}>在一级列表的文字前加一个空格</span>
      </label>
      <label className={styles.option}>
        <span className={styles.label}>图片基础 URL：</span>
        <input
          type="text"
          className={styles.textInput}
          value={options.imageBaseUrl || ''}
          onChange={handleInputChange('imageBaseUrl')}
          placeholder="例如：https://example.com/images"
        />
      </label>
    </div>
  );
}

export default OptionsPanel;
