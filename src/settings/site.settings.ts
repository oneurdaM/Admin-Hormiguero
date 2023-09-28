import { Routes } from '@/config/routes'

export const siteSettings = {
  name: 'Centro Cultural El Hormiguero',
  description: 'Centro Cultural El Hormiguero Admin Panel',
  logo: {
    url: '/images/logo.png',
    alt: 'Hormiguero',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'es',
  author: {
    name: 'SISSA Digital',
    websiteUrl: 'https://sissadigital.com',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.profileUpdate,
      labelTransKey: 'Perfil',
    },
    {
      href: Routes.userNotifications.list,
      labelTransKey: 'Notificaciones',
    },
    {
      href: Routes.logout,
      labelTransKey: 'Salir',
    },
  ],
  currencyCode: 'MXN',
  sidebarLinks: {
    admin: [
      {
        href: Routes.users.list,
        label: 'Usuarios',
        icon: 'UsersIcon',
      },
      {
        href: Routes.orders.list,
        label: 'Pedidos',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.products.list,
        label: 'Productos',
        icon: 'DashboardIcon',
      },
      {
        href: Routes.alerts.list,
        label: 'Alertas',
        icon: 'Bell',
      },
      {
        href: Routes.spaces.list,
        label: 'Espacios',
        icon: 'Bell',
      },
      {
        href: Routes.events.list,
        label: 'Eventos',
        icon: 'Bell',
      },
      {
        href: Routes.users.list,
        label: 'Impacto social',
        icon: 'Bell',
      },
      {
        href: Routes.blog.list,
        label: 'Blog',
        icon: 'ReviewIcon',
      },

      // {
      //   href: Routes.modules.list,
      //   label: 'Modulos y Tareas',
      //   icon: 'Bell',
      // },
      // {
      //   href: Routes.casts.list,
      //   label: 'Elencos',
      //   icon: 'UsersIcon',
      // },
      // {
      //   href: Routes.genders.list,
      //   label: 'Genres',
      //   icon: 'UsersIcon',
      // },
    ],
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
}
