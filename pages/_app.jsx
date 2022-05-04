import 'tailwindcss/tailwind.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from 'components/LoadingScreen'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))

    return () => {
      router.events.off('routeChangeStart', () => setLoading(true))
      router.events.off('routeChangeComplete', () => setLoading(false))
    }
  }, [])

  return loading ? <LoadingScreen /> : <Component {...pageProps} />
}

export default MyApp