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
  // authorizedLinks: [
  //   {
  //     href: Routes.profileUpdate,
  //     labelTransKey: 'Perfil',
  //   },
  //   {
  //     href: Routes.userNotifications.list,
  //     labelTransKey: 'Notificaciones',
  //   },
  //   {
  //     href: Routes.logout,
  //     labelTransKey: 'Salir',
  //   },
  // ],
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
        icon: 'Pin',
      },
      {
        href: Routes.events.list,
        label: 'Eventos',
        icon: 'CalendarIcon',
      },
      {
        href: Routes.about.list,
        label: 'Impacto social',
        icon: 'ReviewIcon',
      },
      {
        href: Routes.blog.list,
        label: 'Blog',
        icon: 'ChatIcon',
      },

      {
        href: Routes.buyBoxOffice.list,
        label: 'Comprar en taquilla',
        icon: 'TaxesIcon',
      },
      {
        href: Routes.banner.list,
        label: 'Banners',
        icon: 'DiaryIcon',
      },
      {
        href: Routes.fiscal.list,
        label: 'Datos fiscales',
        icon: 'FountainPenIcon',
      },
      {
        href: Routes.reserve.list,
        label: 'Reserva un espació',
        icon: 'TaxesIcon',
      },
    ],
    communication: [
      {
        href: Routes.about.list,
        label: 'Impacto social',
        icon: 'ReviewIcon',
      },
      {
        href: Routes.blog.list,
        label: 'Blog',
        icon: 'ChatIcon',
      },
    ],
    coordination: [
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
        icon: 'Pin',
      },
      {
        href: Routes.events.list,
        label: 'Eventos',
        icon: 'CalendarIcon',
      },
    ],
    technicalarea: [{}],
    cafeteria: [
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
    ],
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
}
