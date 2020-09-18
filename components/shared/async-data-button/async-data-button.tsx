import React, { FC, useRef } from 'react';
import { Button, ButtonProps, Overlay, Spinner, Tooltip } from 'react-bootstrap';
import { WarningOutlined, LoadingOutlined } from '@ant-design/icons/lib';

export type AsyncDataButtonProps = ButtonProps & {
  extra: {
    isLoading: boolean;
    forceDisabled?: boolean;
    errorMessage?: string;
  };
};

export const AsyncDataButton: FC<AsyncDataButtonProps> = (props) => {
  const {
    extra: { isLoading, forceDisabled, errorMessage }
  } = props;
  const target = useRef(null);
  return (
    <>
      <Button disabled={isLoading || forceDisabled} {...props} ref={target}>
        {!isLoading && !!errorMessage && <WarningOutlined />}
        {isLoading && <LoadingOutlined />}
        {props.children}
      </Button>
      <Overlay target={target.current} show={!!errorMessage} placement="bottom">
        {(props) => (
          <Tooltip id="async-data-button-overlay" {...props}>
            {errorMessage}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};
