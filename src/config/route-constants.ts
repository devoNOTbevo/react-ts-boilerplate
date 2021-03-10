export enum PUBLIC_PATHS {
  LOGIN_PATH = '/login',
  RESET_PATH = '/reset',
  SIGNUP_PATH = '/signup',
}

export enum PROTECTED_PATHS {
  HOME_PATH = '/',
  ENTRY_PATH = '/questionnaire',
}

export function isPublicPath(path: string) {
  const found = Object.values(PUBLIC_PATHS).find((p) => path === p);
  return !!found;
}
