import React from 'react';
import styles from './OptionsPanel.module.css';

function OptionsPanel({ options, onChange }) {
  const handleCheckboxChange = (key) => (e) => {
    onChange({
      ...options,
      [key]: e.target.checked,
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
    </div>
  );
}

export default OptionsPanel;
