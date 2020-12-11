import cryptoRandomString from 'crypto-random-string';

const API_URL = 'https://wp.sysums.club/graphql';
const FETCH_HEADERS = { 'Content-Type': 'application/json' };

let lastLoginTime;

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

function isLoginExpired() {
  return !lastLoginTime || Date.now() - lastLoginTime >= 1600 * 1000; // around 30min
}

export async function login() {
  const response = await fetchFromWpApi(loginMutation, {}, true);
  FETCH_HEADERS['Authorization'] = `Bearer ${response.login.authToken}`;
  lastLoginTime = Date.now();
}

export async function fetchFromWpApi(query: string, variables: any = {}, skipAuthCheck = false) {
  if (isLoginExpired() && !skipAuthCheck) {
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
