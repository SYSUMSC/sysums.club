import React, { FC, useState } from 'react';
import styles from './passed-indicator.module.scss';
import { Image } from 'react-bootstrap';

const IMAGE_URLS = [
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/passed-1.jpg',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/passed-2.jpg'
];

export const PassedIndicator: FC = () => {
  const [imgSrc] = useState(IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)]);
  return (
    <div className={styles.container}>
      <Image alt="Problem Solved" src={imgSrc} draggable={false} fluid />
      <h3 className={styles.congratulation}>你解开了这道谜题!</h3>
    </div>
  );
};
