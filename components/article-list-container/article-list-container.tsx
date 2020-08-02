import React, { FC } from 'react';
import { ArticleCard, ArticleCardProps } from '../article-card/article-card';
import styles from './article-list-container.module.scss';

export type ArticleListContainerProps = {
  cardProps: ArticleCardProps[];
};

export const ArticleListContainer: FC<ArticleListContainerProps> = ({ cardProps }) => {
  return (
    <div className={styles.articleCardContainer}>
      {cardProps.map((card) => (
        <ArticleCard {...card} key={card.articleId} />
      ))}
    </div>
  );
};
