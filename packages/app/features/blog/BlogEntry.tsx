import { Stack, Text, useWindowDimensions, XStack, YStack, Image, Separator } from '@my/ui/src'
import Share from 'app/features/app/Share/Share'
import SiteFooter from 'app/features/app/SiteFooter/SiteFooter'
import WebContainer from 'app/features/app/WebContainer'
import React, { useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { useLink } from 'solito/link'
import CONSTANTS from '../../lib/constants'
import { parseISO, format } from 'date-fns'

export type BlogEntryProps = {
  url: string
  title: string
  image: number
  publishedDate: string
  articleReadTimeMinutes: number
  social: {
    text: string
  }
  children: React.ReactNode
}

const { useParam } = createParam<{ id: string }>()

export const BANNER_H = 500

const BlogEntry = ({
  url,
  title,
  image,
  publishedDate,
  articleReadTimeMinutes,
  social,
  children,
}: BlogEntryProps) => {
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
  })
  // console.log({ children })
  const parsedPublishedDate = parseISO(publishedDate)

  const contentScroll = useRef(new Animated.Value(0)).current
  const dimensions = useWindowDimensions()
  const [headerDimensions, setHeaderDimensions] = useState<
    { height: number; width: number } | undefined
  >()

  return (
    <WebContainer
      maxWidth={undefined}
      px={undefined}
      innerContainer={{
        px: undefined,
      }}
      onHeaderLayout={(height: number, width: number) => {
        setHeaderDimensions({ height, width })
      }}
    >
      <View
        style={{
          maxHeight: dimensions.height,
          // paddingTop: headerDimensions?.height,
        }}
      >
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: contentScroll } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={4}
          style={{}}
        >
          <Stack alignItems="center" width="100%" marginTop={headerDimensions?.height ?? 0}>
            <Stack
              overflow="hidden"
              maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH}
              width="100%"
              alignItems="center"
              position="relative"
            >
              <Animated.Image
                style={styles.banner(contentScroll)}
                source={image}
                resizeMode="cover"
              />
              <Stack
                w="100%"
                h="100%"
                px="$5"
                position="absolute"
                justifyContent="center"
                alignItems="center"
              >
                <Text variant="heading1" marginTop="0" textAlign="center">
                  {title}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <YStack flex={1} alignItems="center">
            <XStack
              mb="$5"
              width="100%"
              maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH}
              mt={-75}
              pl="$5"
              space="$5"
            >
              <Image
                src="https://secure.gravatar.com/avatar/5681923963d2f7674b7afd45ae2d61cb?size=300"
                width={150}
                height={150}
                borderWidth={5}
                borderRadius={90}
                resizeMode="cover"
              />
              <YStack space="$6" mt="$3" justifyContent="center">
                <Share shareURL={url} shareText={social.text} />
                <YStack>
                  <Text lineHeight={8}>{format(parsedPublishedDate, 'do LLLL yyyy')}</Text>
                  <Text variant="bodySM" opacity={0.5}>
                    {articleReadTimeMinutes} minute read
                  </Text>
                </YStack>
              </YStack>
            </XStack>
            <YStack maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH} space="$5" px="$5" mb="$15">
              {children}
            </YStack>
            <YStack maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH} space="$5" px="$5" mb="$5">
              <Separator />
              <SiteFooter />
            </YStack>
          </YStack>
        </Animated.ScrollView>
      </View>
    </WebContainer>
  )
}

const styles = {
  banner: (scrollA) => ({
    height: BANNER_H,
    width: '100%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 1.5, 1.5],
        }),
      },
    ],
    opacity: scrollA.interpolate({
      inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
      outputRange: [0.7, 0.4, 0, 0],
    }),
  }),
}

export default BlogEntry
