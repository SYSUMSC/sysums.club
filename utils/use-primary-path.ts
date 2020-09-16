import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export function usePrimaryPath() {
  const [primaryPath, setPrimaryPath] = useState<string>(null);
  const { pathname } = useRouter();
  useEffect(() => {
    const path = pathname?.split('/')[1];
    setPrimaryPath(`/${path}`);
  }, [pathname]);
  return primaryPath;
}
