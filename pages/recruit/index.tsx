import React from 'react';
import styles from './index.module.scss';
import Head from 'next/head';
import { AppFrame } from '../../components/frame';
import useSWR from 'swr';
import { fetchFromApi } from '../../utils/api';
import { LoadingIndicatorWithMessage } from '../../components/shared/loading-indicator-with-message/loading-indicator-with-message';
import { RecruitIndex } from '../../components/recruit/recruit-index/recruit-index';

export type GetRecruitmentStateResponse = {
  recruitProgress: number;
  form: {
    user_id: string;
    name: string;
    email: string;
    phone_number: string;
    gender: number;
    grade: string;
    college: string;
    student_id: string;
    political_role: string;
    self_intro: string;
    wishes: string;
  };
};

export default function RecruitIndexPage() {
  const { data, error } = useSWR<GetRecruitmentStateResponse>('recruit', fetchFromApi, {
    shouldRetryOnError: false
  });
  return (
    <AppFrame hideFooter={true}>
      <Head>
        <title>招新 · SYSUMSC</title>
      </Head>
      <div className={styles.rootContainer}>
        <div className={styles.centerContainer}>
          {!error && !data && <LoadingIndicatorWithMessage loading={true} />}
          {error && (
            <LoadingIndicatorWithMessage
              errorMessage={
                error.message === 'Unauthorized' ? '请先登录再进行招新报名' : error.message
              }
            />
          )}
          {data && (
            <RecruitIndex
              recruitProgress={data.recruitProgress}
              initialForm={{
                name: data.form.name,
                email: data.form.email,
                phoneNumber: data.form.phone_number,
                gender: data.form.gender,
                grade: data.form.grade,
                college: data.form.college,
                studentId: data.form.student_id,
                politicalRole: data.form.political_role,
                selfIntroduction: data.form.self_intro,
                wishes: data.form.wishes
              }}
            />
          )}
        </div>
      </div>
    </AppFrame>
  );
}
