import React, { FC } from 'react';
import styles from './recruit-progress.module.scss';

export type RecruitProgressProps = {
  recruitProgress: number;
};

export const RecruitProgress: FC<RecruitProgressProps> = ({ recruitProgress }) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.progressItem} ${
          recruitProgress >= 0 ? styles['progressItem--active'] : ''
        }`}
      >
        <span className={styles.caption}>招新报名</span>
        <span className={styles.introduction}>
          有意向参与招新面试的同学可自由修改提交报名表单。
          <u>第一轮面试前</u>截止。
        </span>
      </div>
      <div
        className={`${styles.progressItem} ${
          recruitProgress >= 1 ? styles['progressItem--active'] : ''
        }`}
      >
        <span className={styles.caption}>第一轮面试</span>
        <div className={styles.introduction}>
          所有提交了完整的报名表单的同学将会进行第一轮面试，请留意自己收到的面试通知短信、邮件，以及招新QQ群。
          我们会在第一轮面试中和同学进行简单的交谈以了解同学的基本情况。
          <br />
          线上面试将在<u>10月22~23日</u>进行。线下面试将在<u>10月24日</u>进行。
        </div>
      </div>
      <div
        className={`${styles.progressItem} ${
          recruitProgress >= 2 ? styles['progressItem--active'] : ''
        }`}
      >
        <span className={styles.caption}>第二轮面试</span>
        <div className={styles.introduction}>
          第一轮面试后，获得认可的同学将会进行第二轮面试，请留意自己收到的面试通知短信、邮件，以及招新QQ群。
          在这一轮面试中，我们将着重了解参与面试的同学的学习能力以及技术能力。
          <br />
          本轮面试预计<u>10月31日</u>进行。
        </div>
      </div>
      <div
        className={`${styles.progressItem} ${
          recruitProgress >= 3 ? styles['progressItem--active'] : ''
        }`}
      >
        <span className={styles.caption}>结果公布</span>
        <div className={styles.introduction}>
          我们预计在<u>11月</u>通过官网博客、微信公众号等渠道公布面试结果，敬请期待。
        </div>
      </div>
    </div>
  );
};
