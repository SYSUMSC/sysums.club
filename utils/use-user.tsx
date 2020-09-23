import useSWR from 'swr';
import { fetchFromApi } from './api';

export type User = {
  email: string;
  name: string;
  phone_number: string;
};

export function useUser() {
  const { data, error } = useSWR<User>('user/profile', fetchFromApi, {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  });
  return {
    user: data,
    isLoading: !error && !data,
    isErrored: error && error.message !== 'Unauthorized'
  };
}
