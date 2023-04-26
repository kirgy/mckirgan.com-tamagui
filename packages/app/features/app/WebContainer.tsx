import {
  Button,
  H1,
  H2,
  Header,
  Paragraph,
  ScrollView,
  Sheet,
  Stack,
  useWindowDimensions,
  XStack,
  YStack,
  type YStackProps,
} from '@my/ui/src'
import { useEffect, useState } from 'react'
import { SheetProps } from '@tamagui/sheet/types/types'
import { ChevronDown, Menu } from '@tamagui/lucide-icons'
import WebMenuSheet from 'app/features/app/WebMenuSheet'
import { View, ViewProps } from 'react-native'
import CONSTANTS from '../../lib/constants'

type WebContainerProps = YStackProps & {
  children: React.ReactNode
  innerContainer?: YStackProps
  headerProps?: YStackProps
  onHeaderLayout?: (height: number, width: number) => void
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
  const [headerDimensions, setHeaderDimensions] = useState<{ x: number; y: number } | undefined>(
    undefined
  )

  const windowDimensions = useWindowDimensions()

  console.log({ screenDimensions: headerDimensions })
  useEffect(() => {
    setPageLoaded(true)
  }, [])

  return (
    <YStack alignItems="center">
      <Header
        p="$5"
        width="100%"
        marginBottom={0 - (headerDimensions?.y ?? 0)}
        zIndex={1}
        backgroundColor="#000000cc"
        onLayout={(event) => {
          if (pageLoaded) {
            if (onHeaderLayout) {
              onHeaderLayout(event.nativeEvent.layout.height, event.nativeEvent.layout.width)
            }
            setHeaderDimensions({
              y: event.nativeEvent.layout.height,
              x: event.nativeEvent.layout.width,
            })
          }
        }}
        flex={1}
        {...headerProps}
      >
        <Stack width="100%" alignItems="center">
          <XStack justifyContent="space-between" width="100%" maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH}>
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
        </Stack>
      </Header>
      <ScrollView flex={1} w="100%" maxHeight={windowDimensions.height}>
        <YStack
          px="$5"
          flex={1}
          width="100%"
          maxWidth={850}
          alignSelf="center"
          alignItems="center"
          {...containerProps}
        >
          <YStack flex={1} px="$5" width="100%" {...innerContainer}>
            {children}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}

export default WebContainer
