import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from '@/components/ui/logo'
import React from 'react'
import logo from '../../assets/placeholders/logo-bw.png'

export default function AuthPageLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <div className="flex h-screen flex-row" dir="ltr">
        <div className="hidden flex-1 items-center justify-center bg-dark text-white md:flex ">
          <div className=" w-auto max-w-[700px]">
            <Image src={logo} alt="logo-bw" loading="eager" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <div className="m-auto w-full max-w-[420px] rounded bg-gray-100 p-5 sm:p-8 sm:shadow md:bg-light">
            <div className="flex h-[100px] items-center justify-center">
              <Logo />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
