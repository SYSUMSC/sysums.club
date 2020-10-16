import React, { FC, FormEvent, useState } from 'react';
import { useAsyncAction } from '../../../utils/utils';
import { Form, Modal } from 'react-bootstrap';
import { fetchFromApi } from '../../../utils/api';
import styles from './register-modal.module.scss';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { mutate } from 'swr';

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
  const [validated, setValidated] = useState(false);
  const [registering, setRegistering, errorMessage, setErrorMessage] = useAsyncAction();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Modal show={showModal} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>注册</Modal.Title>
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
            const dto: UserRegisterDto = { email, password };
            if (form.checkValidity()) {
              setRegistering(true);
              fetchFromApi<UserRegisterResponse>(
                'user/register',
                {
                  method: 'POST',
                  body: JSON.stringify(dto)
                },
                true
              )
                .then(() => {
                  mutate('user/profile');
                  mutate('puzzle/problem');
                  onHide();
                })
                .catch((error) => {
                  setErrorMessage(error.message);
                  setRegistering(false);
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
              disabled={registering}
            />
            <Form.Text muted>邮箱地址主要用于找回密码、面试结果通知等</Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>密码</Form.Label>
            <Form.Control
              required
              type="password"
              pattern="[a-zA-Z0-9#@!~%^&*]{8,64}"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={registering}
            />
            <Form.Text muted>长度至少大于8个字符，仅支持英文、数字以及一些特殊字符</Form.Text>
            <Form.Text muted>若忘记密码，可在登录对话框中点击「忘记密码」</Form.Text>
          </Form.Group>
          <div className={styles.buttonContainer}>
            <AsyncDataButton
              variant="primary"
              type="submit"
              extra={{ isLoading: registering, errorMessage }}
            >
              注册
            </AsyncDataButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
