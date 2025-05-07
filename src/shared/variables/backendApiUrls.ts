const backendApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const refreshTokensApiUrl = `${backendApiBaseUrl}users/user/token/refresh/`;

///////////////////////////////////////////////////

export const activateUserApiBaseUrl = `${backendApiBaseUrl}users/activate/`;
export const cancelUserActivationApiBaseUrl = `${backendApiBaseUrl}users/cancel-activation/`;
export const checkUserExistenceApiBaseUrl = `${backendApiBaseUrl}users/check-user/`;
export const userDeleteApiUrl = `${backendApiBaseUrl}users/user/delete-user/`;
export const getTokenApiUrl = `${backendApiBaseUrl}users/user/token/`;
export const userDetailsApiUrl = `${backendApiBaseUrl}users/user/details/`;
export const logoutUserApiUrl = `${backendApiBaseUrl}users/user/logout/`;

export const registerUserApiUrl = `${backendApiBaseUrl}users/register/`;
export const uploadFileApiUrl = `${backendApiBaseUrl}upload-file/`;
export const createCourseApiUrl = `${backendApiBaseUrl}courses/course/create/`;
export const createModuleApiUrl = `${backendApiBaseUrl}courses/module/create/`;
export const createLessonApiUrl = `${backendApiBaseUrl}courses/lesson/create/`;
export const userCreatedCoursesApiUrl = `${backendApiBaseUrl}courses/user-created/`;
export const allCoursesApiUrl = `${backendApiBaseUrl}courses/all/`;
export const getCourseDetailsApiBaseUrl = `${backendApiBaseUrl}courses/course/`;
export const getLessonDetailsApiBaseUrl = `${backendApiBaseUrl}courses/lesson/`;
export const deleteLessonFileApiBaseUrl = `${backendApiBaseUrl}courses/file/delete-lesson-file/`;
export const getLessonFilesApiBaseUrl = `${backendApiBaseUrl}courses/files/get-lesson-files/`;
export const getLessonTestApiBaseUrl = `${backendApiBaseUrl}tests/test/lesson/`;
export const getLessonTestStatusApiBaseUrl = `${backendApiBaseUrl}tests/test/lesson-status/`;
export const getLessonFileUploadUrlApiUrl = `${backendApiBaseUrl}courses/file/upload-url/`;
export const saveLessonFileApiUrl = `${backendApiBaseUrl}courses/file/save-file/`;
export const generateLessonTestApiUrl = `${backendApiBaseUrl}tests/test/generate/`;
