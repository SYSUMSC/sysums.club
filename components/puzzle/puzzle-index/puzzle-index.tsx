import React, { FC, useState } from 'react';
import styles from './puzzle-index.module.scss';
import { useRouter } from 'next/router';
import { FontIcon } from '@fluentui/react';
import { GhostButton } from '../../shared/ghost-button/GhostButton';

export type PuzzleIndexProps = {
  submissionsCount: number;
  problems: {
    id: number;
    level: number;
    title: string;
    passed: boolean;
  }[];
};

const PROBLEM_BUTTON_VARIANT_MAP = {
  [-1]: 'blue',
  [0]: 'blue',
  [1]: 'yellow',
  [2]: 'red'
};

const SAYINGS = [
  '因世间的一切就像根链条；我们只需瞧见其中一环，就可知全体的性质。',
  '在没有得到任何证据的情况下是不能进行推理的，那样的话，只能是误入歧途。',
  '人不要在说明事实的理论上打圈圈，应该配合理论的说明，慢慢解开事实真相。',
  '总有一天，当你增加新知识的时候，你就会把以前所熟习的东西忘了。所以最要紧的是，不要让一些无用的知识把有用的挤出去。',
  '头脑是我的一切，身体只是一个附件。'
];

export const PuzzleIndex: FC<PuzzleIndexProps> = ({ submissionsCount, problems }) => {
  const router = useRouter();
  const [saying] = useState(SAYINGS[Math.floor(Math.random() * SAYINGS.length)]);
  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.title}>SYSUMSC 解谜游戏</h3>
      <div className={styles.sayingContainer}>
        <p className={styles.saying}>{saying}</p>
      </div>
      <div className={styles.problemsContainer}>
        <p className={styles.info}>
          你的谜题 ({problems.filter((p) => p.passed).length} / {problems.length})
        </p>
        {problems.map((p) => (
          <GhostButton
            key={p.id}
            variant={PROBLEM_BUTTON_VARIANT_MAP[p.level]}
            onClick={() => router.push(`/puzzle/problem/${p.id}`)}
            className={styles.problemButton}
          >
            {p.passed && <FontIcon iconName="CheckMark" />}
            {p.title}
          </GhostButton>
        ))}
      </div>
      <div className={styles.footer}>
        <p>全体解迷者累计提交答案次数: {submissionsCount}</p>
        <p>特别鸣谢: @GZTime</p>
        <p>2020.9.20 SYSUMSC</p>
      </div>
    </div>
  );
};
