import { ReactElement, Suspense } from 'react'
import './globals.css'

import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import { theme } from '@/themes'
import MainLayout from '@/layouts/MainLayout'
import LoadingSpinner from '@/components/LoadingSpinner'
import { camelCaseKeys } from '@test/utils'
import { ButtonReject } from '@test/components'
export default function App({ pageProps }: AppProps): ReactElement {
  const router = useRouter()
  const { asPath } = router
  const { id } = router.query
  const snakeCaseObject = {
    first_name: 'John',
    last_name: 'Doe',
    address: {
      street_name: 'Main St',
      city_name: 'Anytown'
    },
    friends: [
      { first_name: 'Jane', last_name: 'Doe' },
      { first_name: 'Jim', last_name: 'Beam' }
    ]
  }

  const camelCaseObject = camelCaseKeys(snakeCaseObject)

  console.log(camelCaseObject)

  const AnyComponent = dynamic(
    () =>
      asPath === `/test/${id}` ? import('./test/[id]') : import('./index'),
    {
      loading: () => <LoadingSpinner />,
      suspense: true
    }
  )

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme()}>
          <Suspense>
            <MainLayout>
              <AnyComponent {...pageProps} />
              <ButtonReject onClick={() => {}} type="reset" children="haha" />
            </MainLayout>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}
