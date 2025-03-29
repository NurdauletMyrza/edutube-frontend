import {
  authServerApiBaseUrl,
  userServerApiBaseUrl,
} from "@/shared/variables/serverApiUrls";

const useAuthServerApiBaseUrls = [authServerApiBaseUrl, userServerApiBaseUrl];

export async function fetchApiClient(input: RequestInfo, init?: RequestInit) {
  let isUseAuthRequest = false;
  for (const useAuthServerApiBaseUrl of useAuthServerApiBaseUrls) {
    isUseAuthRequest = input.toString().startsWith(useAuthServerApiBaseUrl);
    if (isUseAuthRequest) {
      return await fetch(input, {
        ...init,
        credentials: "include", // 🔹 Включаем cookies
      });
    }
  }

  return await fetch(input, init);
}
