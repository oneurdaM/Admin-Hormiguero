import axios from 'axios'
import { getAuthCredentials } from '@/utils/auth-utils'

const endpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT
const { token } = getAuthCredentials()
let config = {
  headers: {
    Authorization: 'Bearer ' + token,
  },
}

export const getBillboard = async (page: any, search: any) => {
  try {
    search = search ? 'search=' + search + '&' : ''
    page = 'page=' + page
    let fetchingBillboards = true
    const response = await axios.get(
      endpoint + '/events?' + search + page + '&limit=10',
      config
    )
    console.log('response', response)
    const paginatorInfo = {
      total: response?.data.total
        ? parseInt(response.data.total.toString())
        : 0,
      currentPage: response?.data.currentPage
        ? parseInt(response.data.currentPage.toString())
        : 1,
      totalPages: response?.data.totalPages
        ? parseInt(response.data.totalPages.toString())
        : 0,
      perPage: response?.data.perPage
        ? parseInt(response.data.perPage.toString())
        : 0,
    }
    if (response.status === 200) {
      fetchingBillboards = false
      for (let i in response.data.data) {
        response.data.data[i].genderList = ''
        response.data.data[i].thumbnailUrl = response.data.data[i].thumbnailUrl
          ? response.data.data[i].thumbnailUrl
          : 'https://kali-connect.s3.us-west-1.amazonaws.com/_c0c46b43-d047-444c-8665-17092c17ef7b.jpeg'
        if (response.data.data[i].gender.length) {
          for (let x in response.data.data[i].gender) {
            response.data.data[i].genderList +=
              x === '0'
                ? response.data.data[i].gender[x].name
                : ', ' + response.data.data[i].gender[x].name
          }
        }
      }

      return {
        billboards: response.data.data,
        fetchingBillboards,
        paginatorInfo,
        error: '',
      }
    } else {
      fetchingBillboards = false

      return {
        billboards: [],
        fetchingBillboards,
        paginatorInfo,
        error: response.data.message,
      }
    }
  } catch (error: any) {
    const paginatorInfo = {
      total: 0,
      currentPage: 1,
      totalPages: 0,
      perPage: 0,
    }
    return {
      billboards: [],
      fetchingBillboards: false,
      paginatorInfo,
      error: error?.response.data.message,
    }
  }
}

export const getEventsSpaces = async (eventId: any, spaceId: any) => {
  try {
    spaceId = spaceId ? 'spaceId=' + spaceId + '&' : ''
    eventId = 'eventId=' + eventId
    const response = await axios.get(
      endpoint + '/events-spaces?' + spaceId + eventId,
      config
    )
    console.log(endpoint + '/events-spaces?' + spaceId + eventId)
    console.log('response', response)
    if (response.status === 200) {
      return {
        eventsSpaces: response.data,
        error: '',
      }
    } else {
      return {
        eventsSpaces: [],
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      eventsSpaces: [],
      error: error?.response.data.message,
    }
  }
}

export const getSeats = async (eventSpacesId: any) => {
  try {
    const response = await axios.get(
      endpoint + '/seats/' + eventSpacesId,
      config
    )
    console.log('response', response)
    if (response.status === 200) {
      for (let i in response.data) {
        response.data[i].is_selected = false
      }
      return {
        seatsResponse: response.data,
        error: '',
      }
    } else {
      return {
        seatsResponse: [],
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      seatsResponse: [],
      error: error?.response.data.message,
    }
  }
}

export const selectSeat = async (seatSelected: any) => {
  try {
    console.log('seatSelected', seatSelected)
    const body = {
      isSelect: !seatSelected.is_selected,
    }
    console.log('body', body)
    const response = await axios.put(
      endpoint + '/seats/' + seatSelected.id + '/select-unselect',
      body,
      config
    )
    console.log('response', response)
    if (response.status === 200) {
      return {
        seatsResponse: response.data,
        error: '',
      }
    } else {
      console.error('error en else', response)
      return {
        seatsResponse: [],
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      seatsResponse: [],
      error: error?.response.data.message,
    }
  }
}
export const buySeat = async (
  seatsSelected: any,
  details: any,
  method: any,
  userId: any
) => {
  try {
    const seats = []
    for (let i in seatsSelected) {
      seats.push(seatsSelected[i].id)
    }
    const body = {
      userId: userId,
      deliveryDate: null,
      deliveryStatus: null,
      products: null,
      seats: seats,
      rents: null,
      payment: {
        userId: userId,
        name: details.eventSpaces.event.title,
        type: 'GENERAL',
        total: details.subtotal,
        method: method.toUpperCase(),
      },
    }
    const response = await axios.post(endpoint + '/orders', body, config)
    console.log('response', response)
    if (response.status === 200) {
      return {
        seatsResponse: response.data,
        error: '',
      }
    } else {
      console.error('error en else', response)
      return {
        seatsResponse: [],
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      seatsResponse: [],
      error: error?.response.data.message,
    }
  }
}
