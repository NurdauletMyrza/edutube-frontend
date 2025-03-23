import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  checkUserExistenceServerApiUrl,
  loginServerApiUrl,
} from "@/shared/variables/serverApiUrls";

export async function checkUserExistence(email: string) {
  try {
    const response = await fetchApiClient(checkUserExistenceServerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await fetchApiClient(loginServerApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
