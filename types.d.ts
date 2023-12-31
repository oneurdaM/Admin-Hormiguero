declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string
      NEXT_PUBLIC_RAPIDAPI_KEY: string
    }
  }
}
