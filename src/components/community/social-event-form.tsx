//@ts-nocheck
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { format } from 'date-fns'
import moment from 'moment'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {
  Upload,
  Button,
  message,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
} from 'antd'
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'

import Card from '../common/card'
import ButtonMy from '../ui/button'
import Description from '../ui/description'

import { useCreateEventMutation } from '@/data/events'
import { useUpdateEventMutation } from '@/data/events'
import { useCreateSpaceEventMutation } from '@/data/events'
import { validateSpaceEventMutation } from '@/data/events'

import { useSpacesQuery } from '@/data/space'
import { useGenresQuery } from '@/data/genre'
import { useCastsQuery } from '@/data/casts'
import Image from 'next/image'
import Uploader from '../common/uploaderAntd'

type FormValues = {
  title: string
  duration: number
  synopsis: string
  company: string
  dramaturgy: string
  director: string
  public?: boolean
  capacity: number
  gender?: []
  cast?: []
  schedule?: string[] | []
  space?: number
  video?: string | null | undefined
  thumbnailUrl?: string | null | undefined
  [key: string]: any
}
const { RangePicker } = DatePicker
const defaultValues: FormValues = {
  title: '',
  synopsis: '',
  company: '',
  dramaturgy: '',
  director: '',
  video: '',
  duration: 0,
  capacity: 0,
}
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD HH:mm'

