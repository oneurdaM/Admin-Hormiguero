const StatusColor = (status: string) => {
  let bg_class = ''

  switch (status) {
    case 'PROCESANDO':
      bg_class = 'bg-[#FF6666]' // Rojo suave
      break
    case 'PROCESADO':
      bg_class = 'bg-[#FFD700]' // Amarillo suave
      break
    case 'ENVIANDO':
      bg_class = 'bg-[#A0522D]' // Café suave
      break
    case 'ENTREGADO':
      bg_class = 'bg-[#66CDAA]' // Verde suave
      break
    default:
      bg_class = 'bg-[#B0C4DE]' // Por defecto (Gris azulado)
  }

  return bg_class
}

export default StatusColor
