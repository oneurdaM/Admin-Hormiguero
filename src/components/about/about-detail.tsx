import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Uploader from '../common/uploaderAntd'
import { useRouter } from 'next/router'

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
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import Card from '../common/card'
import ButtonMy from '../ui/button'
import Description from '../ui/description'
// import Input from '../ui/input'
import pick from 'lodash/pick'
import { yupResolver } from '@hookform/resolvers/yup'
import { aboutValidationSchema } from './about-validation-schema'
import {
  useUpdateSettingsMutation,
  usePostSettingsMutation,
} from '@/data/settings'
import { Settings } from '@/types/settings'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import moment from 'moment'

const AboutDetailForm = ({ settings, error, loading }: Settings | any) => {
  const [autocomplete, setAutocomplete] = useState<any>()
  const [inputValue, setInputValue] = useState()

  const { mutate: updateSettings, isLoading } = useUpdateSettingsMutation()
  const { mutate: postSettings, isLoading: loadingPost } =
    usePostSettingsMutation()
  const router = useRouter()

  let settingsFormat = {}
  if (settings) {
    settingsFormat = {
      artists: parseInt(settings.artists),
      communities: parseInt(settings.communities),
      createdAt: moment(settings.createdAt).format('YYYY-MM-DD'),
      facebookUrl: settings.facebookUrl,
      instagramUrl: settings.instagramUrl,
      location: settings.location,
      mision: settings.mision,
      people: settings.people,
      thumbnailUrl: settings.logo,
      title: settings.siteName,
      twitterUrl: settings.twitterUrl,
      vision: settings.vision,
      whatWeAre: settings.whatWeAre,
      whoWeAre: settings.whoWeAre,
      whyCommunity: settings.whyCommunity,
      youtubeUrl: settings.youtubeUrl,
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Settings>({
    defaultValues: {
      ...(settings &&
        pick(settings, [
          'logo',
          'siteName',
          'whatWeAre',
          'whoWeAre',
          'whyCommunity',
          'createdAt',
          'artists',
          'communities',
          'people',
          'facebookUrl',
          'twitterUrl',
          'instagramUrl',
          'youtubeUrl',
          'location',
          'contactNumber',
          'website',
          'mision',
          'vision',
        ])),
    },
    resolver: yupResolver(aboutValidationSchema),
  })

  async function onSubmit(values: Settings) {
    const input = {
      logo: values.logo,
      siteName: values.siteName,
      artists: values?.artists?.toString(),
      communities: values?.communities?.toString(),
      people: values?.people?.toString(),
      whatWeAre: values.whatWeAre,
      whoWeAre: values.whoWeAre,
      whyCommunity: values.whyCommunity,
      createdAt: values.createdAt,
      facebookUrl: values.facebookUrl,
      twitterUrl: values.twitterUrl,
      instagramUrl: values.instagramUrl,
      youtubeUrl: values.youtubeUrl,
      location: values.location,
      contactNumber: values.contactNumber,
      website: values.website,
      mision: values.mision,
      vision: values.vision,

      siteSubtitle: '',
      metaTitle: '',
      metaDescription: '',
      metaTags: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterHandle: '',
      twitterCardType: '',
      linkedinUrl: '',
      tiktokUrl: '',
    }
    if (Object.keys(settings).length !== 0) {
      updateSettings({
        id: 1,
        ...input,
      })
    } else {
      console.log(values)
      // postSettings(input)
    }
  }

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const input = {
      logo: values.thumbnailUrl,
      siteName: values.title,
      artists: values?.artists?.toString(),
      communities: values?.communities?.toString(),
      people: values?.people?.toString(),
      whatWeAre: values.whatWeAre,
      whoWeAre: values.whoWeAre,
      whyCommunity: values.whyCommunity,
      createdAt: selectedDate
        ? selectedDate.format('YYYY-MM-DD')
        : values.createdAt.format('YYYY-MM-DD'),
      facebookUrl: values.facebookUrl,
      twitterUrl: values.twitterUrl,
      instagramUrl: values.instagramUrl,
      youtubeUrl: values.youtubeUrl,
      location: values.location,
      contactNumber: '',
      website: '',
      mision: values.mision,
      vision: values.vision,
      siteSubtitle: '',
      metaTitle: '',
      metaDescription: '',
      metaTags: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterHandle: '',
      twitterCardType: '',
      linkedinUrl: '',
      tiktokUrl: '',
    }
    if (Object.keys(settings).length !== 0) {
      updateSettings({
        id: 1,
        ...input,
      })
    } else {
      // postSettings(input)
    }
  }

  if (loading) return <Loader text="Cargando usuarios..." />

  if (error) return <ErrorMessage message={error.message} />

  const imageInformation = (
    <span>
      Carga el logo del sitio desde aquí <br />
      La dimensión de la imagen se recomienda sea de&nbsp;
      <span className="font-bold">1024x1024 px</span>
    </span>
  )

  const onLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      setInputValue(autocomplete.getPlace().formatted_address)
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
    libraries: ['places'],
  })

  const initialSelectedDate = moment('2020-10-02', 'YYYY-MM-DD')

  const [selectedDate, setSelectedDate] = useState(initialSelectedDate)

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date)
  }

  return (
    // <form noValidate onSubmit={handleSubmit(onSubmit)}>
    //   <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
    //     <Description
    //       title="Logo"
    //       details={imageInformation}
    //       className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
    //     />
    //     <Card className="w-full sm:w-8/12 md:w-2/3">
    //       <div className="container mx-auto p-4">
    //         <div className="lg:flex">
    //           {settings?.logo && (
    //             <div className="mb-4 p-6 text-center lg:mb-0 lg:w-1/4">
    //               <Label>Logo actual</Label>
    //               {/* <Image
    //                 src={settings.logo}
    //                 alt="Avatar"
    //                 width={40}
    //                 height={40}
    //                 className="h-auto w-full"
    //               /> */}
    //             </div>
    //           )}

    //           <div className={settings?.logo ? 'lg:w-3/4' : 'lg:w-full'}>
    //             <div className="bg-gray-200 p-4">
    //               <div className="w-full p-2">
    //                 <FileInput name="logo" control={control} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Card>
    //   </div>
    //   <div className="my-5 flex flex-wrap sm:my-8">
    //     <Description
    //       title="Ver y editar detalles del sitio"
    //       details="Aquí puedes ver y editar la información general y el impacto social de Centro Cultural El Hormiguero"
    //       className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
    //     />

    //     <Card className="w-full sm:w-8/12 md:w-2/3">
    //       <Input
    //         disabled={settings?.siteName}
    //         label="Nombre del sitio"
    //         placeholder="Nombre del sitio"
    //         {...register('siteName')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.siteName?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="¿Quiénes somos?"
    //         placeholder="Texto"
    //         {...register('whoWeAre')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.whoWeAre?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="¿Qué es el hormiguero?"
    //         placeholder="Texto"
    //         {...register('whatWeAre')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.whatWeAre?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="¿Por qué la comunidad?"
    //         placeholder="Texto"
    //         {...register('whyCommunity')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.whyCommunity?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Aniversario"
    //         placeholder="Fecha/año de creación"
    //         {...register('createdAt')}
    //         type="date"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.createdAt?.message && 'Campo obligatorio'}
    //       />
    //       {isLoaded && (
    //         <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
    //           <Input
    //             label="Dirección"
    //             placeholder="Dirección"
    //             {...register('location')}
    //             type="text"
    //             variant="outline"
    //             className="mb-4"
    //             value={inputValue}
    //             onChange={(e: any) => setInputValue(e.target.value)}
    //             error={errors.location?.message && 'Campo obligatorio'}
    //           />
    //         </Autocomplete>
    //       )}
    //       <Input
    //         label="Cantidad de artistas que se han presentado"
    //         placeholder="Número"
    //         {...register('artists')}
    //         type="number"
    //         min={1}
    //         variant="outline"
    //         className="my-4"
    //         error={errors.artists?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Cantidad de personas que han tenido alguna experiencia con la organización"
    //         placeholder="Número"
    //         {...register('people')}
    //         type="number"
    //         min={1}
    //         variant="outline"
    //         className="my-4"
    //         error={errors.people?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Comunidades vulnerables atendidas"
    //         placeholder="Número"
    //         {...register('communities')}
    //         type="number"
    //         min={1}
    //         variant="outline"
    //         className="my-4"
    //         error={errors.communities?.message && 'Campo obligatorio'}
    //       />
    //       <hr />
    //       <Input
    //         label="Enlace a Facebook"
    //         placeholder="Texto o enlace url"
    //         {...register('facebookUrl')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.facebookUrl?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Enlace a Twitter"
    //         placeholder="Texto o enlace url"
    //         {...register('twitterUrl')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.twitterUrl?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Enlace a Instagram"
    //         placeholder="Texto o enlace url"
    //         {...register('instagramUrl')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.instagramUrl?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Enlace a YouTube"
    //         placeholder="Texto o enlace url"
    //         {...register('youtubeUrl')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.youtubeUrl?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Misión"
    //         placeholder="Misión"
    //         {...register('mision')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.mision?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Visión"
    //         placeholder="Visión"
    //         {...register('vision')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.vision?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Correo electrónico de contacto"
    //         placeholder="E-mail"
    //         {...register('website')}
    //         type="email"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.website?.message && 'Campo obligatorio'}
    //       />
    //       <Input
    //         label="Teléfono de contacto"
    //         placeholder="Número de contacto"
    //         {...register('contactNumber')}
    //         type="text"
    //         variant="outline"
    //         className="my-4"
    //         error={errors.contactNumber?.message && 'Campo obligatorio'}
    //       />
    //     </Card>
    //   </div>
    //   <div className="mb-4 text-end">
    //     <Button disabled={isLoading} loading={isLoading}>
    //       Actualizar
    //     </Button>
    //   </div>
    // </form>

    <Form
      onFinish={onFinish}
      form={form}
      initialValues={settingsFormat}
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

          {settingsFormat ? (
            <Image
              src={settingsFormat.thumbnailUrl}
              alt={'imagen'}
              width={100}
              height={100}
            />
          ) : null}
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Ver y editar detalles del sitio"
          details="Aquí puedes ver y editar la información general y el impacto social de Centro Cultural El Hormiguero"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Form.Item
            label="Nombre del sitio"
            name="title"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el nombre',
              },
            ]}
          >
            <Input.TextArea placeholder="Nombre" autoSize />
          </Form.Item>
          <Form.Item
            label="¿Quiénes somos?"
            name="whoWeAre"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Sinopsis" />
          </Form.Item>
          <Form.Item
            label="¿Qué es el hormiguero?"
            name="whatWeAre"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Sinopsis" />
          </Form.Item>
          <Form.Item
            label="¿Por qué la comunidad?"
            name="whyCommunity"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Sinopsis" />
          </Form.Item>

          <div className="flex">
            <div className="w-1/2">
              <Form.Item
                label="Aniversario"
                name="aniversario"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese la fecha',
                  },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={handleDateChange}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
            <div className="ml-3 w-1/2">
              <Form.Item
                label="Fecha seleccionada anterior"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese la fecha',
                  },
                ]}
              >
                <Input.TextArea
                  value={settingsFormat.createdAt}
                  autoSize
                  disabled={true}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Dirección"
            name="location"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la direccion',
              },
            ]}
          >
            <Input.TextArea placeholder="Dirección " autoSize />
          </Form.Item>
          <div className="flex">
            <div className="mx-1 w-1/2">
              <Form.Item
                label="Cantidad de artistas que se han presentado"
                name="artists"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese la cantidad',
                  },
                ]}
              >
                <InputNumber placeholder="Cantidad " className="w-full" />
              </Form.Item>
            </div>
            <div className="mx-1 w-1/2">
              <Form.Item
                label="Comunidades vulnerables atendidas"
                name="communities"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingrese la cantidad',
                  },
                ]}
              >
                <InputNumber placeholder="Cantidad " className="w-full" />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Cantidad de personas que han tenido alguna experiencia con la organización"
            name="people"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la cantidad',
              },
            ]}
          >
            <InputNumber placeholder="Cantidad " className="w-full" />
          </Form.Item>

          <Form.Item
            label="Misión"
            name="mision"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Sinopsis" />
          </Form.Item>

          <Form.Item
            label="Visión"
            name="vision"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Sinopsis" />
          </Form.Item>

          <Form.Item
            label="Enlace a Facebook"
            name="facebookUrl"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Facebook" autoSize />
          </Form.Item>

          <Form.Item
            label="Enlace a Twitter"
            name="twitterUrl"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Twitter" autoSize />
          </Form.Item>

          <Form.Item
            label="Enlace a Instagram"
            name="instagramUrl"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Instagram" autoSize />
          </Form.Item>

          <Form.Item
            label="Enlace a Youtube"
            name="youtubeUrl"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el texto',
              },
            ]}
          >
            <Input.TextArea placeholder="Youtube" autoSize />
          </Form.Item>
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
            Crear{' '}
          </button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default AboutDetailForm
