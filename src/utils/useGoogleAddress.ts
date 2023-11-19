import { useState, useEffect } from 'react'
import axios from 'axios'

const useGoogleAddress = (address: string) => {
  const [map, setMap] = useState({})
  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`

  useEffect(() => {
    async function fetchAddress() {
      try {
        const response = await axios(API)
        if (response.status === 200) {
          setMap(response.data.results[0].geometry.location)
        } else {
          console.error('Request was not successful. Response:', response)
        }
      } catch (error) {
        console.error('An error occurred while making the request:', error)
      }
    }
    fetchAddress()
  }, [API])

  return map
}

export { useGoogleAddress }
