import { AppFrame } from '../../../components/frame';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { ArticleListContainer } from '../../../components/article-list-container/article-list-container';
import { ArticleCardProps } from '../../../components/article-card/article-card';
import styles from './[id].module.scss';
import { fetchFromApi } from '../../../utils/wp-api';
import { resolveAuthorName, toNormalDate } from '../../../utils/utils';

type TagDetailProps = {
  name: string;
  description: string;
  articles: ArticleCardProps[];
};

export default function TagDetail({ name, description, articles }: TagDetailProps) {
  return (
    <AppFrame>
      <title>{name} · 博客 · SYSUMSC</title>
      <div className={styles.rootContainer}>
        <h3 className={styles.title}>标签: {name}</h3>
        <p className={styles.description}>{description}</p>
        <ArticleListContainer cardProps={articles} />
      </div>
    </AppFrame>
  );
}

const allTagsQuery = `
{
  tags {
    nodes {
      databaseId
    }
  }
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = (await fetchFromApi(allTagsQuery)).tags.nodes;
  return {
    paths: allTags.map((tag) => ({
      params: { id: `${tag.databaseId}` }
    })),
    fallback: false
  };
};

const tagInfoAndArticlesQuery = `
query AuthorQuery($id: ID!) {
  tag(id: $id, idType: DATABASE_ID) {
    name
    description
    id
    posts {
      nodes {
        title
        databaseId
        date
        featuredImage {
          node {
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
        excerpt(format: RAW)
        tags {
          nodes {
            name
            databaseId
          }
        }
        wordCount
        author {
          node {
            firstName
            lastName
            username
            databaseId
          }
        }
      }
    }
  }
}
`;

export const getStaticProps: GetStaticProps<TagDetailProps> = async ({ params }) => {
  const result = (await fetchFromApi(tagInfoAndArticlesQuery, { id: params.id })).tag;
  return {
    props: {
      name: result.name,
      description: result.description,
      articles: result.posts.nodes.map((article) => ({
        articleId: article.databaseId,
        thumbnailUrl: article.featuredImage.node.sourceUrl,
        meta: {
          authorId: article.author.node.databaseId,
          authorName: resolveAuthorName(article.author.node),
          date: toNormalDate(article.date),
          wordCount: article.wordCount
        },
        title: article.title,
        summary: article.excerpt,
        tags: article.tags.nodes.map((tag) => ({
          id: tag.databaseId,
          name: tag.name
        }))
      }))
    }
  };
};
