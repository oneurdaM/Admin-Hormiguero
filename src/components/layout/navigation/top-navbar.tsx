// import Logo from '@/components/ui/logo'
import { useUI } from '@/contexts/ui.context'
import AuthorizedMenu from './authorized-menu'
import { NavbarIcon } from '@/components/icons/navbar-icon'
import { motion } from 'framer-motion'

// import LanguageSwitcher from './language-switcher'
// import { Config } from '@/config'

const Navbar = () => {
  const { toggleSidebar } = useUI()

  // const { enableMultiLang } = Config

  return (
    <header className="fixed w-full bg-white shadow">
      <nav className="flex items-center justify-between px-5 py-4 md:px-8">
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-none lg:hidden"
        >
          <NavbarIcon />
        </motion.button>

        <div className="me-auto ms-5 hidden md:flex">{/* <Logo /> */}</div>

        <div className="flex items-center space-s-8">
          {/* {enableMultiLang ? <LanguageSwitcher /> : null} */}
          <AuthorizedMenu />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
