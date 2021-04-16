import React, { FC, FormEvent, useState } from 'react';
import { useAsyncAction } from '../../../utils/utils';
import { fetchFromApi } from '../../../utils/api';
import styles from './register-modal.module.scss';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { mutate } from 'swr';
import { ProgressIndicator, TextField } from '@fluentui/react';
import { AppModal } from '../../shared/app-modal/app-modal';

export type RegisterModalProps = {
  showModal: boolean;
  onHide: () => any;
};

interface UserRegisterDto {
  email: string;
  password: string;
}

interface UserRegisterResponse {
  token: string;
}

export const RegisterModal: FC<RegisterModalProps> = ({ showModal, onHide }) => {
  const [registering, setRegistering, errorMessage, setErrorMessage] = useAsyncAction();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(form: HTMLFormElement) {
    const dto: UserRegisterDto = { email, password };
    if (form.checkValidity()) {
      setRegistering(true);
      try {
        await fetchFromApi<UserRegisterResponse>(
          'user/register',
          {
            method: 'POST',
            body: JSON.stringify(dto)
          },
          true
        );
        Promise.all([mutate('user/profile'), mutate('puzzle/problem')]);
        onHide();
      } catch (error) {
        setErrorMessage(error.message);
        setRegistering(false);
      }
    }
  }

  return (
    <AppModal titleAriaId="register-modal" isOpen={showModal} onDismiss={onHide} caption="注册">
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
          description="邮箱地址主要用于找回密码、活动通知、面试结果通知等"
          value={email}
          onChange={(_, value) => setEmail(value)}
          disabled={registering}
          required={true}
        />
        <TextField
          label="密码"
          type="password"
          pattern="[a-zA-Z0-9#@!~%^&*]{8,64}"
          description="长度至少大于8个字符，仅支持英文、数字以及一些特殊字符"
          value={password}
          onChange={(_, value) => setPassword(value)}
          disabled={registering}
          required={true}
        />
        <div className={styles.buttonContainer}>
          <AsyncDataButton
            type="submit"
            text="注册"
            extra={{ isLoading: registering, errorMessage }}
          />
        </div>
      </form>
      {registering && <ProgressIndicator barHeight={3} />}
    </AppModal>
  );
};
