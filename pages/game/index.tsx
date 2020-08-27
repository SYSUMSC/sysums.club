import { AppFrame } from '../../components/frame';
import React from 'react';
import styles from './index.module.scss';

export default function GamePage() {
  return (
    <AppFrame>
      <title>解密 · SYSUMSC</title>
      <div className={styles.container}>
        <h3>解密游戏锐意制作中，预计9月20日前后上线。</h3>
      </div>
    </AppFrame>
  );
}
