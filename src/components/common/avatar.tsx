import cn from 'classnames'
import Image from 'next/image'

type AvatarProps = {
  className?: string
  src: string
  alt?: string
  width?: number
  height?: number
  online?: boolean
  alerts?: number | null
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  className,
  alt = 'Avatar',
  onClick,
  online,
  alerts,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'border-border-900 relative h-10 w-10 cursor-pointer border',
        className
      )}
      {...rest}
    >
      <Image
        alt={alt}
        src={src}
        fill
        priority={true}
        sizes="(max-width: 768px) 100vw"
      />

      <span
        className={`z-2 absolute bottom-6 left-7 my-1 h-4 w-4 rounded-full text-xs  
        ${
          alerts !== 0
            ? 'bg-[#FFAEAF] text-[#d60001]'
            : 'bg-[#024154] text-white'
        }`}
        title="New Alerts"
      >
        {alerts}
      </span>
    </div>
  )
}

export default Avatar
