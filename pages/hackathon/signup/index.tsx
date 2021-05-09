import { AppFrame } from '../../../components/frame';
import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';
import { fetchFromApi } from '../../../utils/api';
import { LoadingIndicatorWithMessage } from '../../../components/shared/loading-indicator-with-message/loading-indicator-with-message';
import { HackathonIndex } from '../../../components/hackathon/hackathon-index/hackathon-index';

export default function HackathonSignupIndexPage() {
  const { data, error } = useSWR('hackathon/form', fetchFromApi, {
    shouldRetryOnError: false
  });
  return (
    <AppFrame hideFooter={true}>
      <Head>
        <title>2021“智慧校园”黑客马拉松 · SYSUMSC</title>
      </Head>
      {!error && !data && (
        <div className="flex-grow p-6">
          <LoadingIndicatorWithMessage loading={true} extraStyles={{ color: '#151518' }} />
        </div>
      )}
      {error && (
        <div className="flex-grow p-6">
          <LoadingIndicatorWithMessage
            errorMessage={error.message === 'Unauthorized' ? '请先登录再进行报名' : error.message}
            extraStyles={{ color: '#151518' }}
          />
        </div>
      )}
      {data && <HackathonIndex signupFormData={data as any} />}
    </AppFrame>
  );
}
