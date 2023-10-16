import React from 'react'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const Map = ({ data }: { data: { lat: number; lng: number } }) => {
  const containerStyle = {
    width: '100%',
    height: '40vh',
  }

  const center = {
    lat: data.lat,
    lng: data.lng,
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCtAae1VdKZ5h7m1CmyKQldt9A0UniM3Dk',
    libraries: ['places'],
  })

  if (!isLoaded) {
    <>Loading</>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  )
}
export default Map
