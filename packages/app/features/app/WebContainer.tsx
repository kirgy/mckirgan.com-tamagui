import {
  Button,
  H1,
  H2,
  Header,
  Paragraph,
  Sheet,
  XStack,
  YStack,
  type YStackProps,
} from '@my/ui/src'
import { useEffect, useState } from 'react'
import { SheetProps } from '@tamagui/sheet/types/types'
import { ChevronDown, Menu } from '@tamagui/lucide-icons'
import WebMenuSheet from 'app/features/app/WebMenuSheet'
import { ViewProps } from 'react-native'

type WebContainerProps = YStackProps & {
  children: React.ReactNode
  innerContainer?: YStackProps
  headerProps?: YStackProps
  onHeaderLayout: (height: number, width: number) => void
}

const WebContainer = ({
  children,
  innerContainer,
  headerProps,
  onHeaderLayout,
  ...containerProps
}: WebContainerProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  return (
    <YStack
      px="$5"
      flex={1}
      width="100%"
      maxWidth={850}
      alignSelf="center"
      alignItems="center"
      {...containerProps}
    >
      <Header
        p="$5"
        width="100%"
        onLayout={(event) => {
          if (pageLoaded) {
            onHeaderLayout(event.nativeEvent.layout.height, event.nativeEvent.layout.width)
          }
        }}
        {...headerProps}
      >
        <XStack justifyContent="space-between">
          <H1
            $sm={{
              fontSize: '$9',
              mt: '$-2',
            }}
          >
            McKirgan.com
          </H1>
          <Button
            onPress={() => setMenuOpen(!menuOpen)}
            backgroundColor="none"
            textAlign="right"
            p="$0"
            unstyled
          >
            <Menu size="$3" />
          </Button>

          <WebMenuSheet menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </XStack>
      </Header>
      <YStack flex={1} {...innerContainer}>
        {children}
      </YStack>
    </YStack>
  )
}

export default WebContainer
