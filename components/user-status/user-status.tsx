import React, { FC, useEffect, useState } from 'react';
import styles from './user-status.module.scss';
import { useUser } from '../../utils/use-user';
import { LoginModal } from './login-modal/login-modal';
import { RegisterModal } from './register-modal/register-modal';
import { PasswordResetRequestModal } from './password-reset-request-modal/password-reset-request-modal';
import { useRouter } from 'next/router';
import { PasswordResetModal } from './password-reset-modal/password-reset-modal';
import { fetchFromApi } from '../../utils/api';
import { ActionButton, FontIcon, Spinner, SpinnerSize } from '@fluentui/react';

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
    <div className={styles.container}>
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
      {isLoading && <Spinner size={SpinnerSize.xSmall} />}
      {isErrored && <FontIcon iconName="Warning" className={styles.warningIcon} />}
      {!user && !isLoading && (
        <>
          <ActionButton
            text="登录"
            className={styles.textButton}
            onClick={() => setShowLoginModal(true)}
          />
          <span className={styles.split}>/</span>
          <ActionButton
            text="注册"
            className={styles.textButton}
            onClick={() => setShowRegisterModal(true)}
          />
        </>
      )}
      {user && (
        <>
          <span className={styles.username}>{user.email}</span>
          <ActionButton
            text="注销"
            className={styles.textButton}
            onClick={() =>
              fetchFromApi('user/logout', { method: 'POST' }, true).then(
                () => (window.location.href = '/')
              )
            }
          />
        </>
      )}
    </div>
  );
};
