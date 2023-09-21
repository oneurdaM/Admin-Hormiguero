export const API_ENDPOINTS = {
  REGISTER: '/auth/signup',
  LOGOUT: '/auth/logout',
  LOGIN: '/auth/login',
  ME: '/users/me',
  EVENTS: '/events',
  STAFFS: '/staffs',
  ADD_STAFF: '/staffs',
  REMOVE_STAFF: '/staffs',
  ADMIN_LIST: '/admin/list',
  STORE_NOTICES: '/notice',
  USERS: 'users',
  BLOG: 'notes',
  UPLOAD: 'upload',
  SETTINGS: 'settings',
  RESET_PASSWORD: 'auth/reset-password',
  FORGOT_PASSWORD: 'auth/forgot-password',
  VERIFY_FORGET_PASSWORD_TOKEN: 'verify-forget-password-token',
  ANALYTICS: 'analytics',
  UPDATE_PASSWORD: '/auth/change-password',
  SUGGESTIONS: '/suggestions',
  // Chat
  CONVERSIONS: '/chat/conversations',
  MESSAGE: '/chat/conversations',
  CREATE_MESSAGE: '/chat/message',
  MESSAGE_SEEN: '/chat/message/seen',
  CREATE_CONVERSION: '/chat/conversation',

  CHANGE_PASSWORD: 'change-password',
  FORGET_PASSWORD: 'forget-password',
  ENVIRONMENTS: 'configuration/environments',
  CATEGORY: 'category',
  ALERTS: 'alerts',
  NOTICE: 'notice',
  PRODUCTS: 'product',
  PRODUCTS_CATEGORIES: 'catalog-prodructs', //has a typo

  TRACKER: 'tracker',
  TRACK_USER: 'tracker/user',

  // Cast
  CAST: 'casts',
  GENDER: 'genders',
}
