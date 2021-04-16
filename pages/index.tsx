import { AppFrame } from '../components/frame';
import styles from './index.module.scss';
import React from 'react';
import Head from 'next/head';
import Slider from 'react-slick';

const CAROUSEL_IMAGE_URLS = [
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/carousel/1.jpg',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/carousel/2.jpg',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/carousel/3.jpg',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/carousel/4.png',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/carousel/5.png'
];

export default function HomePage() {
  return (
    <AppFrame>
      <Head>
        <title>首页 · SYSUMSC</title>
      </Head>
      <div className={styles.rootContainer}>
        <div className={styles.carouselContainer}>
          <Slider
            dots={false}
            arrows={false}
            infinite={true}
            speed={800}
            slidesToShow={1}
            autoplay={true}
            autoplaySpeed={3500}
            className={styles.carousel}
          >
            {CAROUSEL_IMAGE_URLS.map((url) => (
              <img className={styles.carouselImage} key={url} src={url} />
            ))}
          </Slider>
          <div className={styles.textContainer}>
            <h1 className={styles.slogan}>予力众生 成就不凡</h1>
            <p className={styles.description}>我们是中山大学微软俱乐部</p>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <section className={styles.contentSection}>
              <h1 className={styles.title}>我们是谁</h1>
              <p className={styles.paragraph}>
                我们是来自中山大学的技术类社团 MS Club（缩写
                SYSUMSC)。在我们这里，你能结识到不少热衷于编程技术的伙伴，相互探讨、共同进步，还能获得来自
                MSRA（微软亚洲研究院）导师的亲自指导，结识技术大牛，接触前沿技术，感受微软文化。我们每年都会有部员参加微软夏令营，优秀的部员更有
                MSRA
                实习内推机会。如果你对技术感兴趣、对微软感兴趣，对融洽的社团氛围感到向往，那么这里将不容错过。
              </p>
            </section>
            <section className={styles.contentSection}>
              <h1 className={styles.title}>我们的简史</h1>
              <p className={styles.paragraph}>
                本俱乐部于 2002 年 6 月由中山大学研究生会发起，并于同年在珠海校区成立分会，2006 年 3
                月成立东校区分会。现阶段总会在东校区，其他分会暂取消运作。
                微软学生俱乐部实践空间站于 2017 年 11 月正式上线，目前有 16
                个不同主题的项目供同学们研究，项目横跨 AI、MR、Cloud & Cognitive Service 三大领域。
                编程之美挑战赛是微软面对学生开展的大型编程比赛，迄今为止已经成功举办了六届，现已成为以解决挑战性问题为目标的代码高手切磋交流的平台。
                微软学生夏令营从 2000 年开始，是 MSRA
                学术合作部和亚太地区高校合作培养人才的成功实践。
              </p>
            </section>
            <section className={styles.contentSection}>
              <h1 className={styles.title}>
                “学习先进技术，开括创新思维，体验多元文化，成就一流人才”
              </h1>
              <p className={styles.quoteSource}>是我们不变的宗旨。</p>
            </section>
            <section className={styles.contentSection}>
              <h1 className={styles.title}>“东校区第一技术社团”</h1>
              <p className={styles.quoteSource}>是对我们的普遍评价。</p>
            </section>
            <section className={styles.contentSection}>
              <h1 className={styles.title}>我们的活动内容</h1>
              <p className={styles.paragraph}>
                无论是人工智能、机器学习、Web开发、UWP开发、游戏开发、ACM、信息安全，还是Windows、小冰、Surface、Xbox、Hololens，
                或是
                .NET、C#、F#、TypeScript、Haskell、Java、Python、Rust、Go，抑或是黑客马拉松、编程之美、研究院项目、
                技术沙龙和交流会，甚至是参观访问、轰趴、烧烤、暑实、节日活动等等，这里都应有尽有。如果你对技术感兴趣、对微软感兴趣，
                那么这里将不容错过。在这里，我们将鼓励每一位部员，成就不凡。
              </p>
            </section>
            <section className={styles.contentSection}>
              <h1 className={styles.title}>我们的活动照片</h1>
              <figure className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src="https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/tech-share.jpg"
                  alt="技术分享的图片"
                />
                <figcaption className={styles.caption}>
                  <h3 className={styles.captionTitle}>技术分享</h3>
                  <p className={styles.description}>每周举办技术分享，传播知识，共进发展。</p>
                </figcaption>
              </figure>
              <figure className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src="https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/hackathon.png"
                  alt="黑客松的图片"
                />
                <figcaption className={styles.caption}>
                  <h3 className={styles.captionTitle}>黑客松</h3>
                  <p className={styles.description}>每年定期举办黑客松，紧张刺激，挑战自我。</p>
                </figcaption>
              </figure>
              <figure className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src="https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/team-build.png"
                  alt="团建的图片"
                />
                <figcaption className={styles.caption}>
                  <h3 className={styles.captionTitle}>团队建设</h3>
                  <p className={styles.description}>每年定期举办团建活动，相互协作，增进友谊。</p>
                </figcaption>
              </figure>
            </section>
            <section className={styles.contentSection}>
              <h1 className={styles.title}>加入我们</h1>
              <p className={styles.quoteSource}>
                每年九月中旬前后我们都会举行招新活动，请留意我们在
                <a
                  href="https://mp.weixin.qq.com/s/jBrrgkhmDRwZdyl_JikW4A"
                  rel="noopener"
                  target="_blank"
                >
                  微信公众号
                </a>
                中发布的招新公告。
              </p>
            </section>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
