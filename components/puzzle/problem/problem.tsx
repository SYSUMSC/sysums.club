import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './problem.module.scss';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { useAsyncAction } from '../../../utils/utils';
import { fetchFromApi } from '../../../utils/api';
import { useRouter } from 'next/router';
import { PassedIndicator } from '../passed-indicator/passed-indicator';
import { TextField } from '@fluentui/react';
import { GhostButton } from '../../shared/ghost-button/ghost-button';

export type ProblemProps = {
  id: number;
  title: string;
  contentHtml: string;
  script?: string;
};

type SubmitAnswerDto = {
  answer: string;
};

type SubmitAnswerResponse = {
  passed: boolean;
};

export const Problem: FC<ProblemProps> = ({ id, title, contentHtml, script }) => {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting, errorMessage, setErrorMessage] = useAsyncAction();
  const [passed, setPassed] = useState(false);
  const instance = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!passed) {
      window['PROBLEM_ID'] = id;
      if (script) {
        const scriptTag = document.createElement('script');
        scriptTag.innerHTML = script;
        instance.current.appendChild(scriptTag);
      }
    }
  }, [id]);

  async function onClick() {
    setSubmitting(true);
    const dto: SubmitAnswerDto = { answer };
    try {
      const response = await fetchFromApi<SubmitAnswerResponse>(`puzzle/problem/${id}`, {
        method: 'POST',
        body: JSON.stringify(dto)
      });
      setPassed(response.passed);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setSubmitting(false);
  }

  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.titleContainer}>
        <GhostButton onClick={() => router.push('/puzzle')} variant="white">
          返回
        </GhostButton>
        <span className={styles.title}>{title}</span>
      </h3>
      <hr className={styles.divider} />
      {passed && <PassedIndicator />}
      {!passed && (
        <div ref={instance}>
          <div
            className={styles.problemDetailContainer}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <hr className={styles.divider} />
          <p className={styles.answerInputTitle}>你的答案</p>
          <div className={styles.inputContainer}>
            <TextField
              className={styles.answerInput}
              value={answer}
              onChange={(_, value) => setAnswer(value)}
            />
            <AsyncDataButton
              className={styles.submitButton}
              type="submit"
              text="提交"
              extra={{ isLoading: submitting, errorMessage: errorMessage }}
              disabled={!answer}
              onClick={() => onClick()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
