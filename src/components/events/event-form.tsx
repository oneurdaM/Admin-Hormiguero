import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import React, { useState, ChangeEvent } from 'react'
import Uploader from '../common/uploaderAntd'
import { format } from 'date-fns'
import moment from 'moment'

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

import FileInput from '../ui/file-input'
import Card from '../common/card'
import ButtonMy from '../ui/button'
import Description from '../ui/description'
// import Input from '../ui/input'
// import Select from '../select/select'
// import Label from '../ui/label'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { eventValidationSchema } from './event-validation-schema'

import { useCreateEventMutation } from '@/data/events'
import { useUpdateEventMutation } from '@/data/events'
import { useCreateSpaceEventMutation } from '@/data/events'
import { validateSpaceEventMutation } from '@/data/events'

import { useSpacesQuery } from '@/data/space'
import { useGenresQuery } from '@/data/genre'
import { useCastsQuery } from '@/data/casts'

type FormValues = {
  title: string
  duration: number
  synopsis: string
  company: string
  dramaturgy: string
  director: string
  public?: boolean
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
}

const EventForm = ({ eventos }) => {
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
    type: 'Production',
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
  const [duration, selectDuration] = useState(0)
  const today = moment()

  // const onFinish = (values: FormValues) => {
  //   if (eventos === undefined) {
  //     const lengthEvents = values.eventos.length

  //     for (let index = 0; index < lengthEvents; index++) {
  //       const input = {
  //         title: values?.title ?? '',
  //         synopsis: values?.synopsis ?? '',
  //         type: 'Production',
  //         company: values?.company ?? '',
  //         dramaturgy: values?.dramaturgy ?? '',
  //         director: values?.director ?? '',
  //         public: true,
  //         schedules: [],
  //         duration: values.duration,
  //         video: values?.video ?? null,
  //         gender: values.genre,
  //         thumbnailUrl: values.thumbnailUrl,
  //         cast: values.castF,
  //         price: values.price,
  //       }

  //       createEvent(
  //         {
  //           ...input,
  //         },
  //         {
  //           onSuccess(data) {
  //             const lenghtDate = values.eventos[index].fechas.length

  //             //el id de esta data es para obtener el id del evento, que se requiere en el otro servicio
  //             console.log(data.id)
  //             for (let indexY = 0; indexY < lenghtDate; indexY++) {
  //               const fechaString = values.eventos[index].fechas[indexY].fecha
  //               const fechaFormateada = fechaString.format(
  //                 'YYYY-MM-DD HH:mm:00'
  //               )

  //               const prueba = {
  //                 eventId: data.id,
  //                 spaceId: values.eventos[index].spaceId,
  //                 startDate: fechaFormateada,
  //                 // endDate: fechaFormateada,
  //               }
  //               createSpace({ ...prueba })
  //               //Aqui comsume el servicio de davo
  //             }
  //           },
  //         },
  //         {
  //           onError: (error: any) => {
  //             if (error.response?.data?.errors) {
  //               error.response.data.errors.forEach((error: any) => {
  //                 setError(error.field, {
  //                   type: 'manual',
  //                   message: error.message,
  //                 })
  //               })
  //             }
  //           },
  //         }
  //       )
  //     }
  //   } else {
  //     const input = {
  //       title: values?.title ?? '',
  //       synopsis: values?.synopsis ?? '',
  //       company: values?.company ?? '',
  //       dramaturgy: values?.dramaturgy ?? '',
  //       director: values?.director ?? '',
  //       public: true,
  //       schedules: [],
  //       video: values?.video ?? null,
  //       gender: values.genre,
  //       thumbnailUrl: values.thumbnailUrl,
  //       cast: values.castF,
  //       price: values.price,
  //     }

  //     console.log(input)
  //   }
  // }

  const onFinish = async (values: FormValues) => {
    const lengthEvents = values.eventos.length

    for (let index = 0; index < lengthEvents; index++) {
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
              console.log(data)

              //aqui mando a llamar todo el pedo de insertar evento
            },
          }
        )
        //Aqui consume la validacion de davo
      }
    }

    // try {
    //   if (eventos === undefined) {
    //     await handleMultipleEvents(values)
    //   } else {
    //     const input = {
    //       title: values?.title ?? '',
    //       synopsis: values?.synopsis ?? '',
    //       company: values?.company ?? '',
    //       dramaturgy: values?.dramaturgy ?? '',
    //       director: values?.director ?? '',
    //       public: true,
    //       schedules: [],
    //       video: values?.video ?? null,
    //       gender: values.genre,
    //       thumbnailUrl: values.thumbnailUrl,
    //       cast: values.castF,
    //       price: values.price,
    //     }

    //     console.log(input)
    //   }
    // } catch (error) {
    //   // handleErrors(error)
    // }
  }

  const handleMultipleEvents = async (values: FormValues) => {
    const lengthEvents = values.eventos.length

    for (let index = 0; index < lengthEvents; index++) {
      const input = {
        title: values?.title ?? '',
        synopsis: values?.synopsis ?? '',
        type: 'Production',
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
      }

      const data = await createEventAsync(input)
      console.log(data.id)

      await handleEventDates(data.id, values.eventos[index].fechas)
    }
  }

  const handleEventDates = async (eventId: any, dates: any) => {
    for (let indexY = 0; indexY < dates.length; indexY++) {
      const fechaString = dates[indexY].fecha
      const fechaFormateada = fechaString.format('YYYY-MM-DD HH:mm:00')

      const prueba = {
        eventId: eventId,
        spaceId: values.eventos[index].spaceId,
        startDate: fechaFormateada,
        // endDate: fechaFormateada,
      }

      await createSpaceAsync(prueba)
      // Aquí consume el servicio de davo
    }
  }

  // Funciones para llamadas asíncronas a los servicios
  const createEventAsync = async (input: any) => {
    const { data } = await createEvent(input)
    return data
  }

  const createSpaceAsync = async (input) => {
    const { data } = await createSpace(input)
    return data
  }

  const disabledDate = (current: any) => {
    return current && current < today.startOf('day')
  }

  const handleSpaceChange = (index: number, value: any) => {
    // Actualiza el estado con las opciones seleccionadas
    const updatedSelectedSpaces = [...selectedSpaces]
    updatedSelectedSpaces[index] = value
    setSelectedSpaces(updatedSelectedSpaces)
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
    <Form onFinish={onFinish} form={form} initialValues={eventos}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className=" w-full sm:w-8/12 md:w-2/3">
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
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
            <Uploader form={form} />
          </Form.Item>{' '}
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
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Título del evento"
            name="title"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el título del evento',
              },
            ]}
          >
            <Input placeholder="Título" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
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
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Compañía del evento"
            name="company"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la compañía del evento',
              },
            ]}
          >
            <Input placeholder="Compañía" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Dramaturgia del evento"
            name="dramaturgy"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la dramaturgia del evento',
              },
            ]}
          >
            <Input placeholder="Dramaturgia" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Director del evento"
            name="director"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el director del evento',
              },
            ]}
          >
            <Input placeholder="Director" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="URL Detrás de cámaras"
            name="video"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la URL del vídeo de YouTube',
              },
            ]}
          >
            <Input placeholder="Vídeo de YouTube" />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
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
          ) : null}

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

          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
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
                                ({
                                  key: dateKey,
                                  name: dateName,
                                  fieldKey: dateFieldKey,
                                }) => (
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
                                          showTime
                                          format="YYYY-MM-DD HH:mm"
                                          disabledDate={disabledDate}
                                          style={{ width: '100%' }}
                                          disabled={
                                            duration === 0 ||
                                            (duration === null && true)
                                          }
                                        />
                                      </Form.Item>

                                      <MinusCircleOutlined
                                        onClick={() => removeDate(dateName)}
                                        style={{ marginLeft: '8px' }}
                                      />
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

export default EventForm
