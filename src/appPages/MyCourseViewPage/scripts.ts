import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  createLessonServerApiUrl,
  createModuleServerApiUrl,
} from "@/shared/variables/serverApiUrls";
import { createLessonInput, createModuleInput } from "@/shared/utils/types";

export async function createModule(moduleFormData: createModuleInput) {
  try {
    const response = await fetchApiClient(createModuleServerApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(moduleFormData),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function createLesson(lessonFormData: createLessonInput) {
  try {
    const response = await fetchApiClient(createLessonServerApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonFormData),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