const SocialEventForm = ({ eventos }: any) => {
  const router = useRouter()

  //agregar los id de eventos y elencos

  if (eventos !== undefined) {
    const { gender } = eventos
    const ids = gender.map((item: any) => item.id)
    eventos.genre = ids

    const { cast } = eventos
    const idsCast = cast.map((item: any) => item.id)
    eventos.castF = idsCast
  }

  const {
    mutate: createEvent,
    data,
    isLoading: loading,
  } = useCreateEventMutation()

  const { mutate: updateEvent, isLoading: loadingUpdate } =
    useUpdateEventMutation()

  const { mutate: createSpace, isLoading: loadingSpace } =
    useCreateSpaceEventMutation()

  const { mutate: validateSpaceDate } = validateSpaceEventMutation()

  const { spaces, loading: loadingSpaces } = useSpacesQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const [form] = Form.useForm()

  const { genres, loading: loadingGenres } = useGenresQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const { casts, loading: loadingCast } = useCastsQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  interface CastItem {
    id: number
    name: string
  }

  const [selectedSpaces, setSelectedSpaces] = useState([])
  const [selectedDates, setSelectedDates] = useState([])

  const [duration, selectDuration] = useState(0)
  const today = moment()

  const onFinish = (values: FormValues) => {
    if (eventos === undefined) {
      const lengthEvents = values.eventos.length

      for (let index = 0; index < lengthEvents; index++) {
        const input = {
          title: values?.title ?? '',
          synopsis: values?.synopsis ?? '',
          type: 'SOCIAL',
          company: values?.company ?? '',
          dramaturgy: values?.dramaturgy ?? '',
          director: values?.director ?? '',
          public: true,
          schedules: [],
          duration: values.duration,
          video: values?.video ?? null,
          gender: values.genre,
          thumbnailUrl: values.thumbnailUrl,
          cast: values.castF,
          price: values.price,
          capacity: values.capacity,
        }
        const lenghtDate = values.eventos[index].fechas.length

        for (let indexY = 0; indexY < lenghtDate; indexY++) {
          const fechaString = values.eventos[index].fechas[indexY].fecha
          const fechaFormateada = fechaString.format('YYYY-MM-DD HH:mm:00')

          const validateDate = {
            spaceId: values.eventos[index].spaceId,
            startDate: fechaFormateada,
            duration: values.duration,
          }
          validateSpaceDate(
            { ...validateDate },
            {
              onSuccess(data) {
                if (data.length === 0) {
                  createEvent(
                    {
                      ...input,
                    },
                    {
                      onSuccess(data: any) {
                        const lenghtDate = values.eventos[index].fechas.length
                        //el id de esta data es para obtener el id del evento, que se requiere en el otro servicio
                        console.log(data.id)
                        for (let indexY = 0; indexY < lenghtDate; indexY++) {
                          const fechaString =
                            values.eventos[index].fechas[indexY].fecha
                          const fechaFormateada = fechaString.format(
                            'YYYY-MM-DD HH:mm:00'
                          )
                          const horasDesabilitadas = {
                            eventId: data.id,
                            spaceId: values.eventos[index].spaceId,
                            startDate: fechaFormateada,
                            endDate: fechaFormateada,
                          }
                          createSpace({ ...horasDesabilitadas })
                        }
                      },
                    },
                    {
                      onError: (error: any) => {
                        if (error.response?.data?.errors) {
                          error.response.data.errors.forEach((error: any) => {
                            setError(error.field, {
                              type: 'manual',
                              message: error.message,
                            })
                          })
                        }
                      },
                    }
                  )
                }
              },
            }
          )
        }
      }
    } else {
      const eventUpdate = {
        title: values?.title ?? '',
        synopsis: values?.synopsis ?? '',
        company: values?.company ?? '',
        dramaturgy: values?.dramaturgy ?? '',
        director: values?.director ?? '',
        public: true,
        video: values?.video ?? null,
        gender: values.genre,
        thumbnailUrl: values.thumbnailUrl,
        cast: values.castF,
      }

      console.log(eventUpdate)
      updateEvent({
        id: eventos.id as string,
        input: eventUpdate,
      })
    }
  }

  const disabledDate = (current: any) => {
    return current && current < today
  }

  const [horasDesabilitadas, sethorasDesabilitadas] = useState({})

  const disableTime = (index: number, value: any) => {
    let flag = false
    if (index > 0) {
      const fecha = moment(value?.$d)
      const fechaFormateada = fecha.format('YYYY-MM-DD HH:mm')

      for (const fecha2 in horasDesabilitadas) {
        if (fecha2 === fechaFormateada.split(' ')[0]) {
          const horasUnidas = horasDesabilitadas[fecha2].reduce(
            (result, value) => {
              return [...result, ...value.horas]
            },
            []
          )
          let minutosUnidos = []

          for (const valor of horasDesabilitadas[fecha2]) {
            if (valor.horas.length === 0) {
              minutosUnidos = horasDesabilitadas[fecha2].reduce(
                (result, value) => {
                  return [...result, ...value.minutos]
                },
                []
              )
            } else {
              minutosUnidos = horasDesabilitadas[fecha2].reduce(
                (result, value) => {
                  return [...result, ...value.minutos]
                },
                []
              )
            }
          }

          return {
            disabledHours: () => horasUnidas,
            disabledMinutes: () => minutosUnidos,
          }
        }
      }
    }
  }

  const handleSpaceChange = (index: number, value: any) => {
    // Actualiza el estado con las opciones seleccionadas
    const updatedSelectedSpaces = [...selectedSpaces]
    updatedSelectedSpaces[index] = value
    setSelectedSpaces(updatedSelectedSpaces)
  }

  const handleDateChange = (index: number, value: any) => {
    let rangoMinuti = []
    const fechaFormateada = value.format('YYYY-MM-DD HH:mm')
    //Actualiza el estado con las opciones seleccionadas
    const updatedSelectedSpaces = [...selectedDates]
    updatedSelectedSpaces[index] = fechaFormateada
    setSelectedDates(updatedSelectedSpaces)

    const nuevaFecha = moment(fechaFormateada).add(duration, 'minutes')

    const fechaSTr = nuevaFecha.format('YYYY-MM-DD HH:mm')

    const minutoNuevapriema = fechaFormateada.split(' ')[1].split(':')[1]
    const horaNuevaprimera = fechaFormateada.split(' ')[1].split(':')[0]

    const minutoNueva = fechaSTr.split(' ')[1].split(':')[1]
    const horaNueva = fechaSTr.split(' ')[1].split(':')[0]

    //rango de una fecha por horas solo para horas
    const rango = []
    for (let index = parseInt(horaNuevaprimera); index < horaNueva; index++) {
      rango.push(index)
    }

    if (duration % 60 != 0) {
      for (
        let index = parseInt(minutoNuevapriema);
        index <= minutoNueva;
        index++
      ) {
        rangoMinuti.push(index)
      }
    } else {
      rangoMinuti = []
    }
    sethorasDesabilitadas((prevDatos) => ({
      ...prevDatos,
      [fechaFormateada.split(' ')[0]]: [
        ...(prevDatos[fechaFormateada.split(' ')[0]] || []), // Mantén los datos anteriores si existen
        {
          horas: rango,
          minutos: rangoMinuti,
        },
      ],
    }))
  }

  console.log(horasDesabilitadas)

  const handleRemoveDate = (index: any) => {
    // Elimina el campo y actualiza el estado de selectedSpaces
    const updatedSelectedSpaces = [...selectedDates]
    const fechamia = updatedSelectedSpaces.splice(index, 1)
    setSelectedDates(updatedSelectedSpaces)

    if (fechamia.length === 0) {
    } else {
      for (let i = 0; i < Object.keys(horasDesabilitadas).length; i++) {
        const fecha2 = Object.keys(horasDesabilitadas)[i]

        if (fecha2 === fechamia[0].split(' ')[0]) {
          for (let j = 0; j < horasDesabilitadas[fecha2].length; j++) {
            const valor = horasDesabilitadas[fecha2][j]

            for (let k = 0; k < valor.horas.length; k++) {
              const valorHoras = valor.horas[k]

              if (
                valorHoras === parseInt(fechamia[0].split(' ')[1].split(':')[0])
              ) {
                horasDesabilitadas[fecha2].splice(j, 1)
              }
            }
          }
        }
      }
    }
  }

  const handleRemove = (index: any) => {
    // Elimina el campo y actualiza el estado de selectedSpaces
    const updatedSelectedSpaces = [...selectedSpaces]
    updatedSelectedSpaces.splice(index, 1)
    setSelectedSpaces(updatedSelectedSpaces)
  }

  const handleDuration = (value: any) => {
    selectDuration(value)
  }

  const imageInformation = (
    <span>
      Carga la imagen desde aquí <br />
      La dimensión de la imagen se recomienda sea de&nbsp;
      <span className="font-bold">1024x1024 px</span>
    </span>
  )

  return (
    <Form
      onFinish={onFinish}
      form={form}
      initialValues={eventos}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className=" w-full sm:w-8/12 md:w-2/3">
          <Form.Item
            name="thumbnailUrl"
            label="Imagen del evento"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: 'Ingresa una imagen',
              },
            ]}
          >
            <Uploader
              form={form}
              field="thumbnailUrl"
              accept="image/jpeg, image/png"
            />
          </Form.Item>

          {eventos !== undefined ? (
            <Image
              src={eventos.thumbnailUrl}
              alt="thumbnail"
              width={40}
              height={40}
            />
          ) : null}
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Nuevo Evento"
          details="Este será un nuevo evento disponible en la cartelera."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Form.Item
            label="Título del evento"
            name="title"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el título del evento',
              },
            ]}
          >
            <Input.TextArea placeholder="Título" autoSize />
          </Form.Item>
          <Form.Item
            label="Sinopsis del evento"
            name="synopsis"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la sinopsis del evento',
              },
            ]}
          >
            <Input.TextArea placeholder="Sinopsis" />
          </Form.Item>
          <Form.Item
            label="Compañía del evento"
            name="company"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la compañía del evento',
              },
            ]}
          >
            <Input.TextArea placeholder="Compañía" autoSize />
          </Form.Item>
          <Form.Item
            label="Dramaturgia del evento"
            name="dramaturgy"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la dramaturgia del evento',
              },
            ]}
          >
            <Input.TextArea autoSize placeholder="Dramaturgia" />
          </Form.Item>
          <Form.Item
            label="Director del evento"
            name="director"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el director del evento',
              },
            ]}
          >
            <Input.TextArea autoSize placeholder="Director" />
          </Form.Item>
          <Form.Item
            label="URL Detrás de cámaras"
            name="video"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la URL del vídeo de YouTube',
              },
            ]}
          >
            <Input.TextArea autoSize placeholder="Vídeo de YouTube" />
          </Form.Item>

          <Form.Item
            label="Genero del evento"
            name="genre"
            rules={[
              {
                required: true,
                message: 'Por favor, selecciona al menos una opción',
              },
            ]}
          >
            <Select mode="multiple" placeholder="Selecciona opciones">
              {genres?.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {eventos === undefined ? (
            <>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="Duración en minutos"
                name="duration"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese la duración',
                  },
                ]}
              >
                <InputNumber
                  onChange={handleDuration}
                  min={1}
                  className="w-full"
                  placeholder="Duración del evento"
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="Capacidad de asientos"
                name="capacity"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese la capacidad',
                  },
                ]}
              >
                <InputNumber
                  onChange={handleDuration}
                  min={1}
                  className="w-full"
                  placeholder="Capacidad del evento"
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="Precio del evento"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese el precio',
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  className="w-full"
                  placeholder="Precio del evento"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </>
          ) : null}

          <Form.Item
            label="Elenco del evento"
            name="castF"
            rules={[
              {
                required: true,
                message: 'Por favor, selecciona al menos una opción',
              },
            ]}
          >
            <Select mode="multiple" placeholder="Selecciona opciones">
              {casts?.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {eventos === undefined ? (
            <Form.List name="eventos" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <div className="">
                  {fields.map(
                    ({ key, name, fieldKey, ...restField }, index) => (
                      <div className="w-full">
                        <div
                          key={key}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '8px',
                          }}
                        >
                          <Form.Item
                            label="Lugar del evento y horario"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name={[name, 'spaceId']}
                            fieldKey={[fieldKey, 'spaceId']}
                            rules={[
                              {
                                required: true,
                                message: 'Seleccione un espacio',
                              },
                            ]}
                            style={{ marginRight: '8px', flex: 1 }}
                          >
                            <Select
                              placeholder="Selecciona un espacio"
                              style={{ width: '100%' }}
                              onChange={(value) =>
                                handleSpaceChange(index, value)
                              }
                              disabled={
                                duration === 0 || (duration === null && true)
                              }
                            >
                              {spaces?.map((option) => (
                                <Select.Option
                                  key={option.id}
                                  value={option.id}
                                  disabled={selectedSpaces.includes(option.id)}
                                >
                                  {option.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>

                          {index >= 1 && (
                            <MinusCircleOutlined
                              // onClick={() => remove(name)}
                              onClick={() => {
                                handleRemove(index)
                                remove(name)
                              }}
                              style={{ marginLeft: '8px' }}
                            />
                          )}
                        </div>
                        {/* Agregar otro Form.List para manejar fechas */}
                        <Form.List name={[name, 'fechas']} initialValue={[{}]}>
                          {(
                            dateFields,
                            { add: addDate, remove: removeDate }
                          ) => (
                            <>
                              {dateFields.map(
                                (
                                  {
                                    key: dateKey,
                                    name: dateName,
                                    fieldKey: dateFieldKey,
                                  },
                                  indexDate
                                ) => (
                                  <div className="w-full">
                                    <div
                                      key={dateKey}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                    >
                                      <Form.Item
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        name={[dateName, 'fecha']}
                                        fieldKey={[dateFieldKey, 'fecha']}
                                        style={{ marginRight: '8px', flex: 1 }}
                                        rules={[
                                          {
                                            required: true,
                                            message: 'Seleccione una fecha',
                                          },
                                        ]}
                                      >
                                        <DatePicker
                                          placeholder="Selecciona una fecha"
                                          allowClear={false}
                                          showTime
                                          disabledDate={disabledDate}
                                          // disabledTime={(value) =>
                                          //   disableTime(indexDate, value)
                                          // }
                                          format="YYYY-MM-DD HH:mm"
                                          style={{ width: '100%' }}
                                          onChange={(value) =>
                                            handleDateChange(indexDate, value)
                                          }
                                          disabled={
                                            duration === 0 ||
                                            (duration === null && true)
                                          }
                                        />
                                      </Form.Item>

                                      {/* <MinusCircleOutlined
                                        onClick={() => removeDate(dateName)}
                                        style={{ marginLeft: '8px' }}
                                      /> */}
                                      {indexDate >= 1 && (
                                        <MinusCircleOutlined
                                          // onClick={() => remove(name)}
                                          onClick={() => {
                                            removeDate(dateName)
                                            handleRemoveDate(indexDate)
                                          }}
                                          style={{ marginLeft: '8px' }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                              <Button
                                className="mb-3"
                                type="dashed"
                                onClick={() => addDate()}
                                icon={<PlusOutlined />}
                                disabled={
                                  duration === 0 || (duration === null && true)
                                }
                              >
                                Agregar Dia
                              </Button>
                            </>
                          )}
                        </Form.List>
                      </div>
                    )
                  )}

                  <Form.Item>
                    <Button
                      className="mt-8 w-full"
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      disabled={
                        fields.length >= spaces?.length ||
                        duration === 0 ||
                        (duration === null && true)
                      }
                    >
                      Agregar Salon
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          ) : null}

          {/* </Form.Item> */}
        </Card>
      </div>
      <div className="mb-4 text-end">
        <Form.Item>
          <ButtonMy
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            Atrás
          </ButtonMy>

          <button
            className=" h-12 rounded-md border border-transparent bg-accent px-5 py-0 font-semibold text-light transition duration-300 ease-in-out hover:bg-accent-hover"
            htmlType="submit"
          >
            {eventos === undefined ? 'Crear' : 'Editar'}
          </button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default SocialEventForm
