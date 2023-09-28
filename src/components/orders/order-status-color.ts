const StatusColor = (status: string) => {
  let bg_class = ''

  switch (status) {
    case 'dispatch':
      bg_class = 'bg-[#dc2626]'
      break
    case 'pending':
      bg_class = 'bg-[#10B981]'
      break
    case 'complete':
      bg_class = 'bg-[#9CA3AF]'
      break
    default:
      bg_class = 'bg-[#9CA3AF]'
  }

  return bg_class
}

export default StatusColor
