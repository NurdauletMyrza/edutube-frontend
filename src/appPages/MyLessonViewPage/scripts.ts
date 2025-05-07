import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  deleteLessonFileServerApiBaseUrl,
  generateLessonTestServerApiUrl,
  getLessonFileUploadUrlServerApiUrl,
  getLessonTestServerApiBaseUrl,
  getTestStatusServerApiBaseUrl,
  saveLessonFileServerApiUrl,
} from "@/shared/variables/serverApiUrls";

export async function getLessonFileUploadUrl(
  filename: string,
  mime_type: string
) {
  try {
    const response = await fetchApiClient(getLessonFileUploadUrlServerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename, mime_type }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function saveLessonFile(
  lesson: number,
  file_id: string,
  filename: string
) {
  try {
    const response = await fetchApiClient(saveLessonFileServerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lesson, file_id, filename }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function deleteLessonFile(lessonFileId: number) {
  try {
    const response = await fetchApiClient(
      `${deleteLessonFileServerApiBaseUrl}/${lessonFileId}`,
      { method: "DELETE" }
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function generateTestForLesson(lessonId: number) {
  try {
    const response = await fetchApiClient(generateLessonTestServerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonId }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getLessonTest(lessonId: number) {
  try {
    const response = await fetchApiClient(
      `${getLessonTestServerApiBaseUrl}/${lessonId}`
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getTestStatus(testId: number) {
  try {
    const response = await fetchApiClient(
      `${getTestStatusServerApiBaseUrl}/${testId}`
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
