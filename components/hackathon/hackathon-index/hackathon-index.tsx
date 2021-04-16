import styles from './hackathon-index.module.scss';
import React, { FC, useState } from 'react';
import { Checkbox, DefaultButton, Label, Persona, TextField } from '@fluentui/react';
import update from 'immutability-helper';
import { MemberInfoModal } from '../member-info-modal/member-info-modal';

export interface MemberInfo {
  isCaptain: boolean;
  name: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phoneNumber: string;
  school: string;
  educationalBackground: 'undergraduate' | 'postgraduate' | 'other';
  grade: string;
  major: string;
  experience: string;
}

export interface SignupFormData {
  teamInfo: {
    name: string;
    description: string;
  };
  memberInfo: MemberInfo[];
}

const DEFAULT_FORM_DATA: SignupFormData = {
  teamInfo: {
    name: '',
    description: ''
  },
  memberInfo: [
    {
      isCaptain: true,
      name: '测试',
      gender: 'male',
      email: '哈哈',
      phoneNumber: '哈哈',
      school: '哈哈',
      educationalBackground: 'other',
      grade: '哈哈',
      major: '哈哈',
      experience: '哈哈'
    },
    {
      isCaptain: false,
      name: '测试2',
      gender: 'male',
      email: '哈哈',
      phoneNumber: '哈哈',
      school: '哈哈',
      educationalBackground: 'other',
      grade: '哈哈',
      major: '哈哈',
      experience: '哈哈'
    },
    {
      isCaptain: false,
      name: '测试3',
      gender: 'male',
      email: '哈哈',
      phoneNumber: '哈哈',
      school: '哈哈',
      educationalBackground: 'other',
      grade: '哈哈',
      major: '哈哈',
      experience: '哈哈'
    }
  ]
};

export const HackathonIndex: FC = () => {
  const [formData, setFormData] = useState<SignupFormData>(DEFAULT_FORM_DATA);
  const [requesting, setRequesting] = useState(false);
  const [editingMemberInfo, setEditingMemberInfo] = useState<Partial<MemberInfo>>(null);
  return (
    <div className={styles.container}>
      {editingMemberInfo && (
        <MemberInfoModal
          memberInfo={editingMemberInfo}
          onSave={console.log}
          onDismiss={() => setEditingMemberInfo(null)}
          isOpen={!!editingMemberInfo}
        />
      )}
      <div className={styles.confirmSection}>
        <h2 className={styles.heading}>确认与提交</h2>
        <Label disabled>
          选中并点击“提交更新”之后，报名才算作有效。
          <br />
          在报名截止前，可以通过取消选中并点击“提交更新”来撤销报名。
        </Label>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Checkbox label="确认报名并锁定表单" />
          <DefaultButton text="提交更新" />
        </div>
      </div>
      <div className={styles.teamInfoSection}>
        <h2 className={styles.heading}>队伍信息</h2>
        <TextField
          label="队伍名称"
          type="text"
          value={formData.teamInfo?.name}
          onChange={(_, value) =>
            setFormData(
              update(formData, {
                teamInfo: { name: { $set: value } }
              })
            )
          }
          disabled={requesting}
          required={true}
        />
        <TextField
          label="队伍介绍"
          multiline
          autoAdjustHeight
          value={formData.teamInfo?.description}
          onChange={(_, value) =>
            setFormData(
              update(formData, {
                teamInfo: { description: { $set: value } }
              })
            )
          }
          disabled={requesting}
          required={true}
        />
      </div>
      <div className={styles.teamMemberSection}>
        <h2 className={styles.heading}>
          队员信息
          <DefaultButton
            iconProps={{ iconName: 'Add' }}
            onClick={() => {
              setEditingMemberInfo({ name: '新成员' });
            }}
          >
            添加成员
          </DefaultButton>
        </h2>
        <div className={styles.memberContainer}>
          {formData.memberInfo?.map((info) => (
            <div
              key={`${info.name}${info.isCaptain}`}
              className={styles.item}
              onClick={() => {
                setEditingMemberInfo(info);
              }}
            >
              <Persona text={info.name} secondaryText={info.isCaptain ? '队长' : '队员'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
