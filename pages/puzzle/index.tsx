import { AppFrame } from '../../components/frame';
import React from 'react';
import styles from './index.module.scss';
import { ProblemLoadingIndicator } from '../../components/puzzle/problem-loading-indicator/problem-loading-indicator';
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
          {!error && !data && <ProblemLoadingIndicator loading={true} />}
          {error && (
            <ProblemLoadingIndicator
              errorMessage={error.message === 'Unauthorized' ? '请先登录再进行解谜' : error.message}
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
