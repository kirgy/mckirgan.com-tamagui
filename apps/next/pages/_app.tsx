import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import 'raf/polyfill'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Provider } from 'app/provider'
import Head from 'next/head'
import React, { startTransition } from 'react'
import type { SolitoAppProps } from 'solito'
import { Stack, YStack } from '@my/ui'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Tamagui Example App</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <YStack width="100%" minHeight="100%" flex={1} alignSelf="center" backgroundColor="#06050c">
          <Stack display="flex" flex={1}>
            <Component {...pageProps} />
          </Stack>
        </YStack>
      </ThemeProvider>
    </>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        startTransition(() => {
          setTheme(next)
        })
      }}
    >
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  )
}

export default MyApp
