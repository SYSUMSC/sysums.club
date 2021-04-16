import React, { FC } from 'react';
import styles from './article-card-simple.module.scss';
import { useRouter } from 'next/router';
import { DocumentCard, DocumentCardDetails } from '@fluentui/react';

export type ArticleCardSimpleProps = {
  articleId: string;
  title: string;
  authorId: string;
  authorName: string;
  date: string;
};

export const ArticleCardSimple: FC<ArticleCardSimpleProps> = ({
  articleId,
  authorId,
  authorName,
  date,
  title
}) => {
  const router = useRouter();
  return (
    <DocumentCard>
      <DocumentCardDetails>
        <span className={styles.meta}>
          <a href={`/blog/author/${authorId}`}>{authorName}</a>
          <span className={styles.date}>{date}</span>
        </span>
        <span className={styles.title} onClick={() => router.push(`/blog/article/${articleId}`)}>
          {title}
        </span>
      </DocumentCardDetails>
    </DocumentCard>
  );
};
