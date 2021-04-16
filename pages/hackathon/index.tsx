import styles from './index.module.scss';
import { AppFrame } from '../../components/frame';
import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';
import { fetchFromApi } from '../../utils/api';
import { GetPuzzleProblemsResponse } from '../puzzle';
import { LoadingIndicatorWithMessage } from '../../components/shared/loading-indicator-with-message/loading-indicator-with-message';
import { HackathonIndex } from '../../components/hackathon/hackathon-index/hackathon-index';

export default function PuzzleIndexPage() {
  const { data, error } = useSWR<GetPuzzleProblemsResponse>('puzzle/problem', fetchFromApi, {
    shouldRetryOnError: false
  });
  return (
    <AppFrame hideFooter={true}>
      <Head>
        <title>2021“智慧校园”黑客马拉松 · SYSUMSC</title>
      </Head>
      <div className={styles.rootContainer}>
        {!error && !data && <LoadingIndicatorWithMessage loading={true} />}
        {error && (
          <LoadingIndicatorWithMessage
            errorMessage={error.message === 'Unauthorized' ? '请先登录再进行报名' : error.message}
          />
        )}
        <HackathonIndex />
      </div>
    </AppFrame>
  );
}
