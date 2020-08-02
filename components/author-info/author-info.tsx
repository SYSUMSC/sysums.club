import React, { FC } from 'react';
import { Image } from 'react-bootstrap';
import styles from './author-info.module.scss';
import { GlobalOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons/lib';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
  <Card>
    <Card.Body>
      <div className={styles.rootContainer}>
        <div className={styles.avatarContainer}>
          <Image src={avatarUrl} fluid />
        </div>
        <article className={styles.infoContainer}>
          <a href={`/blog/author/${authorId}`}>
            <h3>{name}</h3>
          </a>
          <div className={styles.metaContainer}>
            {website && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-website">网站</Tooltip>}
              >
                <span className={styles.meta}>
                  <GlobalOutlined />
                  <a href={website} target="_blank" rel="noopener">
                    {website}
                  </a>
                </span>
              </OverlayTrigger>
            )}
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-article-count">文章数量</Tooltip>}
            >
              <span className={styles.meta}>
                <FileTextOutlined />
                <a href={`/blog/author/${authorId}`}>{articleCount}</a>
              </span>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-join-date">注册日期</Tooltip>}
            >
              <span className={styles.meta}>
                <CalendarOutlined />
                <span>{joinDate}</span>
              </span>
            </OverlayTrigger>
          </div>
          <hr />
          <p>{description}</p>
        </article>
      </div>
    </Card.Body>
  </Card>
);
