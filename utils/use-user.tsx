import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetchFromApi } from './api';
import { useLocalStorageUpdate } from './utils';

export type User = {
  email: string;
  phone_number: string;
};

export function useUser() {
  const [token, setToken] = useState<string>();
  const { data, error } = useSWR<User>(token ? 'user/profile' : null, fetchFromApi, {
    shouldRetryOnError: false
  });
  useLocalStorageUpdate('app_user_token', () => setToken(localStorage.getItem('app_user_token')));
  useEffect(() => {
    if (error) {
      localStorage.removeItem('app_user_token');
    }
  }, [error]);
  return {
    notLoggedIn: !token,
    user: data,
    isLoading: !error && !data && !!token,
    isErrored: !!error
  };
}
