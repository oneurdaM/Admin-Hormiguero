'use client'
import React, { useState } from 'react'
import {
  Row,
  Col,
  notification,
  Card,
  Select,
  Descriptions,
  Form,
  Button,
} from 'antd'
import Loader from '../ui/loader/loader'
import { SeatResponse } from '@/types/billboard'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { buySeat } from '@/data/client/billboard'
import { useMeQuery } from '@/data/users'
const { Option } = Select
const BillboardPayment = (props: any) => {
  const [fetchingPayment, setFetchingPayment] = useState(false)
  const [paymentResponse, setPaymentResponse] = useState<SeatResponse>({
    seatsResponse: [],
    error: '',
  })
  console.log('props :>> ', props)

  const { data } = useMeQuery()

  const [api, contextHolder] = notification.useNotification()
  const fetchData = async (seatsSelected: any, methodPay: any, userId: any) => {
    try {
      setFetchingPayment(true)
      let response: any = {}
      response = await buySeat(seatsSelected, props.details, methodPay, userId)
      console.log('response', response)
      setPaymentResponse(response)
      setFetchingPayment(false)
      if (response.error) {
        api.error({
          message: response.error,
        })
      } else {
        props.onChildrenDrawerClose(true)
      }
    } catch (error: any) {
      api.error({
        message: 'Error',
        description: error,
      })
      setPaymentResponse({ seatsResponse: [], error: '' })
    }
  }

  const paymentCanceled = () => {
    api.warning({
      message: 'Pago cancelado',
      description: 'El pago no se pudo efectuar, favor de reintentar',
    })
  }
  const paymentApproved = () => {
    console.log('paypal  success', props.seatsSelected)
    // fetchData(props.seatsSelected)
  }

  const onFinish = (values: any) => {
    const userId = data.id
    fetchData(props.seatsSelected, values.methodPay, userId)
  }

  return (
    <>
      {contextHolder}
      {!fetchingPayment ? (
        <Row className="flex items-center justify-around">
          <Col xs={24} lg={16}>
            <Row justify="space-around">
              <Col span={24} className="text-xl">
                <p>
                  <strong className="text-primary-6000 ">
                    Elige tu método de pago
                  </strong>
                  <br />
                  <br />
                </p>
              </Col>
              <Col xs={24} lg={22}>
                <Card className="w-full">
                  <Form name="form" labelCol={{ span: 24 }} onFinish={onFinish}>
                    <Form.Item
                      label={<span className="text-lg">Método de pago</span>}
                      name="methodPay"
                      rules={[
                        {
                          required: true,
                          message: 'Por favor selecciona un método',
                        },
                      ]}
                    >
                      <Select
                        className="w-full"
                        placeholder="Selecciona una opción"
                      >
                        <Option value="cash">Efectivo</Option>
                        <Option value="transfer">Transferencía</Option>
                      </Select>
                    </Form.Item>

                    <div className="flex justify-end">
                      <Button type="primary" htmlType="submit">
                        Guardar
                      </Button>
                    </div>
                  </Form>
                </Card>

                {/* <PayPalScriptProvider
                  options={{
                    clientId:
                      'AfPMP9UGMMHatFve1JsJ2VWoSK13mDnXa8EFrPOlFGLSANnFYfJ8u2mWZ5KRHVF-SgF29HgR68IZ-BGS',
                    currency: 'MXN',
                  }}
                >
                  <PayPalButtons
                    style={{
                      color: 'blue',
                      layout: 'vertical',
                      shape: 'pill',
                      tagline: false,
                    }}
                    createOrder={async () => {
                      const res = await fetch('/api/paypal', {
                        method: 'POST',
                        body: JSON.stringify({
                          details: props.details,
                          seatsSelected: props.seatsSelected,
                        }),
                      })
                      const order = await res.json()
                      return order.id
                    }}
                    onApprove={async (data, actions) => {
                      console.log(data)
                      await actions.order?.capture()
                      paymentApproved()
                    }}
                    onCancel={() => {
                      paymentCanceled()
                    }}
                  />
                </PayPalScriptProvider> */}
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={8}>
            <br />
            <br />
            <Card
              className="cardEvent dark:cardEventDark dark:bg-gray-500 dark:text-white"
              bordered={false}
            >
              <Row justify={'end'}>
                <Col span={16} className="text-left text-xl">
                  <p>
                    <strong className="text-primary-6000 text-lg">
                      Cantidad de asientos:{' '}
                    </strong>
                  </p>
                  <p>
                    <strong className="text-primary-6000">Subtotal: </strong>
                  </p>
                  <br />
                </Col>
                <Col span={8} className="text-right text-lg">
                  <p>{props.details?.quantity ? props.details.quantity : 0}</p>
                  <p>${props.details?.subtotal ? props.details.subtotal : 0}</p>
                  <br />
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

export default BillboardPayment
