import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function toNormalDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function resolveAuthorName({
  firstName,
  lastName,
  username
}: {
  firstName: string;
  lastName: string;
  username: string;
}) {
  if (!firstName || !lastName) {
    return username;
  } else {
    return `${lastName}${firstName}`;
  }
}

export function usePrimaryPath() {
  const [primaryPath, setPrimaryPath] = useState<string>(null);
  const { pathname } = useRouter();
  useEffect(() => {
    const path = pathname?.split('/')[1];
    setPrimaryPath(`/${path}`);
  }, [pathname]);
  return primaryPath;
}

export function useLocalStorageUpdate(key: string, listener: () => any) {
  if (!process.browser) {
    return;
  }
  useEffect(() => listener(), [localStorage.getItem(key)]);
}

export function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  return [loading, setLoading, errorMessage, setErrorMessage] as const;
}
