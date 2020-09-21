import React, { FC } from 'react';
import styles from './loading-indicator.module.scss';
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingIndicator: FC = () => (
  <div className={styles.container}>
    <h2 className={styles.indicator}>
      <LoadingOutlined />
    </h2>
  </div>
);
