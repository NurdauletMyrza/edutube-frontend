import { useAuthServerApiBaseUrls } from "@/shared/variables/serverApiUrls";

export async function fetchApiClient(input: RequestInfo, init?: RequestInit) {
  let isUseAuthReq = false;
  for (const useAuthServerApiBaseUrl of useAuthServerApiBaseUrls) {
    isUseAuthReq = input.toString().startsWith(useAuthServerApiBaseUrl);
    if (isUseAuthReq) break;
  }
  if (isUseAuthReq) {
    return await fetch(input, {
      ...init,
      credentials: "include", // 🔹 Включаем cookies
    });
  }
  return await fetch(input, init);
}
