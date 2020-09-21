import React, { FC, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './article-carousel.module.scss';

export type ArticleCarouselProps = {
  articles: { featuredImageUrl: string; title: string }[];
};

export const ArticleCarousel: FC<ArticleCarouselProps> = ({ articles }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className={styles.carouselContainer}>
      <Carousel indicators={false} activeIndex={index} onSelect={(i) => setIndex(i)}>
        {articles.map((article) => (
          <Carousel.Item key={article.title + article.featuredImageUrl}>
            <img className={styles.carouselImage} src={article.featuredImageUrl} alt="" />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className={styles.articleInfoContainer}>
        <h4 className={styles.title}>{articles[index].title}</h4>
      </div>
    </div>
  );
};
