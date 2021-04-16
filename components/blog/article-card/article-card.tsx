import React, { FC } from 'react';
import styles from './article-card.module.scss';
import { ArticleMeta, ArticleMetaProps } from '../article-meta/article-meta';
import { TagListContainer } from '../tag-list-container/tag-list-container';
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle
} from '@fluentui/react';

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
  return (
    <DocumentCard>
      <DocumentCardPreview previewImages={[{ previewImageSrc: thumbnailUrl }]} />
      <DocumentCardDetails>
        <ArticleMeta {...meta} />
        <DocumentCardTitle title={title} />
        <p className={styles.summary}>{summary}</p>
        <TagListContainer tags={tags} />
      </DocumentCardDetails>
    </DocumentCard>
  );
};
