import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  cancelUserActivationServerApiUrl,
  activateUserServerApiUrl,
} from "@/shared/variables/serverApiUrls";

export async function activateUser(
  password: string,
  uidb64: string | string[] | undefined,
  token: string | string[] | undefined
) {
  try {
    const response = await fetchApiClient(activateUserServerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, code1: uidb64, code2: token }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function cancelUserActivation(
  email: string,
  uidb64: string | string[] | undefined
) {
  try {
    const response = await fetchApiClient(cancelUserActivationServerApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code: uidb64 }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
