import React, { FC, useState } from 'react';
import styles from './article-carousel.module.scss';

export type ArticleCarouselProps = {
  articles: { featuredImageUrl: string; title: string }[];
};

export const ArticleCarousel: FC<ArticleCarouselProps> = ({ articles }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.articleInfoContainer}>
        <h4 className={styles.title}>{articles[index].title}</h4>
      </div>
    </div>
  );
};
