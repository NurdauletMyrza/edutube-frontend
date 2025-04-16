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
export const userCreatedCoursesApiUrl = `${backendApiBaseUrl}courses/user-created/`;
export const allCoursesApiUrl = `${backendApiBaseUrl}courses/all/`;
export const getCourseDetailsApiBaseUrl = `${backendApiBaseUrl}courses/course/`;
