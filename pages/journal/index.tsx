import { AppFrame } from '../../components/frame';
import Head from 'next/head';
import styles from './index.module.scss';
import React from 'react';
import { JournalCard } from '../../components/journal/journal-card/journal-card';

export default function JournalIndexPage() {
  return (
    <AppFrame>
      <Head>
        <title>社刊 · SYSUMSC</title>
      </Head>
      <div className={styles.rootContainer}>
        <JournalCard
          pdfUrl="https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/journal-pdf/vol0.pdf"
          coverImageUrl="https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/journal-cover/cover-vol0.png"
        />
      </div>
    </AppFrame>
  );
}
