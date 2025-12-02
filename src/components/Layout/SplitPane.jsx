import React from 'react';
import styles from './SplitPane.module.css';

function SplitPane({ left, right }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        {left}
      </div>
      <div className={styles.divider}></div>
      <div className={styles.rightPane}>
        {right}
      </div>
    </div>
  );
}

export default SplitPane;
