import styles from './password-reset-modal.module.scss';
import React, { FC, FormEvent, useState } from 'react';
import { useAsyncAction } from '../../../utils/utils';
import { Form, Modal } from 'react-bootstrap';
import { fetchFromApi } from '../../../utils/api';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { CheckOutlined } from '@ant-design/icons';

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
  const [validated, setValidated] = useState(false);
  const [requesting, setRequesting, errorMessage, setErrorMessage] = useAsyncAction();
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  return (
    <Modal show={showModal} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>重置密码</Modal.Title>
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
            const dto: PasswordResetDto = { email, password, token };
            if (form.checkValidity()) {
              setRequesting(true);
              fetchFromApi(
                'user/reset',
                {
                  method: 'POST',
                  body: JSON.stringify(dto)
                },
                true
              )
                .then(() => {
                  setSuccess(true);
                  setTimeout(() => window.location.reload(), 3000);
                })
                .catch((error) => setErrorMessage(error.message))
                .finally(() => {
                  setRequesting(false);
                  setValidated(false);
                });
            }
          }}
        >
          <Form.Group controlId="email">
            <Form.Label>邮箱地址</Form.Label>
            <Form.Control required type="email" value={email} disabled={true} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>新密码</Form.Label>
            <Form.Control
              required
              type="password"
              pattern="[a-zA-Z0-9#@!~%^&*]{8,64}"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={requesting}
            />
          </Form.Group>
          <div className={styles.buttonContainer}>
            <AsyncDataButton
              variant="primary"
              type="submit"
              extra={{ isLoading: requesting, forceDisabled: success, errorMessage }}
            >
              {!success ? (
                '重置密码'
              ) : (
                <>
                  <CheckOutlined />
                  重置成功，页面即将刷新
                </>
              )}
            </AsyncDataButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
