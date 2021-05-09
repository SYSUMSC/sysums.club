import styles from './member-info-modal.module.scss';
import React, { FC, useState } from 'react';
import { AppModal } from '../../shared/app-modal/app-modal';
import { MemberInfo } from '../hackathon-index/hackathon-index';
import {
  ActionButton,
  Checkbox,
  ComboBox,
  DefaultButton,
  IModalProps,
  TextField
} from '@fluentui/react';
import update from 'immutability-helper';

export interface MemberInfoProps {
  memberInfo?: MemberInfo;
  onSave: (isNewMember: boolean, oldInfo: MemberInfo, newInfo: MemberInfo) => void;
  onDelete: (memberInfo: MemberInfo) => void;
}

export const MemberInfoModal: FC<MemberInfoProps & Omit<IModalProps, 'caption' | 'isBlocking'>> = ({
  memberInfo,
  onSave,
  onDelete,
  ...props
}) => {
  const [modifiedInfo, setModifiedInfo] = useState(
    memberInfo ?? ({ name: '新成员', isCaptain: false } as MemberInfo)
  );
  return (
    <AppModal {...props} caption={`队伍成员：${modifiedInfo.name}`} isBlocking={true}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!modifiedInfo.gender || !modifiedInfo.educationalBackground) {
            return;
          }
          onSave(!memberInfo, memberInfo, modifiedInfo);
        }}
      >
        <Checkbox
          label="设为队长"
          checked={modifiedInfo.isCaptain}
          onChange={(_, checked) =>
            setModifiedInfo(update(modifiedInfo, { isCaptain: { $set: checked } }))
          }
          disabled={memberInfo?.isCaptain}
        />
        <TextField
          label="姓名"
          value={modifiedInfo.name}
          onChange={(_, value) => setModifiedInfo(update(modifiedInfo, { name: { $set: value } }))}
          required={true}
        />
        <ComboBox
          label="性别"
          selectedKey={modifiedInfo.gender}
          allowFreeform={false}
          onChange={(_, { key }) =>
            setModifiedInfo(update(modifiedInfo, { gender: { $set: `${key}` as any } }))
          }
          options={[
            { key: 'male', text: '男' },
            { key: 'female', text: '女' },
            { key: 'other', text: '其他' }
          ]}
          required={true}
        />
        <TextField
          label="邮箱"
          type="email"
          value={modifiedInfo.email}
          onChange={(_, value) => setModifiedInfo(update(modifiedInfo, { email: { $set: value } }))}
          required={true}
        />
        <TextField
          label="电话号码"
          type="tel"
          value={modifiedInfo.phoneNumber}
          onChange={(_, value) =>
            setModifiedInfo(update(modifiedInfo, { phoneNumber: { $set: value } }))
          }
          required={true}
        />
        <TextField
          label="学校"
          description="建议格式：城市名+学校名，不要写缩写"
          type="text"
          value={modifiedInfo.school}
          onChange={(_, value) =>
            setModifiedInfo(update(modifiedInfo, { school: { $set: value } }))
          }
          required={true}
        />
        <ComboBox
          label="学历"
          selectedKey={modifiedInfo.educationalBackground}
          allowFreeform={false}
          onChange={(_, { key }) =>
            setModifiedInfo(
              update(modifiedInfo, { educationalBackground: { $set: `${key}` as any } })
            )
          }
          options={[
            { key: 'undergraduate', text: '本科生' },
            { key: 'postgraduate', text: '研究生' },
            { key: 'other', text: '其他' }
          ]}
          required={true}
        />
        <TextField
          label="年级"
          description="建议格式：XXXX（入学年份）级"
          type="text"
          value={modifiedInfo.grade}
          onChange={(_, value) => setModifiedInfo(update(modifiedInfo, { grade: { $set: value } }))}
          required={true}
        />
        <TextField
          label="专业"
          description="现在正在就读的专业的名称"
          type="text"
          value={modifiedInfo.major}
          onChange={(_, value) => setModifiedInfo(update(modifiedInfo, { major: { $set: value } }))}
          required={true}
        />
        <TextField
          label="个人经历"
          description="吹吹水介绍一下自己，20到50字就够啦"
          multiline
          autoAdjustHeight
          value={modifiedInfo.experience}
          onChange={(_, value) =>
            setModifiedInfo(
              update(modifiedInfo, {
                experience: { $set: value }
              })
            )
          }
          required={true}
        />
        <div className={styles.buttonContainer}>
          <DefaultButton type="submit" text="保存" />
          {memberInfo && (
            <ActionButton
              type="button"
              iconProps={{ iconName: 'Delete' }}
              text="删除成员"
              onClick={() => onDelete(memberInfo)}
            />
          )}
        </div>
      </form>
    </AppModal>
  );
};
