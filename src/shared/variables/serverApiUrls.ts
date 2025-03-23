export const serverApiBaseUrl = "/api";

export const usersServerApiBaseUrl = `${serverApiBaseUrl}/users`;
export const checkUserExistenceServerApiUrl = `${usersServerApiBaseUrl}/checkUserExistence`;
export const registerUserServerApiUrl = `${usersServerApiBaseUrl}/register`;
export const activateUserServerApiUrl = `${usersServerApiBaseUrl}/activateUser`;
export const cancelUserActivationServerApiUrl = `${usersServerApiBaseUrl}/cancelUserActivation`;

export const userServerApiBaseUrl = `${serverApiBaseUrl}/authUser`;
export const aboutMeServerApiUrl = `${userServerApiBaseUrl}/details`;
export const deleteCurrentUserServerApiUrl = `${userServerApiBaseUrl}/deleteUser`;

export const authServerApiBaseUrl = `${serverApiBaseUrl}/auth`;
export const loginServerApiUrl = `${authServerApiBaseUrl}/login`;
export const logoutServerApiUrl = `${authServerApiBaseUrl}/logout`;
export const refreshTokenServerApiUrl = `${authServerApiBaseUrl}/refreshToken`;

export const createCourseServerApiUrl = `${serverApiBaseUrl}/courses/create`;
export const uploadFileServerApiUrl = `${serverApiBaseUrl}/files/upload`;

export const useAuthServerApiBaseUrls = [
  authServerApiBaseUrl,
  userServerApiBaseUrl,
  createCourseServerApiUrl,
  uploadFileServerApiUrl,
];
