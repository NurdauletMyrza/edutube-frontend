import { getAllCoursesServerApiUrl } from "@/shared/variables/serverApiUrls";
import { fetchApiClient } from "@/shared/utils/apiClient";

export async function getAllCourses() {
  try {
    const response = await fetchApiClient(getAllCoursesServerApiUrl);

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
