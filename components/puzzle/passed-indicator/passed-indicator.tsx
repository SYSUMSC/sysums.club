import React, { FC, useEffect, useState } from 'react';
import styles from './passed-indicator.module.scss';
import { Image } from '@fluentui/react';

const IMAGE_URLS = [
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/passed-1.jpg',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/passed-2.jpg'
];

export const PassedIndicator: FC = () => {
  const [imgSrc, setImgSrc] = useState<string>();
  useEffect(() => setImgSrc(IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)]), []);
  return (
    <div className={styles.container}>
      <Image alt="Problem Solved" src={imgSrc} draggable={false} shouldFadeIn={true} />
      <h3 className={styles.congratulation}>你解开了这道谜题!</h3>
    </div>
  );
};
