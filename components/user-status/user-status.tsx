import React, { FC, useState } from 'react';
import styles from './user-status.module.scss';
import { useUser } from '../../utils/use-user';
import { Button, Form, Modal } from 'react-bootstrap';

export const UserStatus: FC<{}> = ({}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { notLoggedIn } = useUser();
  return (
    <>
      {notLoggedIn && (
        <>
          <span className={styles.textButton} onClick={() => setShowLoginModal(true)}>
            登录
          </span>
          <span className={styles.split}> / </span>
          <span className={styles.textButton} onClick={() => setShowLoginModal(true)}>
            注册
          </span>
        </>
      )}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>登录</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => {e.preventDefault()}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>邮箱地址</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>密码</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <div className={styles.loginModalButtonContainer}>
              <Button variant="primary" type="submit">
                登录
              </Button>
              <Button variant="light" type="button">
                忘记密码
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
