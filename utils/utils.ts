export function toNormalDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function makeApiPath(path: string) {
  return `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/api/'}${path}`;
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
