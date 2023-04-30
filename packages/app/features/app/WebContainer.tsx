import {
  Button,
  H1,
  Header,
  ScrollView,
  Stack,
  useWindowDimensions,
  XStack,
  YStack,
  type YStackProps,
} from '@my/ui/src'
import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Menu } from '@tamagui/lucide-icons'
import WebMenuSheet from 'app/features/app/WebMenuSheet'
import CONSTANTS from '../../lib/constants'
import { type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native'
import { Link } from 'solito/link'

type WebContainerProps = YStackProps & {
  children: React.ReactNode
  innerContainer?: YStackProps
  headerProps?: YStackProps
  onHeaderLayout?: (height: number, width: number) => void
  transparentUntilScroll?: boolean
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  scrollViewRef?: MutableRefObject<ScrollView>
}

const WebContainer = ({
  children,
  innerContainer,
  headerProps,
  onHeaderLayout,
  transparentUntilScroll,
  onScroll,
  scrollViewRef,
  ...containerProps
}: WebContainerProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [headerDimensions, setHeaderDimensions] = useState<{ x: number; y: number } | undefined>(
    undefined
  )
  const [canAnimateHeader, setCanAnimateHeader] = useState(false)

  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  const onScrollHandler = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll && onScroll(event)

      if (event.nativeEvent.contentOffset.y > 50) {
        setCanAnimateHeader(true)
        return
      }

      if (event.nativeEvent.contentOffset.y < 20) {
        setCanAnimateHeader(false)
      }
    },
    [onScroll]
  )

  return (
    <YStack alignItems="center">
      <Header
        p="$5"
        width="100%"
        marginBottom={0 - (headerDimensions?.y ?? 0)}
        zIndex={1}
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
        position="relative"
        {...headerProps}
      >
        <Stack
          flex={1}
          backgroundColor="#000000"
          position="absolute"
          top={0}
          left={0}
          height="100%"
          width="100%"
          opacity={
            transparentUntilScroll ? (canAnimateHeader && transparentUntilScroll ? 0.85 : 0) : 0.85
          }
          animation={[
            'linear',
            {
              backgroundColor: {
                delay: 1000,
              },
            },
          ]}
        />
        <Stack width="100%" alignItems="center" position="relative" top={0}>
          <XStack justifyContent="space-between" width="100%" maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH}>
            <Stack
              animation="bouncy"
              hoverStyle={{}}
              pressStyle={{
                scale: 0.98,
              }}
            >
              <Link href="/">
                <H1
                  $sm={{
                    fontSize: '$9',
                    mt: '$-2',
                  }}
                >
                  McKirgan.com
                </H1>
              </Link>
            </Stack>
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

      <ScrollView
        ref={scrollViewRef}
        flex={1}
        w="100%"
        maxHeight={windowDimensions.height}
        onScroll={onScrollHandler}
        scrollEventThrottle={100}
      >
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
