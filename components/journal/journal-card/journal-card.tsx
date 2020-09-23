import React, { FC } from 'react';
import styles from './journal-card.module.scss';

export type JournalCardProps = {
  pdfUrl: string;
  coverImageUrl: string;
};

export const JournalCard: FC<JournalCardProps> = ({ pdfUrl, coverImageUrl }) => (
  <div className={styles.container}>
    <a target="_blank" href={pdfUrl} rel="noopener">
      <img className={styles.cover} alt="" src={coverImageUrl} draggable={false} />
    </a>
  </div>
);
