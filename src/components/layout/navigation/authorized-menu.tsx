import cn from 'classnames'
import { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { Menu, Transition } from '@headlessui/react'

import { useSockets } from '@/contexts/socket.context'

import Link from '@/components/ui/link'
import { siteSettings } from '@/settings/site.settings'
import { useMeQuery } from '@/data/user'
import Avatar from '@/components/common/avatar'

export default function AuthorizedMenu() {
  const { unattendedAlerts } = useSockets()
  const { data } = useMeQuery()
  const { t } = useTranslation('common')
  // Again, we're using framer-motion for the transition effect

  //image validation
  const image =
    data?.image !== '' && data?.image !== null && data?.image !== undefined
      ? data?.image
      : siteSettings?.avatar?.placeholder

  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <Menu.Button className="flex items-center focus:outline-none">
        <Avatar src={image} alt="avatar" alerts={unattendedAlerts} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute end-0 mt-1 w-48 rounded bg-white shadow-md origin-top-end focus:outline-none"
        >
          <Menu.Item key={data?.email}>
            <li
              className="flex w-full flex-col space-y-1 rounded-t
             bg-[#082f75] px-4 py-3 text-sm text-white"
            >
              <span className="font-semibold capitalize">
                {data?.firstName}
              </span>
              <span className="text-xs">{data?.email}</span>
            </li>
          </Menu.Item>

          {siteSettings.authorizedLinks.map(({ href, labelTransKey }) => (
            <Menu.Item key={`${href}${labelTransKey}`}>
              {({ active }) => (
                <li className="cursor-pointer border-b border-gray-100 last:border-0">
                  <Link
                    href={href}
                    className={cn(
                      'block px-4 py-3 text-sm font-semibold capitalize transition duration-200 hover:text-accent',
                      active ? 'text-accent' : 'text-heading'
                    )}
                  >
                    {t(labelTransKey)}
                  </Link>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
