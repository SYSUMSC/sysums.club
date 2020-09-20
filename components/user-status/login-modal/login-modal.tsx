import React, { FC, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './login-modal.module.scss';
import { fetchFromApi } from '../../../utils/api';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { useAsyncAction } from '../../../utils/utils';
import { mutate } from 'swr';

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
  const [validated, setValidated] = useState(false);
  const [loggingIn, setLoggingIn, errorMessage, setErrorMessage] = useAsyncAction();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Modal show={showModal} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>登录</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            const dto: UserLoginDto = { email, password };
            if (form.checkValidity()) {
              setLoggingIn(true);
              fetchFromApi<UserLoginResponse>(
                'user/login',
                {
                  method: 'POST',
                  body: JSON.stringify(dto)
                },
                true
              )
                .then(() => {
                  onHide();
                  mutate('user/profile');
                  mutate('puzzle/problem');
                })
                .catch((error) => setErrorMessage(error.message))
                .finally(() => {
                  setLoggingIn(false);
                  setValidated(false);
                });
            }
          }}
        >
          <Form.Group controlId="email">
            <Form.Label>邮箱地址</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loggingIn}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>密码</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loggingIn}
            />
          </Form.Group>
          <div className={styles.buttonContainer}>
            <AsyncDataButton
              variant="primary"
              type="submit"
              extra={{ isLoading: loggingIn, errorMessage }}
            >
              登录
            </AsyncDataButton>
            <Button
              variant="light"
              type="button"
              disabled={loggingIn}
              onClick={onShowPasswordResetRequestButtonClick}
            >
              忘记密码
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
