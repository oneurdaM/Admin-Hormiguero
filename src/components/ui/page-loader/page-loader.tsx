import { useTranslation } from 'next-i18next'
import cn from 'classnames'
import styles from './page-loader.module.css'

const PageLoader = () => {
  const { t } = useTranslation('common')
  return (
    <div
      className={cn(
        'flex h-screen w-full flex-col items-center justify-center'
      )}
    >
      <div className="relative flex">
        <div className={styles.page_loader}></div>
        <h3 className="absolute top-1/2 -mt-2 w-full text-center text-sm font-semibold italic text-white">
          Cargando
        </h3>
      </div>
    </div>
  )
}

export default PageLoader
