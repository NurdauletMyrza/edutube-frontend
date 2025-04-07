import {
  authServerApiBaseUrl,
  userServerApiBaseUrl,
} from "@/shared/variables/serverApiUrls";
import { pageRequestVariableName } from "@/shared/utils/variables";

const useAuthServerApiBaseUrls = [authServerApiBaseUrl, userServerApiBaseUrl];

export async function fetchApiClient(input: RequestInfo, init?: RequestInit) {
  let isUseAuthRequest = false;
  for (const useAuthServerApiBaseUrl of useAuthServerApiBaseUrls) {
    isUseAuthRequest = input.toString().startsWith(useAuthServerApiBaseUrl);
    if (isUseAuthRequest) {
      return await fetch(input, {
        ...init,
        credentials: "include", // 🔹 Включаем cookies
        headers: {
          ...init?.headers,
          [pageRequestVariableName]: window.location.href,
        },
      });
    }
  }

  return await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      [pageRequestVariableName]: window.location.href,
    },
  });
}
