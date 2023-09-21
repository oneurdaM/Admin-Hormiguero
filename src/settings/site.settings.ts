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
      href: Routes.userAlerts.list,
      labelTransKey: 'Alertas',
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
        label: 'Administrador de Usuarios',
        icon: 'UsersIcon',
      },
      {
        href: Routes.users.list,
        label: 'Pedidos',
        icon: 'DashboardIcon',
      },
      {
        href: Routes.products.list,
        label: 'Productos',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.alerts.list,
        label: 'Configuración de Alertas',
        icon: 'Bell',
      },
      // {
      //   href: Routes.modules.list,
      //   label: 'Modulos y Tareas',
      //   icon: 'Bell',
      // },
      // {
      //   href: Routes.events.list,
      //   label: 'Eventos',
      //   icon: 'UsersIcon',
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
      {
        href: Routes.blog.list,
        label: 'Blog',
        icon: 'ReviewIcon',
      },
    ],
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
}
