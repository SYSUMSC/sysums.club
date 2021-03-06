import React, { FC, useEffect, useState } from 'react';
import styles from './user-status.module.scss';
import { useUser } from '../../utils/use-user';
import { LoginModal } from './login-modal/login-modal';
import { LoadingOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons';
import { RegisterModal } from './register-modal/register-modal';
import { PasswordResetRequestModal } from './password-reset-request-modal/password-reset-request-modal';
import { useRouter } from 'next/router';
import { PasswordResetModal } from './password-reset-modal/password-reset-modal';
import { fetchFromApi } from '../../utils/api';

export const UserStatus: FC = () => {
  const { query } = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPasswordResetRequestModal, setShowPasswordResetRequestModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [passwordResetQuery, setPasswordResetQuery] = useState({});
  const { user, isLoading, isErrored } = useUser();
  useEffect(() => {
    if (query['email'] && query['token']) {
      setPasswordResetQuery({ ...query });
      setShowPasswordResetModal(true);
    }
  }, [query]);
  return (
    <>
      {isLoading && <LoadingOutlined />}
      {isErrored && <WarningOutlined className={styles.warningIcon} />}
      {showLoginModal && (
        <LoginModal
          showModal={true}
          onHide={() => setShowLoginModal(false)}
          onShowPasswordResetRequestButtonClick={() => {
            setShowLoginModal(false);
            setShowPasswordResetRequestModal(true);
          }}
        />
      )}
      {showRegisterModal && (
        <RegisterModal showModal={true} onHide={() => setShowRegisterModal(false)} />
      )}
      {showPasswordResetRequestModal && (
        <PasswordResetRequestModal
          showModal={showPasswordResetRequestModal}
          onHide={() => setShowPasswordResetRequestModal(false)}
        />
      )}
      {showPasswordResetModal && (
        <PasswordResetModal
          showModal={showPasswordResetModal}
          onHide={() => setShowPasswordResetModal(false)}
          email={passwordResetQuery['email']}
          token={passwordResetQuery['token']}
        />
      )}
      {!user && !isLoading && (
        <>
          <span className={styles.textButton} onClick={() => setShowLoginModal(true)}>
            登录
          </span>
          <span className={styles.split}> / </span>
          <span className={styles.textButton} onClick={() => setShowRegisterModal(true)}>
            注册
          </span>
        </>
      )}
      {user && (
        <>
          <UserOutlined className={styles.userIcon} />
          <span>{user.email}</span>
          <span
            className={`${styles.textButton} ${styles.logoutButton}`}
            onClick={() =>
              fetchFromApi('user/logout', { method: 'POST' }, true).then(() =>
                window.location.href = '/'
              )
            }
          >
            注销
          </span>
        </>
      )}
    </>
  );
};
