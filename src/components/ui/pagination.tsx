import RCPagination, { PaginationProps } from 'rc-pagination'
import { ArrowNext } from '@/components/icons/arrow-next'
import { ArrowPrev } from '@/components/icons/arrow-prev'
import 'rc-pagination/assets/index.css'
import { Tooltip } from 'antd'

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      showTitle={false}
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  )
}

export default Pagination
