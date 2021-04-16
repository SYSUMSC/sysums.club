import styles from './member-info-modal.module.scss';
import React, { FC, FormEvent, useState } from 'react';
import { AppModal } from '../../shared/app-modal/app-modal';
import { MemberInfo } from '../hackathon-index/hackathon-index';
import { ComboBox, DefaultButton, IModalProps, TextField } from '@fluentui/react';
import update from 'immutability-helper';

export interface MemberInfoProps {
  memberInfo: Partial<MemberInfo>;
  onSave: (newValue: Partial<MemberInfo>) => void;
}

export const MemberInfoModal: FC<MemberInfoProps & Omit<IModalProps, 'caption'>> = ({
  memberInfo,
  onSave,
  ...props
}) => {
  const [modifiedInfo, setModifiedInfo] = useState(memberInfo);
  return (
    <AppModal {...props} caption={`队伍成员：${memberInfo.name}`}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave(modifiedInfo);
        }}
      >
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
        <DefaultButton type="submit" style={{ margin: '12px 0', float: 'right' }} text="保存" />
      </form>
    </AppModal>
  );
};
