import React, { FC, FormEvent, useState } from 'react';
import { useAsyncAction } from '../../../utils/utils';
import { Form, Modal } from 'react-bootstrap';
import { fetchFromApi } from '../../../utils/api';
import styles from '../login-modal/login-modal.module.scss';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { CheckOutlined } from '@ant-design/icons';

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
  const [validated, setValidated] = useState(false);
  const [requesting, setRequesting, errorMessage, setErrorMessage] = useAsyncAction();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
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
            const dto: PasswordResetRequestDto = { email };
            if (form.checkValidity()) {
              setRequesting(true);
              fetchFromApi(
                'user/reset-request',
                {
                  method: 'POST',
                  body: JSON.stringify(dto)
                },
                true
              )
                .then(() => setSuccess(true))
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
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={requesting || success}
            />
            <Form.Text muted>你的邮箱将收到一封含有指向「重置密码」页面的链接的邮件</Form.Text>
          </Form.Group>
          <div className={styles.buttonContainer}>
            <AsyncDataButton
              variant="primary"
              type="submit"
              extra={{ isLoading: requesting, forceDisabled: success, errorMessage }}
            >
              {!success ? (
                '发送邮件'
              ) : (
                <>
                  <CheckOutlined />
                  邮件已发送
                </>
              )}
            </AsyncDataButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
