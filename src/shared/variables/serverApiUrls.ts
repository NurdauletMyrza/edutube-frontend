export const serverApiBaseUrl = "/api";

export const authServerApiBaseUrl = `${serverApiBaseUrl}/auth`;
export const logoutServerApiUrl = `${authServerApiBaseUrl}/logout`;

export const userServerApiBaseUrl = `${serverApiBaseUrl}/authUser`;
export const aboutMeServerApiUrl = `${userServerApiBaseUrl}/details`;
export const deleteCurrentUserServerApiUrl = `${userServerApiBaseUrl}/deleteUser`;

/////////////////////////////////////////

export const usersServerApiBaseUrl = `${serverApiBaseUrl}/users`;
export const checkUserExistenceServerApiUrl = `${usersServerApiBaseUrl}/checkUserExistence`;
export const registerUserServerApiUrl = `${usersServerApiBaseUrl}/register`;
export const activateUserServerApiUrl = `${usersServerApiBaseUrl}/activateUser`;
export const cancelUserActivationServerApiUrl = `${usersServerApiBaseUrl}/cancelUserActivation`;

export const loginServerApiUrl = `${authServerApiBaseUrl}/login`;

export const createCourseServerApiUrl = `${serverApiBaseUrl}/courses/create`;
export const uploadFileServerApiUrl = `${serverApiBaseUrl}/files/upload`;
