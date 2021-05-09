import React, { FC } from 'react';
import styles from './loading-indicator-with-message.module.scss';
import { FontIcon } from '@fluentui/react';

export type LoadingIndicatorWithMessageProps = {
  loading?: boolean;
  errorMessage?: string;
  extraStyles?: object;
};

export const LoadingIndicatorWithMessage: FC<LoadingIndicatorWithMessageProps> = ({
  loading,
  errorMessage,
  extraStyles
}) => (
  <div className={styles.rootContainer} style={extraStyles}>
    <h2 className={styles.textContainer}>
      {loading && (
        <svg width="1em" height="1em" viewBox="0 0 256 256">
          <path
            d="M88.402 77.088a8 8 0 0 1-11.314 11.314L54.46 65.775a8 8 0 0 1 11.314-11.314zm-11.314 90.51L54.46 190.225a8 8 0 0 0 11.314 11.314l22.627-22.627a8 8 0 0 0-11.314-11.314zM72 128a8 8 0 0 0-8-8H32a8 8 0 0 0 0 16h32a8 8 0 0 0 8-8zm56-104a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0V32a8 8 0 0 0-8-8zm96 96h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16zm-45.088 47.598a8 8 0 0 0-11.314 11.314l22.627 22.627a8 8 0 1 0 11.314-11.314zM128 184a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0v-32a8 8 0 0 0-8-8z"
            fill="currentColor"
          />
        </svg>
      )}
      {errorMessage && (
        <>
          <FontIcon iconName="ErrorBadge" className={styles.icon} />
          {errorMessage}
        </>
      )}
    </h2>
  </div>
);
