export type ApiErrorResponse = {
  statusCode: number;
  message: string;
};

function getTokenHeader() {
  const token = localStorage.getItem('app_user_token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function makeApiPath(path: string) {
  return `/api/${path}`;
}

export async function fetchApi<T = void>(
  input: string,
  init?: RequestInit,
  emptyResponse = false
): Promise<T> {
  const response = await Promise.race<Promise<Response>>([
    new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请重试')), 8000)),
    fetch(makeApiPath(input), {
      ...init,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...getTokenHeader() }
    })
  ]);
  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    throw new Error(errorResponse.message);
  }
  if (!emptyResponse) {
    return await response.json();
  }
}
