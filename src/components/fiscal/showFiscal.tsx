import { Order } from '@/types/orders'
import { MappedPaginatorInfo } from '@/types/index'
import { useFiscalMutation } from '@/data/fiscal'
import Image from 'next/image'

const ShowFiscal = () => {
  const { fiscalr, loading: loadingFiscal } = useFiscalMutation({
    id: 1,
  })

  return (
    <>
      <div className="flex">
        <div className="mr-2 w-1/2 border">
          <h2 className="px-2">
            <strong>Nombre del contribuyente: </strong> {fiscalr?.contribuyente}{' '}
          </h2>
          <h2 className="border-t px-2">
            <strong> RFC: </strong> {fiscalr?.rfc}{' '}
          </h2>

          <h2 className="border-t px-2">
            <strong> Firma electronica</strong>
          </h2>
          <div className="flex justify-center">
            <Image
              className="p-5"
              alt="imagen"
              width={300}
              height={300}
              src={fiscalr?.firmaElectronica}
            />
          </div>
        </div>

        <div className="mr-2 w-1/2 border ">
          <h2 className="px-2">
            <strong> Razón social: </strong> {fiscalr?.razonSocial}{' '}
          </h2>

          <h2 className="border-t px-2">
            <strong> Domicilio del contribuyente: </strong> {fiscalr?.domicilio}{' '}
          </h2>

          <div className="">
            <h2 className="border-t px-2">
              <strong> Sello digital</strong>
            </h2>
            <div className="flex justify-center">
              <Image
                className="p-5"
                alt="imagen"
                width={300}
                height={300}
                src={fiscalr?.selloDigital}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowFiscal
