import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './problem.module.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { useAsyncAction } from '../../../utils/utils';
import { fetchFromApi } from '../../../utils/api';
import { useRouter } from 'next/router';
import { PassedIndicator } from '../passed-indicator/passed-indicator';

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
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting, errorMessage, setErrorMessage] = useAsyncAction();
  const [passed, setPassed] = useState(false);
  const instance = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!passed) {
      window['PROBLEM_ID'] = id;
      const scriptTag = document.createElement('script');
      scriptTag.innerHTML = script;
      instance.current.appendChild(scriptTag);
    }
  }, [id]);
  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.title}>
        <Button
          className={styles.goBackButton}
          variant="outline-light"
          onClick={() => router.push('/puzzle')}
        >
          返回
        </Button>
        {title}
      </h3>
      {passed && <PassedIndicator />}
      {!passed && (
        <>
          <div ref={instance} />
          <div
            className={styles.problemDetailContainer}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <p>输入你的答案</p>
          <InputGroup>
            <Form.Control
              className={styles.answerInput}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
            <InputGroup.Append>
              <AsyncDataButton
                className={styles.submitButton}
                variant="outline-primary"
                type="submit"
                extra={{ isLoading: submitting, errorMessage: errorMessage }}
                disabled={!answer}
                onClick={() => {
                  setSubmitting(true);
                  const dto: SubmitAnswerDto = { answer };
                  fetchFromApi<SubmitAnswerResponse>(`puzzle/problem/${id}`, {
                    method: 'POST',
                    body: JSON.stringify(dto)
                  })
                    .then((response) => setPassed(response.passed))
                    .catch((error) => setErrorMessage(error.message))
                    .finally(() => setSubmitting(false));
                }}
              >
                提交
              </AsyncDataButton>
            </InputGroup.Append>
          </InputGroup>
        </>
      )}
    </div>
  );
};
