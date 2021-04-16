import styles from './AppModal.module.scss';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { IconButton, IModalProps, Modal } from '@fluentui/react';

export interface AppModalProps {
  caption: string;
}

export const AppModal: FC<PropsWithChildren<AppModalProps> & IModalProps> = ({
  caption,
  children,
  ...props
}) => (
  <Modal {...props}>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.caption}>{caption}</h2>
        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={props.onDismiss} />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  </Modal>
);
