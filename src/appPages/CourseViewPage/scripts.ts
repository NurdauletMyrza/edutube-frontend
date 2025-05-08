import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  enrollInCourseServerApiUrl,
  isEnrolledCourseServerApiUrl,
} from "@/shared/variables/serverApiUrls";

export async function enrollInCourse(courseId: number) {
  try {
    const response = await fetchApiClient(
      `${enrollInCourseServerApiUrl}/${courseId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function isEnrolledCourse(courseId: number) {
  try {
    const response = await fetchApiClient(
      `${isEnrolledCourseServerApiUrl}/${courseId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    return { ok: false, error };
  }
}
