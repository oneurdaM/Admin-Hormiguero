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
  userNotifications: {
    ...routesFactory('/'),
  },
  orders: {
    ...routesFactory('/orders'),
  },
  products: {
    ...routesFactory('/products'),
  },
  departments: {
    ...routesFactory('/departments'),
  },
  blog: {
    ...routesFactory('/blog'),
  },
  categories: {
    ...routesFactory('/categories'),
  },
  alerts: {
    ...routesFactory('/alerts'),
  },
  spaces: {
    ...routesFactory('/spaces'),
  },
  reservations: {
    ...routesFactory('/reservations'),
  },
  tickets: {
    ...routesFactory('/tickets'),
  },
  events: {
    ...routesFactory('/events'),
  },
  casts: {
    ...routesFactory('/casts'),
  },
  genres: {
    ...routesFactory('/genres'),
  },
  about: {
    ...routesFactory('/about'),
  },
  community: {
    ...routesFactory('/community'),
  },
  sections: {
    ...routesFactory('/sections'),
  },
  buyBoxOffice: {
    ...routesFactory('/boxOffice'),
  },
  banner: {
    ...routesFactory('/banner'),
  },
  fiscal: {
    ...routesFactory('/fiscal'),
  },
  reserve: {
    ...routesFactory('/reserve'),
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
