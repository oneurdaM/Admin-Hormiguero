import axios from 'axios'
import { API_ENDPOINTS } from './api-endpoints'
import { getAuthCredentials } from '@/utils/auth-utils'

const { token } = getAuthCredentials()

export const downloadTicketpdf = async (orderId: number) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REST_API_ENDPOINT +
        '/' +
        API_ENDPOINTS.ORDERS +
        '/file/' +
        orderId,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        responseType: 'blob',
      }
    )
    console.log('response', response)
    if (response.status === 200) {
      return {
        downloadTicket: response.data,
        error: '',
      }
    } else {
      return {
        downloadTicket: null,
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      downloadTicket: null,
      error: error?.response.data.message,
    }
  }
}
