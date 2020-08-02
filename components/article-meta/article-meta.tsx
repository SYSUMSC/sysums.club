import React, { FC } from 'react';
import styles from './article-meta.module.scss';

export type ArticleMetaProps = {
  authorId: string;
  authorName: string;
  date: string;
  wordCount: number;
};

export const ArticleMeta: FC<ArticleMetaProps> = ({ authorName, authorId, date, wordCount }) => (
  <div className={styles.metaContainer}>
    <a href={`/blog/author/${authorId}`}>{authorName}</a>
    <span>{date}</span>
    <span>{`${wordCount}字`}</span>
  </div>
);
