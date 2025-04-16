import { fetchApiClient } from "@/shared/utils/apiClient";
import { createCourseServerApiUrl } from "@/shared/variables/serverApiUrls";

export async function createCourse(title: string, description: string) {
  try {
    const response = await fetchApiClient(createCourseServerApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
