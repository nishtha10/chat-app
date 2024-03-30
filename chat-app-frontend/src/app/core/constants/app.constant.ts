export class AppConstants {
    static sessionInitial = 'chatApp';
    static secretKey = 'chatAppSecretKey';
    static userInfo = 'user';
}

export const CONSTANT_MESSAGE = {
    loginSuccess: 'User login successfully!'
}

export const MESSAGE_TYPE = {
    error: 'error',
    success: 'success',
    info: 'info',
    warning: 'warning',
} as const;

export const API_ROUTES = {
    chatListApi: '/chat/list',
    chatHistoryApi: '/messages/history',
    loginUserApi: '/auth/login'
}

export const ERROR_CODE = {
    'notFound': 404,
    'internalServer': 500,
    'unauthorized': 401,
    'forbidden': 403,
    'badRequest': 400,
    'serverTimeOut': 502
} as const;

export const TOAST_TIMER_DURATION = 3000;
export const SET_TIMER = 100;
export const LOADER_SET_TIMER = 1500;