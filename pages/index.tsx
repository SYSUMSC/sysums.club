import { AppFrame } from '../components/frame';
import styles from './index.module.scss';
import React from 'react';
import { Carousel } from 'react-bootstrap';

const carouselImageUrls = [
  'https://wp.sysums.club/wp-content/uploads/2020/08/1151596377469_.pic_hd-scaled.jpg',
  'https://wp.sysums.club/wp-content/uploads/2020/08/1161596377470_.pic_hd-scaled.jpg'
];

export default function HomePage() {
  return (
    <AppFrame>
      <div className={styles.rootContainer}>
        <div className={styles.carouselContainer}>
          <Carousel indicators={false} controls={false}>
            {carouselImageUrls.map((url) => (
              <Carousel.Item key={url}>
                <img className={styles.carouselImage} src={url} alt="" />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className={styles.textContainer}>
            <h1 className={styles.slogan}>予力众生 成就不凡</h1>
            <p className={styles.description}>
              我们是中山大学微软俱乐部，<a href="/about">加入我们</a>！
            </p>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>

          </div>
        </div>
      </div>
    </AppFrame>
  );
}
