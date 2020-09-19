import { AppFrame } from '../../components/frame';
import React from 'react';
import styles from './index.module.scss';
import useSWR from 'swr';
import { ProblemLoadingIndicator } from '../../components/puzzle/problem-loading-indicator';
import { Problem } from '../../components/puzzle/problem';
import { fetchFromApi } from '../../utils/api';

export type GetPuzzleResponse = {
  id: number;
  title: string;
  contentHtml: string;
  script: string;
};

export default function PuzzlePage() {
  const { data, error } = useSWR<GetPuzzleResponse>('puzzle', fetchFromApi);
  return (
    <AppFrame>
      <title>解密 · SYSUMSC</title>
      <div className={styles.rootContainer}>
        <div className={styles.centerContainer}>
          {!error && !data && <ProblemLoadingIndicator loading={true} />}
          {error && (
            <ProblemLoadingIndicator
              errorMessage={error.statusCode === 401 ? '请登录再进行解迷' : error.message}
            />
          )}
          {data && (
            <Problem
              id={data.id}
              title={data.title}
              contentHtml={data.contentHtml}
              script={data.script}
            />
          )}
        </div>
      </div>
    </AppFrame>
  );
}
