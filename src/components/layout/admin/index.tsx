import Navbar from '@/components/layout/navigation/top-navbar'
import MobileNavigation from '@/components/layout/navigation/mobile-navigation'
import { siteSettings } from '@/settings/site.settings'
import { useTranslation } from 'next-i18next'
import SidebarItem from '@/components/layout/navigation/sidebar-item'
import Image from 'next/image'
import logo from '../../../assets/placeholders/logo-bwb.png'

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation()

  const SidebarItemMap = () => (
    <>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
        <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
      ))}
    </>
  )

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150"
      dir={'ltr'}
    >
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>
      <div className="flex flex-1 pt-20">
        <aside className="xl:w-76 fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-dark px-4 pt-5 shadow ltr:left-0 ltr:right-auto rtl:left-auto rtl:right-0 lg:block">
          <div className=" flex justify-center">
            <span
              className="relative overflow-hidden"
              style={{
                width: siteSettings.logo.width,
                height: siteSettings.logo.height,
              }}
            >
              <Image src={logo} alt="logo-bw" loading="eager" />
            </span>
          </div>
          <div className="flex flex-col space-y-6 py-10">
            <SidebarItemMap />
          </div>
        </aside>
        <main className="ltr:xl:pl-76 rtl:xl:pr-76 w-full ltr:lg:pl-72 rtl:lg:pl-0 rtl:lg:pr-72">
          <div className="h-full w-full p-5 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
export default AdminLayout
