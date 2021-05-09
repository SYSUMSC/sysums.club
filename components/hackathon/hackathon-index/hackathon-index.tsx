import styles from './hackathon-index.module.scss';
import React, { FC, useEffect, useState } from 'react';
import {
  Checkbox,
  DefaultButton,
  Label,
  MessageBar,
  MessageBarType,
  Persona,
  TextField
} from '@fluentui/react';
import update from 'immutability-helper';
import { MemberInfoModal } from '../member-info-modal/member-info-modal';
import { fetchFromApi } from '../../../utils/api';
import { AsyncDataButton } from '../../shared/async-data-button/async-data-button';
import { useAsyncAction } from '../../../utils/utils';

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

export interface HackathonIndexProps {
  signupFormData: SignupFormData;
}

export const HackathonIndex: FC<HackathonIndexProps> = ({ signupFormData }) => {
  const [formData, setFormData] = useState<SignupFormData>(signupFormData);

  const [editingMemberInfo, setEditingMemberInfo] = useState<MemberInfo>(null);
  const [showMemberInfoModal, setShowMemberInfoModal] = useState(false);

  const [requesting, setRequesting, errorMessage, setErrorMessage] = useAsyncAction();
  const [formUpdated, setFormUpdated] = useState(false);

  useEffect(() => {
    setFormUpdated(false);
  }, [formData]);

  async function onSubmit(form: HTMLFormElement) {
    if (!form.checkValidity()) {
      return;
    }
    try {
      await fetchFromApi(
        'hackathon/form',
        {
          method: 'POST',
          body: JSON.stringify(formData)
        },
        true
      );
      setErrorMessage('');
      setFormUpdated(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setRequesting(false);
  }

  return (
    <form
      className={styles.container}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event.currentTarget);
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
            if (formData.memberInfo.length <= 0) {
              newInfo = update(newInfo, { isCaptain: { $set: true } });
            }
            let newFormData = formData;
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
      <MessageBar messageBarType={MessageBarType.warning}>
        请务必遵从比赛交流 QQ 群中群公告和管理员的指示进行参赛报名。
      </MessageBar>
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
          <AsyncDataButton
            type="submit"
            iconProps={{
              iconName: formUpdated
                ? 'CheckMark'
                : !requesting && errorMessage
                ? 'Warning'
                : undefined
            }}
            text={!formUpdated ? '提交表格' : '表格已更新'}
            extra={{
              isLoading: requesting,
              forceDisabled: formUpdated || formData.memberInfo.length <= 0,
              errorMessage
            }}
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
            disabled={requesting || formData.confirmed || formData.memberInfo?.length > 6}
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
        </div>
        {formData.memberInfo?.length <= 0 && (
          <MessageBar messageBarType={MessageBarType.info}>
            点击"添加队员"按钮来添加新的队员，每个队伍的队员人数
            <strong>只能为 2 至 6 人</strong>。
          </MessageBar>
        )}
      </div>
    </form>
  );
};
