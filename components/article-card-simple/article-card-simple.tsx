import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import styles from './article-card-simple.module.scss';
import { useRouter } from 'next/router';

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
    <Card>
      <article className={styles.articleInfoContainer}>
        <span className={styles.meta}>
          <a href={`/blog/author/${authorId}`}>{authorName}</a>
          <span className={styles.date}>{date}</span>
        </span>
        <span className={styles.title} onClick={() => router.push(`/blog/article/${articleId}`)}>
          {title}
        </span>
      </article>
    </Card>
  );
};
