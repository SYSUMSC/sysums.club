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
  confirmed: boolean;
  teamInfo: {
    name: string;
    description: string;
  };
  memberInfo: MemberInfo[];
}

const DEFAULT_FORM_DATA: SignupFormData = {
  confirmed: false,
  teamInfo: {
    name: '',
    description: ''
  },
  memberInfo: []
};

export const HackathonIndex: FC = () => {
  const [formData, setFormData] = useState<SignupFormData>(DEFAULT_FORM_DATA);
  const [requesting, setRequesting] = useState(false);
  const [editingMemberInfo, setEditingMemberInfo] = useState<MemberInfo>(null);
  const [showMemberInfoModal, setShowMemberInfoModal] = useState(false);
  return (
    <form
      className={styles.container}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {showMemberInfoModal && (
        <MemberInfoModal
          onDismiss={() => {
            setShowMemberInfoModal(false);
            setEditingMemberInfo(null);
          }}
          isOpen={showMemberInfoModal}
          memberInfo={editingMemberInfo}
          onDelete={(memberInfo) => {
            let newFormData: SignupFormData = {
              ...formData,
              memberInfo: formData.memberInfo.filter((info) => info !== memberInfo)
            };
            if (memberInfo.isCaptain && newFormData.memberInfo.length >= 1) {
              newFormData = {
                ...newFormData,
                memberInfo: [
                  update(newFormData.memberInfo[0], { isCaptain: { $set: true } }),
                  ...newFormData.memberInfo.slice(1)
                ]
              };
            }
            setFormData(newFormData);
            setShowMemberInfoModal(false);
            setEditingMemberInfo(null);
          }}
          onSave={(isNewMember, oldInfo, newInfo) => {
            let newFormData = formData;
            if (newFormData.memberInfo.length <= 0) {
              newInfo.isCaptain = true;
            }
            if (newInfo.isCaptain) {
              newFormData = {
                ...newFormData,
                memberInfo: newFormData.memberInfo.map((info) =>
                  update(info, { isCaptain: { $set: false } })
                )
              };
            }
            if (isNewMember) {
              newFormData = update(newFormData, { memberInfo: { $push: [newInfo] } });
            } else {
              newFormData = {
                ...newFormData,
                memberInfo: newFormData.memberInfo.map((info) =>
                  info !== oldInfo ? info : newInfo
                )
              };
            }
            setFormData(newFormData);
            setShowMemberInfoModal(false);
            setEditingMemberInfo(null);
          }}
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
          <Checkbox
            label="确认报名并锁定表单"
            checked={formData.confirmed}
            onChange={(_, checked) =>
              setFormData(
                update(formData, {
                  confirmed: { $set: checked }
                })
              )
            }
          />
          <DefaultButton
            text="提交更新"
            type="submit"
            disabled={requesting || formData.memberInfo.length <= 0}
          />
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
          disabled={requesting || formData.confirmed}
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
          disabled={requesting || formData.confirmed}
          required={true}
        />
      </div>
      <div className={styles.teamMemberSection}>
        <h2 className={styles.heading}>
          队员信息
          <DefaultButton
            iconProps={{ iconName: 'Add' }}
            onClick={() => {
              setEditingMemberInfo(null);
              setShowMemberInfoModal(true);
            }}
            disabled={requesting || formData.confirmed}
          >
            添加队员
          </DefaultButton>
        </h2>
        <div className={styles.memberContainer}>
          {formData.memberInfo?.map((info) => (
            <div
              key={`${JSON.stringify(info)}`}
              className={styles.item}
              onClick={() => {
                if (requesting || formData.confirmed) {
                  return;
                }
                setEditingMemberInfo(info);
                setShowMemberInfoModal(true);
              }}
            >
              <Persona text={info.name} secondaryText={info.isCaptain ? '队长' : '队员'} />
            </div>
          ))}
          {formData.memberInfo?.length <= 0 && <span>暂无队员</span>}
        </div>
      </div>
    </form>
  );
};
