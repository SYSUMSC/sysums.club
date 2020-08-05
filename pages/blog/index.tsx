import { AppFrame } from '../../components/frame';
import { ArticleCardProps } from '../../components/article-card/article-card';
import styles from './index.module.scss';
import React, { useState } from 'react';
import {
  ArticleCarousel,
  ArticleCarouselProps
} from '../../components/article-carousel/article-carousel';
import {
  ArticleCardSimple,
  ArticleCardSimpleProps
} from '../../components/article-card-simple/article-card-simple';
import { ArticleListContainer } from '../../components/article-list-container/article-list-container';
import { GetStaticProps } from 'next';
import { fetchFromApi } from '../../utils/api';
import { resolveAuthorName, toNormalDate } from '../../utils/utils';
import { SearchOutlined, TeamOutlined } from '@ant-design/icons/lib';
import { SearchBar } from '../../components/search-bar/search-bar';

type BlogPageProps = {
  carouselArticles: ArticleCarouselProps;
  pinnedArticles: ArticleCardSimpleProps[];
  articles: ArticleCardProps[];
};

export default function BlogPage({ carouselArticles, pinnedArticles, articles }: BlogPageProps) {
  const [showingArticles, setShowingArticles] = useState(articles);
  return (
    <AppFrame>
      <title>博客 · SYSUMSC</title>
      <div className={styles.rootContainer}>
        <div className={styles.selectedArticleContainer}>
          <div className={styles.articleCarouselWrapper}>
            <ArticleCarousel {...carouselArticles} />
          </div>
          <div className={styles.articleCardSimpleContainer}>
            {pinnedArticles.map((article) => (
              <ArticleCardSimple {...article} key={article.articleId} />
            ))}
          </div>
        </div>
        <div className={styles.middleToolboxContainer}>
          <div className={styles.searchButton}>
            <TeamOutlined />
            <a className={styles.text} href="/about">
              加入我们
            </a>
          </div>
          <div className={styles.searchButton}>
            <SearchOutlined />
            <SearchBar
              onQueryChange={(query) => {
                if (!query) {
                  setShowingArticles([...articles]);
                } else {
                  setShowingArticles([
                    ...articles.filter(
                      (article) =>
                        article.title.toLowerCase().includes(query.toLowerCase()) ||
                        article.summary.toLowerCase().includes(query.toLowerCase())
                    )
                  ]);
                }
              }}
            />
          </div>
        </div>
        <ArticleListContainer cardProps={showingArticles} />
      </div>
    </AppFrame>
  );
}

const query = `
{
  pinnedArticles: posts(first: 3, where: {tag: "编辑推荐"}) {
    nodes {
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          firstName
          lastName
          username
          databaseId
        }
      }
      databaseId
      title
      date
    }
  }
  allArticles: posts {
    nodes {
      title
      author {
        node {
          firstName
          lastName
          username
          databaseId
        }
      }
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
}`;

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const result = await fetchFromApi(query);
  const pinnedArticles = result.pinnedArticles.nodes;
  const allArticles = result.allArticles.nodes;
  return {
    props: {
      carouselArticles: {
        articles: pinnedArticles.map((article) => ({
          featuredImageUrl: article.featuredImage.node.sourceUrl,
          title: article.title
        }))
      },
      pinnedArticles: pinnedArticles.map((article) => ({
        articleId: article.databaseId,
        title: article.title,
        authorId: article.author.node.databaseId,
        authorName: resolveAuthorName(article.author.node),
        date: toNormalDate(article.date)
      })),
      articles: allArticles.map((article) => ({
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
