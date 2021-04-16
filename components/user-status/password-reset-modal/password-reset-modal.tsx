import styles from './password-reset-modal.module.scss';
import React, { FC, FormEvent, useState } from 'react';
import { useAsyncAction } from '../../../utils/utils';
import { fetchFromApi } from '../../../utils/api';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { ProgressIndicator, TextField } from '@fluentui/react';
import { AppModal } from '../../shared/app-modal/app-modal';

export type PasswordResetModalProps = {
  showModal: boolean;
  onHide: () => any;
  email: string;
  token: string;
};

interface PasswordResetDto {
  email: string;
  password: string;
  token: string;
}

export const PasswordResetModal: FC<PasswordResetModalProps> = ({
  showModal,
  onHide,
  email,
  token
}) => {
  const [requesting, setRequesting, errorMessage, setErrorMessage] = useAsyncAction();
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');

  async function onSubmit(form: HTMLFormElement) {
    const dto: PasswordResetDto = { email, password, token };
    if (form.checkValidity()) {
      setRequesting(true);
      try {
        await fetchFromApi(
          'user/reset',
          {
            method: 'POST',
            body: JSON.stringify(dto)
          },
          true
        );
        setErrorMessage('');
        setSuccess(true);
        setTimeout(() => window.location.reload(), 3000);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setRequesting(false);
    }
  }

  return (
    <AppModal
      titleAriaId="password-reset-modal"
      isOpen={showModal}
      onDismiss={onHide}
      caption="重置密码"
    >
      <form
        noValidate
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();
          onSubmit(event.currentTarget);
        }}
      >
        <TextField label="邮箱地址" type="email" value={email} disabled={true} required={true} />
        <TextField
          label="新密码"
          type="password"
          pattern="[a-zA-Z0-9#@!~%^&*]{8,64}"
          description="长度至少大于8个字符，仅支持英文、数字以及一些特殊字符"
          value={password}
          onChange={(_, value) => setPassword(value)}
          disabled={requesting}
          required={true}
        />
        <div className={styles.buttonContainer}>
          <AsyncDataButton
            type="submit"
            iconProps={{ iconName: success ? 'CheckMark' : undefined }}
            text={!success ? '重置密码' : '重置成功，页面即将刷新'}
            extra={{ isLoading: requesting, forceDisabled: success, errorMessage }}
          />
        </div>
      </form>
      {requesting && <ProgressIndicator barHeight={3} />}
    </AppModal>
  );
};
