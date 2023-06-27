export const Routes = {
  dashboard: '/',
  login: '/login',
  logout: '/logout',
  profile: '/profile',
  settings: '/settings',
  forgotPassword: '/forgot-password',
  profileUpdate: '/profile-update',
  message: {
    ...routesFactory('/message'),
  },
  userMessage: {
    ...routesFactory('/user-message'),
  },
  blog: {
    ...routesFactory('/blog'),
  },
  alerts: {
    ...routesFactory('/alerts'),
  },
  suggestions: {
    ...routesFactory('/suggestions'),
  },
  tracker: {
    ...routesFactory('/tracker'),
  },
  users: {
    ...routesFactory('/users'),
  },
  storeNotice: {
    ...routesFactory('/store-notice'),
  },
  operators: {
    ...routesFactory('/operators'),
  },
  conversations: {
    ...routesFactory('/conversations'),
  },
}

function routesFactory(endpoint: string) {
  return {
    list: `${endpoint}`,
    create: `${endpoint}/create`,
    editWithoutLang: (slug: string, environment?: string) => {
      return environment
        ? `/${environment}${endpoint}/${slug}/edit`
        : `${endpoint}/${slug}/edit`
    },
    edit: (slug: string, language: string, environment?: string) => {
      return environment
        ? `/${language}/${environment}${endpoint}/${slug}/edit`
        : `${language}${endpoint}/${slug}/edit`
    },
    details: (slug: string) => `${endpoint}/${slug}`,
  }
}
