export const Routes = {
  dashboard: '/',
  login: '/login',
  logout: '/logout',
  profile: '/profile',
  settings: '/settings',
  forgotPassword: '/forgot-password',
  profileUpdate: '/profile-update',
  users: {
    ...routesFactory('/users'),
  },
  orders: {
    ...routesFactory('/orders'),
  },
  products: {
    ...routesFactory('/products'),
  },
  productsCategories: {
    ...routesFactory('/products-categories'),
  },
  blog: {
    ...routesFactory('/blog'),
  },
  categories: {
    ...routesFactory('/categories')
  },
  events: {
    ...routesFactory('/events'),
  },
  casts: {
    ...routesFactory('/casts'),
  },
  genders: {
    ...routesFactory('/genders'),
  },
  alerts: {
    ...routesFactory('/alerts'),
  },
  userAlerts: {
    ...routesFactory('/'),
  },
  modules: {
    ...routesFactory('/modules-tasks'),
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
    edit: ({ id, environment }: { id: string; environment?: string }) => {
      return environment
        ? `/${environment}${endpoint}/${id}/edit`
        : `${endpoint}/${id}/edit`
    },
    details: ({ id }: { id: string }) => `${endpoint}/${id}`,
  }
}
