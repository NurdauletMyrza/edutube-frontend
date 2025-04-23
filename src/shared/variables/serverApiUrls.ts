export const serverApiBaseUrl = "/api";

export const authServerApiBaseUrl = `${serverApiBaseUrl}/auth`;
export const logoutServerApiUrl = `${authServerApiBaseUrl}/logout`;

export const userServerApiBaseUrl = `${serverApiBaseUrl}/authUser`;
export const aboutMeServerApiUrl = `${userServerApiBaseUrl}/details`;
export const deleteCurrentUserServerApiUrl = `${userServerApiBaseUrl}/deleteUser`;
export const createCourseServerApiUrl = `${userServerApiBaseUrl}/createCourse`;
export const getCreatedCoursesServerApiUrl = `${userServerApiBaseUrl}/getCreatedCourses`;
export const createModuleServerApiUrl = `${userServerApiBaseUrl}/createModule`;
export const createLessonServerApiUrl = `${userServerApiBaseUrl}/createLesson`;
export const getLessonDetailsServerApiBaseUrl = `${userServerApiBaseUrl}/getLessonDetails`;
export const getLessonFilesServerApiBaseUrl = `${userServerApiBaseUrl}/getLessonFiles`;
export const deleteLessonFileServerApiBaseUrl = `${userServerApiBaseUrl}/deleteLessonFile`;
export const getLessonFileUploadUrlServerApiUrl = `${userServerApiBaseUrl}/getLessonFileUploadUrl`;
export const saveLessonFileServerApiUrl = `${userServerApiBaseUrl}/saveLessonFile`;

export const coursesServerApiUrl = `${serverApiBaseUrl}/courses`;
export const getAllCoursesServerApiUrl = `${coursesServerApiUrl}/getAllCourses`;
export const getCourseDetailsServerApiBaseUrl = `${coursesServerApiUrl}/getCourseDetails`;

/////////////////////////////////////////

export const usersServerApiBaseUrl = `${serverApiBaseUrl}/users`;
export const checkUserExistenceServerApiUrl = `${usersServerApiBaseUrl}/checkUserExistence`;
export const registerUserServerApiUrl = `${usersServerApiBaseUrl}/register`;
export const activateUserServerApiUrl = `${usersServerApiBaseUrl}/activateUser`;
export const cancelUserActivationServerApiUrl = `${usersServerApiBaseUrl}/cancelUserActivation`;

export const loginServerApiUrl = `${authServerApiBaseUrl}/login`;

export const uploadFileServerApiUrl = `${serverApiBaseUrl}/files/upload`;
