import React, { FC, useState, useEffect } from 'react'
import HIW1img from '@/images/HIW2-3.png'
import HIW2img from '@/images/HIW2-2.png'
import HIW3img from '@/images/HIW2-1.png'
import VectorImg from '@/images/VectorHIW.svg'
import Image, { StaticImageData } from 'next/image'
import locale from 'antd/es/date-picker/locale/es_ES' // Importa el paquete de idioma español

import ButtonPrimary from '@/components/ui/primary-button'
import {
  Calendar,
  Divider,
  Select,
  Row,
  Col,
  Button,
  Tooltip,
  notification,
  Tag,
  Spin,
} from 'antd'
import type { BadgeProps, CalendarProps } from 'antd'

import { getAuthCredentials } from '@/utils/auth-utils'
import { SpacesResponse, Rent } from '@/types/spaces'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Loader from '@/components/ui/loader/loader'
import moment from 'moment'
import type { Dayjs } from 'dayjs'
import {
  getRents,
  useSpaceQuery,
  useSpacesQuery,
  getAvailabilitySpaces,
} from '@/data/space'
import ModalRentSpaces from './ModalRentSpace'

type Props = {}

const Schedule = (props: Props) => {
  const { spaces, loading: loadingSpaces } = useSpacesQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const { token } = getAuthCredentials()

  const [showModalRentSpace, setShowModalRentSpace] = useState(false)
  const [showModalMobile, setShowModalMobile] = useState(false)
  const [boolButton, setBoolButton] = useState(true)
  const [spaceSelected, setSpaceSelected] = useState<SpacesResponse>()
  const [api, contextHolder] = notification.useNotification()

  const [fetchingRents, setFetchingRents] = useState(false)
  const [rentsResponse, setRentsResponse] = useState<Array<Rent>>([])

  const fetchData = async (month: any) => {
    try {
      setFetchingRents(true)
      let response: any = {}
      response = await getRents(month)
      console.log('response', response)
      setFetchingRents(false)
      if (response.error) {
        api.error({
          message: response.error,
        })
      } else {
        setRentsResponse(response.rents)
      }
    } catch (error: any) {
      api.error({
        message: 'Error',
        description: error,
      })
    }
  }

  useEffect(() => {
    fetchData(moment())
  }, [])

  console.log('WWEW', rentsResponse)

  const onShowRent = (mobile: boolean) => {
    setShowModalMobile(mobile)
    if (token) {
      setShowModalRentSpace(!showModalRentSpace)
    } else {
      api.warning({
        message: 'Es necesario iniciar sesión',
        description: (
          <Row justify="center">
            <Col span={24}>
              <p>
                Para continuar con la reserva de espacios es necesario iniciar
                sesión
              </p>
            </Col>
            <Col span={20}>
              <br />
              <ButtonPrimary className="width100 mr-4" href="/login">
                Iniciar sesión
              </ButtonPrimary>
            </Col>
          </Row>
        ),
      })
    }
  }

  console.log('Este es el arreglo', rentsResponse)

  const viewAvailable = (value: any, record: any) => {
    console.log(value, record)
    const space = spaces.find((space) => space.id === value)
    console.log('space', space)
    if (value) {
      setBoolButton(false)
      setSpaceSelected(space)
    } else setBoolButton(true)
  }
  const getListData = (value: Dayjs) => {
    let listData = []

    let i: any = 0
    for (i in rentsResponse) {
      if (rentsResponse[i].startDate === value.format('YYYY-MM-DD')) {
        const rent = { type: 'warning', content: rentsResponse[i].name }
        listData.push(rent)
      }
    }

    return listData || []
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Tag color="#0b7e8b" style={{ width: '95%' }}>
              {item.content}
            </Tag>
          </li>
        ))}
      </ul>
    )
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    return info.originNode
  }
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    fetchData(value.format('YYYY-MM-DD'))
    console.log(value.format('YYYY-MM-DD'), mode)
  }
  return (
    <div className="bg-[#f4eadb] pb-10">
      <div
        className="mx-10 flex flex-col pt-10"
        style={{ paddingBottom: '1em' }}
      >
        <span
          style={{ textAlign: 'center', fontWeight: 'bold' }}
          className="my-4 text-2xl text-[#04242b] lg:text-3xl"
        >
          Disponibilidad de Salones
        </span>
        <Divider />

        <Row justify="space-between" gutter={[8, 8]}>
          <Col xs={12}>
            <Select
              placeholder="Selecciona un espacio"
              style={{ width: '100%' }}
              className="w-full md:w-32 lg:w-40 xl:w-1/2"
              onChange={viewAvailable}
            >
              {spaces?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} lg={0}>
            <Tooltip
              color="#56aec4"
              placement="left"
              title={!boolButton ? '' : 'Por favor selecciona un espacio'}
            >
              <Button
                disabled={boolButton}
                style={{ width: '100%', borderRadius: '1.5em' }}
                className="btnPrimaryLeft"
                onClick={() => onShowRent(true)}
              >
                {' '}
                Reservar espacio{' '}
              </Button>
            </Tooltip>
          </Col>
          <Col xs={0} lg={6}>
            <Tooltip
              color="#56aec4"
              placement="left"
              title={!boolButton ? '' : 'Por favor selecciona un espacio'}
            >
              <Button
                disabled={boolButton}
                style={{ width: '100%', borderRadius: '1.5em' }}
                className="btnPrimaryLeft"
                onClick={() => onShowRent(false)}
              >
                {' '}
                Reservar espacio{' '}
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
      {contextHolder}
      <Spin spinning={fetchingRents}>
        <div className="mx-10">
          <Calendar
            style={{ borderRadius: '.5em', color: 'black' }}
            className="border-1 border"
            onPanelChange={onPanelChange}
            cellRender={cellRender}
          ></Calendar>
        </div>
      </Spin>
      <PayPalScriptProvider
        options={{
          components: 'buttons',
          clientId:
            'AfPMP9UGMMHatFve1JsJ2VWoSK13mDnXa8EFrPOlFGLSANnFYfJ8u2mWZ5KRHVF-SgF29HgR68IZ-BGS',
          currency: 'MXN',
        }}
      >
        <ModalRentSpaces
          fetchDataCalendar={fetchData}
          showRent={onShowRent}
          showModalRentSpace={showModalRentSpace}
          spaceSelected={spaceSelected}
          showModalMobile={showModalMobile}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default Schedule
