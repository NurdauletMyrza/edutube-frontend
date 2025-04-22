import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  logoutServerApiUrl,
  deleteCurrentUserServerApiUrl,
  getCourseDetailsServerApiBaseUrl,
  getLessonDetailsServerApiBaseUrl,
  getLessonFilesServerApiBaseUrl,
} from "@/shared/variables/serverApiUrls";

export async function getLessonFiles(lessonId: number) {
  try {
    const response = await fetchApiClient(
      `${getLessonFilesServerApiBaseUrl}/${lessonId}`
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getLessonDetails(lessonId: number) {
  try {
    const response = await fetchApiClient(
      `${getLessonDetailsServerApiBaseUrl}/${lessonId}`
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getCourseDetails(courseId: number) {
  try {
    const response = await fetchApiClient(
      `${getCourseDetailsServerApiBaseUrl}/${courseId}`
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function logoutCurrentUser() {
  try {
    const response = await fetchApiClient(logoutServerApiUrl);

    if (response.ok) {
      return { ok: true, success: "User logout" };
    } else {
      return { ok: false, error: "Logout failed" };
    }
  } catch (error) {
    return { ok: false, error };
  }
}

export async function deleteCurrentUser(password: string) {
  try {
    const response = await fetchApiClient(deleteCurrentUserServerApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
