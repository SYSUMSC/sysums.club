import React, { FC, FormEvent, useEffect, useState } from 'react';
import styles from './recruit-index.module.scss';
import { Alert, Form } from 'react-bootstrap';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { useAsyncAction } from '../../../utils/utils';
import { fetchFromApi } from '../../../utils/api';
import { RecruitProgress } from '../recruit-progress/recruit-progress';

export type RecruitForm = {
  name: string;
  email: string;
  phoneNumber: string;
  gender: number;
  grade: string;
  college: string;
  studentId: string;
  politicalRole: string;
  selfIntroduction: string;
  wishes: string;
};

type UpdateRecruitFormDto = RecruitForm;

function isOnFormSubmitStage(progress: number) {
  return progress === 0;
}

export type RecruitIndexProps = {
  recruitProgress: number;
  initialForm: RecruitForm;
};

export const RecruitIndex: FC<RecruitIndexProps> = ({ recruitProgress, initialForm }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<RecruitForm>(initialForm);
  const [updating, setUpdating, errorMessage, setErrorMessage] = useAsyncAction();
  const [recentUpdateSuccess, setRecentUpdateSuccess] = useState(false);
  useEffect(() => setRecentUpdateSuccess(false), [formData]);
  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.title}>SYSUMSC 2020 招新报名</h3>
      <div className={styles.alertContainer}>
        <Alert variant="secondary">
          1. 请报名参加招新面试的同学在规定的时间内填写以下表单，并点击「提交」按钮进行保存。
          <br />
          2. 在第一轮面试进行前你可以任意修改表单中的信息，但请注意保存。
          <br />
          3. 只有当所有的表单项都填写之后报名才被视为有效。
          <br />
          4. 如有任何疑问，请联系我们的
          <a href="https://jq.qq.com/?_wv=1027&k=MFjOBmdG" target="_blank" rel="noopener">
            招新QQ群
          </a>
          。
        </Alert>
      </div>
      <div>
        <p className={styles.progressTitle}>招新进程</p>
        <RecruitProgress recruitProgress={recruitProgress} />
      </div>
      <Form
        noValidate
        validated={validated}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          const form = event.currentTarget;
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
          const dto: UpdateRecruitFormDto = formData;
          if (form.checkValidity()) {
            setUpdating(true);
            fetchFromApi(
              'recruit',
              {
                method: 'POST',
                body: JSON.stringify(dto)
              },
              true
            )
              .then(() => setRecentUpdateSuccess(true))
              .catch((error) => setErrorMessage(error.message))
              .finally(() => {
                setUpdating(false);
                setValidated(false);
              });
          }
        }}
      >
        <Form.Group controlId="name">
          <Form.Label>姓名</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>注册时的填写姓名不再有效，并且我们已经从数据库删除这项信息</Form.Text>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>邮箱地址</Form.Label>
          <Form.Control
            required
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>邮箱地址主要用于面试进展和结果的通知等</Form.Text>
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>电话号码</Form.Label>
          <Form.Control
            required
            type="tel"
            value={formData.phoneNumber}
            onChange={(event) => setFormData({ ...formData, phoneNumber: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>手机号码主要用于各阶段面试的通知</Form.Text>
          <Form.Text muted>目前仅支持内地手机号，若有困难建议填写舍友或亲朋的内地手机号</Form.Text>
          <Form.Text muted>注册时的填写手机不再有效，并且我们已经从数据库删除这项信息</Form.Text>
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>性别</Form.Label>
          <Form.Control
            as="select"
            className={'form-control custom-select'}
            required
            value={formData.gender}
            onChange={(event) => setFormData({ ...formData, gender: Number(event.target.value) })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          >
            <option value={0}>男</option>
            <option value={1}>女</option>
            <option value={2}>其他</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="grade">
          <Form.Label>年级</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.grade}
            onChange={(event) => setFormData({ ...formData, grade: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>填写入学年份即可，例如: 2020级。若为研究生则需在年份前注明。</Form.Text>
        </Form.Group>
        <Form.Group controlId="college">
          <Form.Label>学院</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.college}
            onChange={(event) => setFormData({ ...formData, college: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>请填写学院的全名，例如: 数据科学与计算机学院</Form.Text>
        </Form.Group>
        <Form.Group controlId="studentId">
          <Form.Label>学号</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.studentId}
            onChange={(event) => setFormData({ ...formData, studentId: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>此项信息按照学校招新要求必填</Form.Text>
        </Form.Group>
        <Form.Group controlId="politicalRole">
          <Form.Label>政治面貌</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.politicalRole}
            onChange={(event) => setFormData({ ...formData, politicalRole: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>此项信息按照学校招新要求必填</Form.Text>
        </Form.Group>
        <Form.Group controlId="selfIntroduction">
          <Form.Label>个人介绍</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            required
            value={formData.selfIntroduction}
            onChange={(event) => setFormData({ ...formData, selfIntroduction: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>
            介绍一下你自己吧! 从兴趣爱好到个人经历，我们希望在面试之前就能对你有一个初步的了解。
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="politicalRole">
          <Form.Label>你的希望</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            required
            value={formData.wishes}
            onChange={(event) => setFormData({ ...formData, wishes: event.target.value })}
            disabled={updating || !isOnFormSubmitStage(recruitProgress)}
          />
          <Form.Text muted>假如你顺利加入了SYSUMSC，你希望俱乐部能为你带来什么呢?</Form.Text>
        </Form.Group>
        <div className={styles.buttonContainer}>
          <AsyncDataButton
            variant="primary"
            type="submit"
            extra={{
              isLoading: updating,
              errorMessage,
              forceDisabled: recentUpdateSuccess || !isOnFormSubmitStage(recruitProgress)
            }}
          >
            {recentUpdateSuccess
              ? '提交成功'
              : isOnFormSubmitStage(recruitProgress)
              ? '提交'
              : '招新报名阶段已结束'}
          </AsyncDataButton>
        </div>
      </Form>
    </div>
  );
};
