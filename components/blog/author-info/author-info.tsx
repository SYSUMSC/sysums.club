import React, { FC } from 'react';
import styles from './author-info.module.scss';
import { FileTextOutlined, CalendarOutlined } from '@ant-design/icons/lib';
import { DirectionalHint, DocumentCard, Image, TooltipHost } from '@fluentui/react';

export type AuthorInfoProps = {
  authorId: string;
  avatarUrl: string;
  name: string;
  website?: string;
  articleCount: number;
  joinDate: string;
  description: string;
};

export const AuthorInfo: FC<AuthorInfoProps> = ({
  authorId,
  avatarUrl,
  name,
  website,
  articleCount,
  joinDate,
  description
}) => (
  <DocumentCard>
    <div className={styles.rootContainer}>
      <div className={styles.avatarContainer}>
        <Image src={avatarUrl} shouldFadeIn={true} />
      </div>
      <article className={styles.infoContainer}>
        <a href={`/blog/author/${authorId}`}>
          <h3>{name}</h3>
        </a>
        <div className={styles.metaContainer}>
          {website && (
            <TooltipHost content="网址" directionalHint={DirectionalHint.bottomCenter}>
              <span className={styles.meta}>
                <a href={website} target="_blank" rel="noopener">
                  {website}
                </a>
              </span>
            </TooltipHost>
          )}
          <TooltipHost content="文章数量" directionalHint={DirectionalHint.bottomCenter}>
            <span className={styles.meta}>
              <FileTextOutlined />
              <a href={`/blog/author/${authorId}`}>{articleCount}</a>
            </span>
          </TooltipHost>
          <TooltipHost content="注册日期" directionalHint={DirectionalHint.bottomCenter}>
            <span className={styles.meta}>
              <CalendarOutlined />
              <span>{joinDate}</span>
            </span>
          </TooltipHost>
        </div>
        <hr />
        <p>{description}</p>
      </article>
    </div>
  </DocumentCard>
);
