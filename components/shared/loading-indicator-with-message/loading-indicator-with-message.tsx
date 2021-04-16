import React, { FC } from 'react';
import styles from './loading-indicator-with-message.module.scss';
import { FrownOutlined, LoadingOutlined } from '@ant-design/icons';
import { FontIcon } from '@fluentui/react';

export type LoadingIndicatorWithMessageProps = {
  loading?: boolean;
  errorMessage?: string;
};

export const LoadingIndicatorWithMessage: FC<LoadingIndicatorWithMessageProps> = ({
  loading,
  errorMessage
}) => (
  <div className={styles.rootContainer}>
    <h2 className={styles.textContainer}>
      {loading && <LoadingOutlined />}
      {errorMessage && (
        <>
          <FontIcon iconName="ErrorBadge" className={styles.icon} />
          {errorMessage}
        </>
      )}
    </h2>
  </div>
);
