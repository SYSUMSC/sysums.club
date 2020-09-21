import React, { FC } from 'react';
import styles from './article-card.module.scss';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { ArticleMeta, ArticleMetaProps } from '../article-meta/article-meta';
import { TagListContainer } from '../tag-list-container/tag-list-container';

export type ArticleCardProps = {
  articleId: string;
  thumbnailUrl: string;
  meta: ArticleMetaProps;
  title: string;
  summary: string;
  tags: { id: string; name: string }[];
};

export const ArticleCard: FC<ArticleCardProps> = ({
  articleId,
  thumbnailUrl,
  meta,
  title,
  summary,
  tags
}) => {
  const router = useRouter();
  return (
    <Card>
      <Card.Body className={styles.bootstrapCardBody}>
        <article className={styles.card}>
          <div className={styles.thumbnailContainer}>
            <img className={styles.thumbnail} alt="" src={thumbnailUrl} />
          </div>
          <div className={styles.infoContainer}>
            <ArticleMeta {...meta} />
            <div
              className={styles.bodyContainer}
              onClick={() => router.push(`/blog/article/${articleId}`)}
            >
              <h5 className={styles.title}>{title}</h5>
              <p className={styles.summary}>{summary}</p>
            </div>
            <TagListContainer tags={tags} />
          </div>
        </article>
      </Card.Body>
    </Card>
  );
};
