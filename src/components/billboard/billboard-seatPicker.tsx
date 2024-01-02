'use client'
import React, { useState, useEffect } from 'react'
import { Row, Col, notification, Avatar, Badge, Card, Button } from 'antd'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Loader from '../ui/loader/loader'
import Image from 'next/image'
import { SeatResponse, Seat, Details } from '@/types/billboard'

import escenario from '../../assets/escenario.svg'
import { getSeats, selectSeat } from '@/data/client/billboard'

const BillboardSeatPicker = (props: any) => {
  useEffect(() => {
    fetchData(props.eventSpaces)
  }, [])
  const [fetchingSeat, setFetchingSeat] = useState(false)
  const [details, setDetails] = useState<Details>()
  const [eventsSpacesResponse, setSeatResponse] = useState<SeatResponse>({
    seatsResponse: [],
    error: '',
  })

  const [api, contextHolder] = notification.useNotification()

  const fetchData = async (eventSpacesId: any) => {
    try {
      setFetchingSeat(true)
      const response = await getSeats(eventSpacesId.id)
      console.log('response', response)
      setSeatResponse(response)
      setFetchingSeat(false)
    } catch (error: any) {
      api.error({
        message: 'Error',
        description: error,
      })
      setSeatResponse({ seatsResponse: [], error: '' })
    }
  }

  const onSelectSeat = async (value: Seat) => {
    if (value.is_available) {
      console.log('eventSpaces, value', props.eventSpaces, value)

      let seatSelected = false
      setFetchingSeat(true)
      const response = await selectSeat(value)
      console.log('response', response)
      setFetchingSeat(false)
      if (response.error) {
        api.error({
          message: response.error,
        })
      } else {
        console.log('else de fetch')
        seatSelected = true
      }

      let quantity = 0
      const seatsSelectedLocal = []
      console.log('seatSelected', seatSelected)
      if (seatSelected) {
        for (let i in eventsSpacesResponse.seatsResponse) {
          if (eventsSpacesResponse.seatsResponse[i].id === value.id) {
            eventsSpacesResponse.seatsResponse[i].is_selected =
              !eventsSpacesResponse.seatsResponse[i].is_selected
            setSeatResponse({ ...eventsSpacesResponse })
          }
        }
        for (let i in eventsSpacesResponse.seatsResponse) {
          if (eventsSpacesResponse.seatsResponse[i].is_selected) {
            quantity++
            seatsSelectedLocal.push(eventsSpacesResponse.seatsResponse[i])
          }
        }
      }
      let detailsLocal = {
        eventSpaces: props.eventSpaces,
        quantity,
        subtotal: quantity * props.eventSpaces.price,
      }
      setDetails(detailsLocal)
      props.seatsChosen(detailsLocal, seatsSelectedLocal)
    }
  }
  const onNext = () => {
    props.next()
  }

  if (eventsSpacesResponse.error) {
    api.error({
      message: 'Error',
      description: eventsSpacesResponse.error,
    })
  }
  return (
    <>
      {contextHolder}
      {!fetchingSeat ? (
        <Row justify="space-between">
          <Col xs={24} lg={16}>
            <TransformWrapper>
              <TransformComponent>
                <Row justify="space-around">
                  <Col xs={16} lg={16}>
                    <Image className="stageImg" alt="" src={escenario} />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  {eventsSpacesResponse.seatsResponse?.map(
                    (item: any, index: number) => (
                      <>
                        <Col key={item.id} xs={0} lg={2}>
                          <Avatar
                            className="avatarHover"
                            size={40}
                            onClick={() => onSelectSeat(item)}
                            style={{
                              cursor: item.is_available
                                ? 'pointer'
                                : 'not-allowed',
                              backgroundColor: item.is_selected
                                ? '#0b7e8b'
                                : item.is_available
                                ? '#10b3fe'
                                : '#00000055',
                              textAlign: 'center',
                            }}
                          >
                            {item.name}
                          </Avatar>
                          <br />
                          <br />
                        </Col>
                        <Col key={index} xs={2} lg={0}>
                          <Avatar
                            className="avatarHover"
                            size={25}
                            onClick={() => onSelectSeat(item)}
                            style={{
                              cursor: item.is_available
                                ? 'pointer'
                                : 'not-allowed',
                              backgroundColor: item.is_selected
                                ? '#0b7e8b'
                                : item.is_available
                                ? '#10b3fe'
                                : '#00000055',
                              verticalAlign: 'middle',
                            }}
                          >
                            {item.name}
                          </Avatar>
                          <br />
                          <br />
                        </Col>
                      </>
                    )
                  )}
                  <Col span={24}>
                    <Badge color="#10b3fe" count="Asiento disponible" />{' '}
                    <Badge color="#0b7e8b" count="Asiento seleccionado" />{' '}
                    <Badge color="#00000055" count="Asiento ocupado" />
                  </Col>
                </Row>
              </TransformComponent>
            </TransformWrapper>
          </Col>
          <Col xs={24} lg={8}>
            <br />
            <br />
            <Card
              className="cardEvent dark:cardEventDark dark:bg-gray-500  dark:text-white"
              bordered={false}
            >
              <Row justify={'end'}>
                <Col span={18} className="text-left text-xl">
                  <p>
                    <strong className="text-primary-6000">
                      Cantidad de asientos:{' '}
                    </strong>
                  </p>
                  <p>
                    <strong className="text-primary-6000">Subtotal: </strong>
                  </p>
                  <br />
                </Col>
                <Col span={6} className="text-right text-xl">
                  <p>{details?.quantity ? details.quantity : 0}</p>
                  <p>${details?.subtotal ? details.subtotal : 0}</p>
                  <br />
                </Col>
                <Col span={24}>
                  <Button
                    className="btnPrimary"
                    disabled={details ? details.quantity === 0 : true}
                    onClick={onNext}
                  >
                    Proceder al pago
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ) : (
        <Loader text="Cargando..." />
      )}
    </>
  )
}

export default BillboardSeatPicker
