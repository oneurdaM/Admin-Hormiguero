import { Routes } from '@/config/routes'

export const siteSettings = {
  name: 'Centro Cultural El Hormiguero',
  description: 'Centro Cultural El Hormiguero Admin Panel',
  logo: {
    url: '/images/logo.png',
    alt: 'KaliConnect',
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
      href: Routes.logout,
      labelTransKey: 'Salir',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: Routes.users.list,
        label: 'Administrador Usuarios',
        icon: 'UsersIcon',
      },
      {
        href: Routes.orders.list,
        label: 'Monitoreo de Pedidos',
        icon: 'DashboardIcon',
      },
      {
        href: Routes.products.list,
        label: 'Productos',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.blog.list,
        label: 'Blog de Notas',
        icon: 'ReviewIcon',
      },
      // {
      //   href: Routes.dashboard,
      //   label: 'Dashboard',
      //   icon: 'DashboardIcon',
      // },
      // {
      //   href: Routes.conversations.list,
      //   label: 'Chat',
      //   icon: 'ChatIcon',
      // },
      // {
      //   href: Routes.users.list,
      //   label: 'Usuarios',
      //   icon: 'UsersIcon',
      // },
      // {
      //   href: Routes.environments.list,
      //   label: 'Entornos',
      //   icon: 'EnvironmentsIcon',
      // },
      // {
      //   href: Routes.storeNotice.list,
      //   label: 'sidebar-nav-item-store-notice',
      //   icon: 'StoreNoticeIcon',
      // },
      // {
      //   href: Routes.blog.list,
      //   label: 'Notas',
      //   icon: 'ProductsIcon',
      // },
      // {
      //   href: Routes.cateogires.list,
      //   label: 'Categorías',
      //   icon: 'CategoriesIcon',
      // },
      // {
      //   href: Routes.alerts.list,
      //   label: 'Alertas',
      //   icon: 'Bell',
      // },
      // {
      //   href: Routes.suggestions.list,
      //   label: 'Sugerencias',
      //   icon: 'ReviewIcon',
      // },
      // {
      //   href: Routes.settings,
      //   label: 'Configuración',
      //   icon: 'SettingsIcon',
      // },
    ],
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
}
