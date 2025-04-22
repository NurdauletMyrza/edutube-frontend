import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  getLessonFileUploadUrlServerApiUrl,
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
  file_id: number,
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
