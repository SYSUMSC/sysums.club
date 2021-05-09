import React, { FC, FormEvent, useState } from 'react';
import { useAsyncAction } from '../../../utils/utils';
import { fetchFromApi } from '../../../utils/api';
import styles from '../login-modal/login-modal.module.scss';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { ProgressIndicator, TextField } from '@fluentui/react';
import { AppModal } from '../../shared/app-modal/app-modal';

export type PasswordResetRequestModalProps = {
  showModal: boolean;
  onHide: () => any;
};

interface PasswordResetRequestDto {
  email: string;
}

export const PasswordResetRequestModal: FC<PasswordResetRequestModalProps> = ({
  showModal,
  onHide
}) => {
  const [requesting, setRequesting, errorMessage, setErrorMessage] = useAsyncAction();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  async function onSubmit(form: HTMLFormElement) {
    if (!form.checkValidity()) {
      return;
    }
    const dto: PasswordResetRequestDto = { email };
    setRequesting(true);
    try {
      await fetchFromApi(
        'user/reset-request',
        {
          method: 'POST',
          body: JSON.stringify(dto)
        },
        true
      );
      setErrorMessage('');
      setSuccess(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setRequesting(false);
  }

  return (
    <AppModal
      titleAriaId="password-reset-request-modal"
      isOpen={showModal}
      onDismiss={onHide}
      caption="重置密码"
    >
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();
          onSubmit(event.currentTarget);
        }}
      >
        <TextField
          label="邮箱地址"
          type="email"
          description="你的邮箱将收到一封含有指向「重置密码」页面的链接的邮件"
          value={email}
          onChange={(_, value) => setEmail(value)}
          disabled={requesting || success}
          required={true}
        />
        <div className={styles.buttonContainer}>
          <AsyncDataButton
            type="submit"
            iconProps={{ iconName: success ? 'CheckMark' : undefined }}
            text={!success ? '发送邮件' : '邮件已发送'}
            extra={{ isLoading: requesting, forceDisabled: success, errorMessage }}
          />
        </div>
      </form>
      {requesting && <ProgressIndicator barHeight={3} />}
    </AppModal>
  );
};
