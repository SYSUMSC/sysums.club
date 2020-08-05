import { AppFrame } from '../components/frame';
import styles from './index.module.scss';
import React from 'react';
import { Carousel } from 'react-bootstrap';

const carouselImageUrls = [
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/2020/08/1151596377469_.pic_hd-scaled.jpg',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/2020/08/hackathon.png'
];

export default function HomePage() {
  return (
    <AppFrame>
      <title>首页 · SYSUMSC</title>
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
            <section className={styles.contentSection}>
              <h4 className={styles.title}>我们是谁</h4>
              <p className={styles.paragraph}>
                我们是中山大学的技术类社团MS
                Club（缩写SYSUMSC)，我们本着“学习先进技术，开拓创新思维，体验多元文化，成就一流人才”的宗旨，
                在MS Club，你能获得来自 MSRA（微软亚洲研究院）
                导师的亲自指导，结识技术大牛，接触前沿技术，感受微软文化，参加微软夏令营， 更有 MSRA
                实习内推机会。
              </p>
            </section>
            <section className={styles.contentSection}>
              <h4 className={styles.title}>我们的活动内容</h4>
              <p className={styles.paragraph}>
                无论是人工智能、机器学习、Web开发、UWP开发、游戏开发、ACM、信息安全，还是Windows、小冰、Surface、Xbox、Hololens，
                或是
                .NET、C#、F#、TypeScript、Haskell、Java、Python、Rust、Go，抑或是黑客马拉松、编程之美、研究院项目、
                技术沙龙和交流会，甚至是参观访问、轰趴、烧烤、暑实、节日活动等等，这里都应有尽有。如果你对技术感兴趣、对微软感兴趣，
                那么这里将不容错过。在这里，我们将鼓励每一位部员，成就不凡。
              </p>
            </section>
            <section className={styles.contentSection}>
              <h4 className={styles.title}>
                “学习先进技术，开括创新思维，体验多元文化，成就一流人才”
              </h4>
              <p className={styles.quoteSource}>是我们不变的宗旨</p>
            </section>
            <section className={styles.contentSection}>
              <h4 className={styles.title}>“东校区第一技术社团”</h4>
              <p className={styles.quoteSource}>是对我们的普遍评价</p>
            </section>
            <section className={styles.contentSection}>
              <h4 className={styles.title}>我们的照片</h4>
              <figure className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src="https://wp.sysums.club/wp-content/uploads/2020/08/test-scaled.jpg"
                  alt="技术分享的图片"
                />
                <figcaption className={styles.caption}>
                  <h5 className={styles.captionTitle}>技术分享</h5>
                  <p className={styles.description}>每周举办技术分享，特别牛逼，特别精彩！</p>
                </figcaption>
              </figure>
              <figure className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src="https://wp.sysums.club/wp-content/uploads/2020/08/hackathon.png"
                  alt="黑客松的图片"
                />
                <figcaption className={styles.caption}>
                  <h5 className={styles.captionTitle}>黑客松</h5>
                  <p className={styles.description}>每年定期举办的黑客松大赛，基情四射！</p>
                </figcaption>
              </figure>
              <figure className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src="https://wp.sysums.club/wp-content/uploads/2020/08/tb.png"
                  alt="团建的图片"
                />
                <figcaption className={styles.caption}>
                  <h5 className={styles.captionTitle}>团队建设</h5>
                  <p className={styles.description}>每年定期举办的团建活动，好吃又好VAN！</p>
                </figcaption>
              </figure>
            </section>
            <section className={styles.contentSection}>
              <h4 className={styles.title}>加入我们</h4>
              <p className={styles.quoteSource}>每年九月我们都会举行招新活动，请看这里。</p>
            </section>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
