import cryptoRandomString from 'crypto-random-string';

const API_URL = 'https://wp.sysums.club/graphql';
const FETCH_HEADERS = { 'Content-Type': 'application/json' };

const loginMutation = `
mutation {
  login( input: {
    clientMutationId: "${cryptoRandomString({ length: 32, type: 'base64' })}",
    username: "${process.env.WP_USERNAME}",
    password: "${process.env.WP_USER_PASSWORD}"
  } ) {
    authToken
  }
}`;

export async function login() {
  const response = await fetchFromApi(loginMutation, {}, true);
  FETCH_HEADERS['Authorization'] = `Bearer ${response.login.authToken}`;
}

export async function fetchFromApi(query: string, variables: any = {}, skipAuthCheck = false) {
  if (!FETCH_HEADERS['Authorization'] && !skipAuthCheck) {
    await login();
  }
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: FETCH_HEADERS,
    body: JSON.stringify({ query, variables })
  });
  const json = await response.json();
  if (json['errors']) {
    throw new Error(`Failed to fetch with ${query}, errors: ${json['errors']}`);
  }
  return json.data;
}
