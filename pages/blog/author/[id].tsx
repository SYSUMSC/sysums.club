import { AppFrame } from '../../../components/frame';
import styles from './[id].module.scss';
import { AuthorInfo, AuthorInfoProps } from '../../../components/author-info/author-info';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ArticleListContainer } from '../../../components/article-list-container/article-list-container';
import { ArticleCardProps } from '../../../components/article-card/article-card';
import { fetchFromApi } from '../../../utils/wp-api';
import { resolveAuthorName, toNormalDate } from '../../../utils/utils';

type AuthorDetailProps = {
  authorInfo: AuthorInfoProps;
  articles: ArticleCardProps[];
};

export default function AuthorDetail({ authorInfo, articles }: AuthorDetailProps) {
  return (
    <AppFrame>
      <title>{authorInfo.name} · 博客 · SYSUMSC</title>
      <div className={styles.rootContainer}>
        <section className={styles.authorInfoContainer}>
          <AuthorInfo {...authorInfo} />
        </section>
        <ArticleListContainer cardProps={articles} />
      </div>
    </AppFrame>
  );
}

const allAuthorsQuery = `
{
  users {
    nodes {
      databaseId
    }
  }
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const allAuthors = (await fetchFromApi(allAuthorsQuery)).users.nodes;
  return {
    paths: allAuthors.map((author) => ({
      params: { id: `${author.databaseId}` }
    })),
    fallback: false
  };
};

const authorInfoAndArticlesQuery = `
query AuthorQuery($id: ID!) {
  user(idType: DATABASE_ID, id: $id) {
    avatar {
      url
    }
    databaseId
    firstName
    lastName
    username
    description
    registeredDate
    url
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
      }
    }
  }
}
`;

export const getStaticProps: GetStaticProps<AuthorDetailProps> = async ({ params }) => {
  const result = (await fetchFromApi(authorInfoAndArticlesQuery, { id: params.id })).user;
  return {
    props: {
      authorInfo: {
        authorId: result.databaseId,
        avatarUrl: result.avatar.url,
        name: resolveAuthorName(result),
        website: result.url,
        articleCount: result.posts.nodes.length,
        joinDate: toNormalDate(result.registeredDate),
        description: result.description
      },
      articles: result.posts.nodes.map((article) => ({
        articleId: article.databaseId,
        thumbnailUrl: article.featuredImage.node.sourceUrl,
        meta: {
          authorId: result.databaseId,
          authorName: resolveAuthorName(result),
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
