import Logo from '@/components/ui/logo'
import { CloseIcon } from '@/components/icons/close-icon'
import Scrollbar from './scrollbar'

import { siteSettings } from '@/settings/site.settings'
import Image from 'next/image'
import logo from '../../assets/placeholders/logo.png'

type DrawerWrapperProps = {
  hideTopBar?: boolean
  children: any
  onClose?: () => void
}

const DrawerWrapper: React.FunctionComponent<DrawerWrapperProps> = ({
  hideTopBar = false,
  children,
  onClose,
}) => {
  return (
    <div className="relative flex h-full flex-col bg-black">
      {!hideTopBar && (
        <div className="absolute start-0 top-0 z-30 mb-4 flex h-16 w-full items-center justify-between  px-5 md:mb-6 md:px-8 md:py-5">
          {/* <Logo className="w-24 md:w-auto" /> */}
          <span
            className="relative overflow-hidden"
            style={{
              width: siteSettings.logo.width,
              height: siteSettings.logo.height,
            }}
          >
            <Image
              src={logo}
              alt="logo-bw"
              loading="eager"
              sizes="(max-width: 768px) 100vw"
              className="object-cover"
              fill
            />
          </span>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-body transition-all duration-200 hover:bg-accent hover:text-light focus:bg-accent focus:text-light focus:outline-none"
          >
            <CloseIcon className="h-2.5 w-2.5" />
          </button>
        </div>
      )}
      {/* End of header part */}
      <div className="h-full pt-16">
        <Scrollbar className="h-full w-full">{children}</Scrollbar>
      </div>
      {/* End of menu part */}
    </div>
  )
}

export default DrawerWrapper
