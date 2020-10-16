import { AppFrame } from '../../../components/frame';
import React from 'react';
import styles from './[id].module.scss';
import useSWR from 'swr';
import { LoadingIndicatorWithMessage } from '../../../components/shared/loading-indicator-with-message/loading-indicator-with-message';
import { fetchFromApi } from '../../../utils/api';
import { useRouter } from 'next/router';
import { Problem } from '../../../components/puzzle/problem/problem';
import Head from 'next/head';

export type GetProblemDetailResponse = {
  id: number;
  title: string;
  content_html: string;
  script: string;
};

export default function PuzzlePage() {
  const { id } = useRouter().query;
  const { data, error } = useSWR<GetProblemDetailResponse>(
    id ? `puzzle/problem/${id}` : null,
    fetchFromApi,
    {
      shouldRetryOnError: false
    }
  );
  return (
    <AppFrame hideFooter={true}>
      <Head>
        <title>{data?.title ? `${data.title} · ` : ''}解迷 · SYSUMSC</title>
      </Head>
      <div className={styles.rootContainer}>
        <div className={styles.centerContainer}>
          {!error && !data && <LoadingIndicatorWithMessage loading={true} />}
          {error && (
            <LoadingIndicatorWithMessage
              errorMessage={error.message === 'Unauthorized' ? '请先登录再进行解迷' : error.message}
            />
          )}
          {data && (
            <Problem
              id={data.id}
              title={data.title}
              contentHtml={data.content_html}
              script={data.script}
            />
          )}
        </div>
      </div>
    </AppFrame>
  );
}
