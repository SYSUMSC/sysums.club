import { AppFrame } from '../components/frame';
import Head from 'next/head';
import React from 'react';
import styles from './404.module.scss';
import { FontIcon } from '@fluentui/react';

export default function App404Page() {
  return (
    <AppFrame>
      <Head>
        <title>此页面不存在 · SYSUMSC</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles.indicator}>
          <FontIcon iconName="ErrorBadge" className={styles.icon} />
          此页面不存在
        </h2>
      </div>
    </AppFrame>
  );
}
