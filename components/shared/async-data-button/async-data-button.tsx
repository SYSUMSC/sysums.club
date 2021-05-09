import React, { FC, useRef } from 'react';
import { DefaultButton, DirectionalHint, TooltipHost } from '@fluentui/react';
import { IButtonProps } from '@fluentui/react/lib/components/Button/Button.types';

export type AsyncDataButtonProps = IButtonProps & {
  text: string;
  extra: {
    isLoading: boolean;
    forceDisabled?: boolean;
    errorMessage?: string;
  };
};

export const AsyncDataButton: FC<AsyncDataButtonProps> = ({
  text,
  extra: { isLoading, forceDisabled, errorMessage },
  ...props
}) => {
  const target = useRef(null);
  return (
    <TooltipHost
      directionalHint={DirectionalHint.bottomCenter}
      content={!isLoading ? errorMessage : undefined}
    >
      <DefaultButton
        iconProps={{ iconName: !isLoading && errorMessage ? 'Warning' : undefined }}
        disabled={isLoading || forceDisabled}
        ref={target}
        text={text}
        {...props}
      />
    </TooltipHost>
  );
};
