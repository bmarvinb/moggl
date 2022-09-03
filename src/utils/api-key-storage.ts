const API_TOKEN_KEY = "api_token";

export function setApiToken(apiToken: string) {
  localStorage.setItem(API_TOKEN_KEY, apiToken);
}

export function getApiToken() {
  return localStorage.getItem(API_TOKEN_KEY);
}

export function removeApiToken() {
  localStorage.removeItem(API_TOKEN_KEY);
}
