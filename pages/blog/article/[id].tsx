import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './[id].module.scss';
import { ArticleMeta, ArticleMetaProps } from '../../../components/article-meta/article-meta';
import { AppFrame } from '../../../components/frame';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Converter } from 'showdown';
import showdownKatex from 'showdown-katex';
import hljs from 'highlight.js';
import { fetchFromWpApi } from '../../../utils/wp-api';
import { resolveAuthorName, toNormalDate } from '../../../utils/utils';
import {
  TagListContainer,
  TagListContainerProps
} from '../../../components/tag-list-container/tag-list-container';
import Head from 'next/head';
import { AuthorInfo, AuthorInfoProps } from '../../../components/author-info/author-info';

type ArticleDetailProps = {
  title: string;
  meta: ArticleMetaProps;
  thumbnailUrl: string;
  summary: string;
  content: string;
  tagList: TagListContainerProps;
  authorInfo: AuthorInfoProps;
};

export default function ArticleDetail({
  title,
  meta,
  thumbnailUrl,
  summary,
  content,
  tagList,
  authorInfo
}: ArticleDetailProps) {
  const router = useRouter();
  const articleSectionRef = useRef<HTMLElement>();
  useEffect(() => {
    if (articleSectionRef.current) {
      const codeSections = articleSectionRef.current.querySelectorAll('pre');
      codeSections.forEach((node) => hljs.highlightBlock(node));
    }
  }, [router.query.id]);
  const [zoomedInImage, setZoomedInImage] = useState<string>(null);
  return (
    <AppFrame>
      <Head>
        <title>{title} · 博客 · SYSUMSC</title>
      </Head>
      {zoomedInImage && (
        <div className={styles.imageOverlay} onClick={() => setZoomedInImage(null)}>
          <Image src={zoomedInImage} fluid />
        </div>
      )}
      <main className={styles.rootContainer}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1>{title}</h1>
            <ArticleMeta {...meta} />
            <Image className={styles.thumbnail} src={thumbnailUrl} fluid />
            <p className={styles.summary}>{summary}</p>
          </header>
          <section
            ref={articleSectionRef}
            className={`markdown-body ${styles.articleSection}`}
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={(event) => {
              if (event.target instanceof HTMLImageElement) {
                setZoomedInImage(event.target.src);
              }
            }}
          />
        </article>
        <TagListContainer {...tagList} />
        <AuthorInfo {...authorInfo} />
      </main>
    </AppFrame>
  );
}

const allArticlesQuery = `
{
  posts {
    nodes {
      databaseId
    }
  }
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const allArticles = (await fetchFromWpApi(allArticlesQuery)).posts.nodes;
  return {
    paths: allArticles.map((article) => ({
      params: { id: `${article.databaseId}` }
    })),
    fallback: false
  };
};

const articleDetailQuery = `
query ArticleDetailQuery($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
    author {
      node {
        firstName
        lastName
        username
        databaseId
        url
        registeredDate
        description
        avatar {
          url
        }
        posts {
          nodes {
            databaseId
          }
        }
      }
    }
    title
    date
    wordCount
    featuredImage {
      node {
        sourceUrl(size: LARGE)
      }
    }
    excerpt(format: RAW)
    markdown
    tags {
      nodes {
        databaseId
        name
      }
    }
  }
}
`;

const converter = new Converter({
  emoji: true,
  openLinksInNewWindow: true,
  tasklists: true,
  strikethrough: true,
  tables: true,
  extensions: [
    showdownKatex({
      displayMode: true,
      throwOnError: false,
      errorColor: '#ff0000',
      delimiters: [
        { left: '$$', right: '$$', display: false },
        { left: '~', right: '~', display: false, asciimath: true }
      ]
    })
  ]
});

export const getStaticProps: GetStaticProps<ArticleDetailProps> = async ({ params }) => {
  const result = (await fetchFromWpApi(articleDetailQuery, { id: params.id })).post;
  const content = converter.makeHtml(result.markdown);
  return {
    props: {
      title: result.title,
      meta: {
        authorId: result.author.node.databaseId,
        authorName: resolveAuthorName(result.author.node),
        date: toNormalDate(result.date),
        wordCount: result.wordCount
      },
      thumbnailUrl: result.featuredImage.node.sourceUrl,
      summary: result.excerpt,
      content,
      tagList: {
        tags: result.tags.nodes.map((tag) => ({
          id: tag.databaseId,
          name: tag.name
        }))
      },
      authorInfo: {
        authorId: result.author.node.databaseId,
        avatarUrl: result.author.node.avatar.url,
        name: resolveAuthorName(result.author.node),
        website: result.author.node.url,
        articleCount: result.author.node.posts.nodes.length,
        joinDate: toNormalDate(result.author.node.registeredDate),
        description: result.author.node.description
      }
    }
  };
};
