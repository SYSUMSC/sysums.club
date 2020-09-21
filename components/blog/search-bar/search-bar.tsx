import React, { FC, useEffect, useState } from 'react';
import styles from './search-bar.module.scss';
import { CloseCircleFilled } from '@ant-design/icons/lib';

export type SearchBarProps = {
  onQueryChange: (query: string) => any;
};

export const SearchBar: FC<SearchBarProps> = ({ onQueryChange }) => {
  const [query, setQuery] = useState('');
  const [showingSearchBar, setShowingSearchBar] = useState(false);
  useEffect(() => {
    if (showingSearchBar) {
      setTimeout(() => {
        const searchInput = document.querySelector('#searchInput') as HTMLElement;
        searchInput.focus({ preventScroll: true });
      }, 200);
    }
  }, [showingSearchBar]);
  return (
    <>
      {showingSearchBar && (
        <div className={styles.searchInputContainer}>
          <input
            id="searchInput"
            className={styles.searchInput}
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              onQueryChange(value);
            }}
          />
          <div className={styles.closeButtonContainer}>
            <CloseCircleFilled
              className={styles.icon}
              onClick={() => {
                setShowingSearchBar(false);
                setQuery('');
                onQueryChange('');
              }}
            />
          </div>
        </div>
      )}
      {!showingSearchBar && (
        <a
          className={styles.text}
          href="#"
          onClick={(event) => {
            event.preventDefault();
            if (!showingSearchBar) {
              setShowingSearchBar(true);
            }
          }}
        >
          搜索文章
        </a>
      )}
    </>
  );
};
