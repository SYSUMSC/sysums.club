import React, { FC } from 'react';
import styles from './problem-loading-indicator.module.scss';
import { FrownOutlined, LoadingOutlined } from '@ant-design/icons';

export type ProblemLoadingIndicatorProps = {
  loading?: boolean;
  errorMessage?: string;
};

export const ProblemLoadingIndicator: FC<ProblemLoadingIndicatorProps> = ({
  loading,
  errorMessage
}) => (
  <div className={styles.rootContainer}>
    <h2 className={styles.textContainer}>
      {loading && <LoadingOutlined />}
      {errorMessage && (
        <>
          <FrownOutlined className={styles.icon} />
          {errorMessage}
        </>
      )}
    </h2>
  </div>
);
