import Image from 'next/image'
import Link from '@/components/ui/link'
import cn from 'classnames'
import { useSettings } from '@/contexts/settings.context'
import { siteSettings } from '@/settings/site.settings'

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const { logo, siteTitle } = useSettings()
  return (
    <Link
      href={siteSettings.logo.href}
      className={cn('inline-flex', className)}
      {...props}
    >
      <span
        className="relative overflow-hidden"
        style={{
          width: siteSettings.logo.width,
          height: siteSettings.logo.height,
        }}
      >
        <Image
          src={logo?.original ?? siteSettings.logo.url}
          alt={siteTitle ?? siteSettings.logo.alt}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover"
          loading="eager"
        />
      </span>
    </Link>
  )
}

export default Logo
