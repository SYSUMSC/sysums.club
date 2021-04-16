import React, { FC, FormEvent, useState } from 'react';
import styles from './login-modal.module.scss';
import { fetchFromApi } from '../../../utils/api';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { useAsyncAction } from '../../../utils/utils';
import { mutate } from 'swr';
import { DefaultButton, Modal, ProgressIndicator, TextField } from '@fluentui/react';
import { AppModal } from '../../shared/modal/AppModal';

export type LoginModalProps = {
  showModal: boolean;
  onHide: () => any;
  onShowPasswordResetRequestButtonClick: () => any;
};

interface UserLoginDto {
  email: string;
  password: string;
}

interface UserLoginResponse {
  token: string;
}

export const LoginModal: FC<LoginModalProps> = ({
  showModal,
  onHide,
  onShowPasswordResetRequestButtonClick
}) => {
  const [loggingIn, setLoggingIn, errorMessage, setErrorMessage] = useAsyncAction();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(form: HTMLFormElement) {
    const dto: UserLoginDto = { email, password };
    if (form.checkValidity()) {
      setLoggingIn(true);
      try {
        await fetchFromApi<UserLoginResponse>(
          'user/login',
          {
            method: 'POST',
            body: JSON.stringify(dto)
          },
          true
        );
        Promise.all([mutate('user/profile'), mutate('puzzle/problem'), mutate('recruit')]);
        onHide();
      } catch (error) {
        setErrorMessage(error.message);
        setLoggingIn(false);
      }
    }
  }

  return (
    <AppModal titleAriaId="login-modal" isOpen={showModal} onDismiss={onHide} caption="登录">
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit(event.currentTarget);
        }}
      >
        <TextField
          label="邮箱地址"
          type="email"
          value={email}
          onChange={(_, value) => setEmail(value)}
          disabled={loggingIn}
          required={true}
        />
        <TextField
          label="密码"
          type="password"
          value={password}
          onChange={(_, value) => setPassword(value)}
          disabled={loggingIn}
          required={true}
        />
        <div className={styles.buttonContainer}>
          <AsyncDataButton
            type="submit"
            primary={true}
            text="登录"
            extra={{ isLoading: loggingIn, errorMessage }}
          />
          <DefaultButton
            type="button"
            text="忘记密码"
            disabled={loggingIn}
            onClick={onShowPasswordResetRequestButtonClick}
          />
        </div>
      </form>
      {loggingIn && <ProgressIndicator barHeight={3} />}
    </AppModal>
  );
};
