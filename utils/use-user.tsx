import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SWRConfig } from 'swr';
import { makeApiPath } from './utils';

export type ApiResponse = {
  statusCode: number;
  message: string;
};

export type User = {
  email: string;
  phone_number: string;
};

function getTokenHeader() {
  const token = localStorage.getItem('token');
  if (token) {
    return { Authentication: `Bearer ${token}` };
  } else {
    return {};
  }
}

function useLocalStorageUpdateEvent(listener: () => any) {
  useEffect(() => {
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);
}

export function WithSWRConfig(component: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, { ...init, headers: { ...getTokenHeader() } }).then((res) => res.json())
      }}
    >
      {component}
    </SWRConfig>
  );
}

export function useUser() {
  if (!process.browser) {
    return {
      notLoggedIn: true
    };
  }
  const [token, setToken] = useState<string>(localStorage.getItem('token'));
  const { data, error } = useSWR<User, ApiResponse>(token ? makeApiPath('user') : null);
  useLocalStorageUpdateEvent(() => {
    const newToken = localStorage.getItem('token');
    if (newToken && newToken !== token) {
      setToken(newToken);
    }
  });
  return {
    notLoggedIn: !token,
    user: data,
    isLoading: !error && !data,
    isErrored: error
  };
}
