import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './problem.module.scss';
import { Form } from 'react-bootstrap';
import { AsyncDataButton } from '../shared/async-data-button/async-data-button';
import { useAsyncAction } from '../../utils/utils';
import { fetchFromApi } from '../../utils/api';
import { mutate } from 'swr';

export type ProblemProps = {
  id: number;
  title: string;
  contentHtml: string;
  script: string;
};

type SubmitAnswerDto = {
  answer: string;
};

type SubmitAnswerResponse = {
  passed: boolean;
};

export const Problem: FC<ProblemProps> = ({ id, title, contentHtml, script }) => {
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting, errorMessage, setErrorMessage] = useAsyncAction();
  const instance = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.innerHTML = script;
    instance.current.appendChild(scriptTag);
  }, []);
  return (
    <div className={styles.rootContainer}>
      <h2 className={styles.title}>
        <span className={styles.index}>#{id}</span>
        {title}
      </h2>
      <div ref={instance} />
      <div
        className={styles.problemDetailContainer}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <p>输入你的答案</p>
      <Form.Control
        className={styles.answerInput}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
      />
      <AsyncDataButton
        variant="primary"
        type="submit"
        className={styles.submitButton}
        extra={{ isLoading: submitting, errorMessage: errorMessage }}
        disabled={!answer}
        onClick={() => {
          setSubmitting(true);
          const dto: SubmitAnswerDto = { answer };
          fetchFromApi<SubmitAnswerResponse>('puzzle', {
            method: 'POST',
            body: JSON.stringify(dto)
          })
            .then((response) => {
              if (response.passed) {
                mutate('puzzle').then(() => setAnswer(''));
              }
            })
            .catch((error) => setErrorMessage(error.message))
            .finally(() => setSubmitting(false));
        }}
      >
        提交
      </AsyncDataButton>
    </div>
  );
};
