import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from '@/components/ui/logo'
import React from 'react'
import logo from '../../assets/placeholders/logo-bw.png'

export default function AuthPageLayout({
  children,
}: React.PropsWithChildren<{}>) {
  // const { locale } = useRouter();
  // const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  return (
    <>
      {/* <div
      className="flex h-screen items-center justify-center sm:bg-gray-100"
      dir="ltr"
    >
      <div className="m-auto w-full max-w-[420px] rounded bg-light p-5 sm:p-8 sm:shadow">
        <div className="flex h-[100px] items-center justify-center">
          <Logo />
        </div>
        {children}
      </div>
    </div> */}
      <div className="flex h-screen flex-row">
        <div className="flex flex-1 items-center justify-center bg-dark text-white ">
          <div className=" w-auto max-w-[700px]">
            <Image src={logo} alt="logo-bw" loading="eager" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <div className="m-auto w-full max-w-[420px] rounded bg-light p-5 sm:p-8 sm:shadow">
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
