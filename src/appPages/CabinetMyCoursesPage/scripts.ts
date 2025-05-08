import {
  getCreatedCoursesServerApiUrl,
  getEnrolledCoursesServerApiUrl,
} from "@/shared/variables/serverApiUrls";
import { fetchApiClient } from "@/shared/utils/apiClient";

export async function getMyCourses() {
  try {
    const response = await fetchApiClient(getCreatedCoursesServerApiUrl);

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getEnrolledCourses() {
  try {
    const response = await fetchApiClient(getEnrolledCoursesServerApiUrl);

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
