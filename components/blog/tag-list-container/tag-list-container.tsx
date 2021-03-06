import React, { FC } from 'react';
import { Badge } from 'react-bootstrap';
import styles from './tag-list-container.module.scss';
import { useRouter } from 'next/router';

export type TagListContainerProps = {
  tags: {
    id: string;
    name: string;
  }[];
};

export const TagListContainer: FC<TagListContainerProps> = ({ tags }) => {
  const router = useRouter();
  return (
    <div className={styles.tagContainer}>
      {tags.map((tag) => (
        <Badge variant="secondary" key={tag.id}>
          <span className={styles.tag} onClick={() => router.push(`/blog/tag/${tag.id}`)}>
            {tag.name}
          </span>
        </Badge>
      ))}
    </div>
  );
};
