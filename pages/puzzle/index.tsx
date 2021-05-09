import { AppFrame } from '../../components/frame';
import React from 'react';
import styles from './index.module.scss';
import { LoadingIndicatorWithMessage } from '../../components/shared/loading-indicator-with-message/loading-indicator-with-message';
import useSWR from 'swr';
import { fetchFromApi } from '../../utils/api';
import { PuzzleIndex } from '../../components/puzzle/puzzle-index/puzzle-index';
import Head from 'next/head';

export type GetPuzzleProblemsResponse = {
  submissionsCount: number;
  problems: {
    id: number;
    level: number;
    title: string;
    passed: boolean;
  }[];
};

export default function PuzzleIndexPage() {
  const { data, error } = useSWR<GetPuzzleProblemsResponse>('puzzle/problem', fetchFromApi, {
    shouldRetryOnError: false
  });
  return (
    <AppFrame hideFooter={true}>
      <Head>
        <title>解谜 · SYSUMSC</title>
      </Head>
      <div className={styles.rootContainer}>
        <div className={styles.centerContainer}>
          {!error && !data && (
            <LoadingIndicatorWithMessage loading={true} extraStyles={{ color: '#f8f9fa' }} />
          )}
          {error && (
            <LoadingIndicatorWithMessage
              errorMessage={error.message === 'Unauthorized' ? '请先登录再进行解谜' : error.message}
              extraStyles={{ color: '#f8f9fa' }}
            />
          )}
          {data && (
            <PuzzleIndex submissionsCount={data.submissionsCount} problems={data.problems} />
          )}
        </div>
      </div>
    </AppFrame>
  );
}
