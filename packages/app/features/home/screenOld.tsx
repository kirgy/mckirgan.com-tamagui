import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack,
  Image,
  type TamaguiElement,
  H2,
  Stack,
  useMedia,
  Text,
  AnimatePresence,
  styled,
  Square,
  Circle,
  ButtonFrame,
  Spinner,
  H3,
  H4,
} from '@my/ui'
import { ArrowDown, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import WebContainer from 'app/features/app/WebContainer'
// import { LinearGradient } from 'expo-linear-gradient'
import { LinearGradient } from '@tamagui/linear-gradient'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, LayoutChangeEvent, useWindowDimensions, View } from 'react-native'
import { useLink } from 'solito/link'
import Typed from 'react-typed'

const chrisProfileImage = require('app/features/home/assets/chris-profile-home-mobile.jpg')
const chrisProfileLargeImage = require('app/features/home/assets/chris-profile-home-large.jpg')
const chrisProfileDesktopImage = require('app/features/home/assets/chris-profile-desktop.jpg')

const logoBBCMaestro = require('app/features/home/assets/logos/bbcmaestro.png')
const logoJanssen = require('app/features/home/assets/logos/janssenoncology.jpg')
const logoMarmite = require('app/features/home/assets/logos/marmite.jpg')
const logoHL = require('app/features/home/assets/logos/hargreaveslansdown.jpg')
const caseStudyBBCMaestroComingSoon = require('app/features/home/assets/caseStudies/bbcmaestroComingSoon.png')

type WorkExcerpts = Array<{
  company: string
  text: string
  image: string
  imageRatio: number
}>

const WORK_EXCERPTS: WorkExcerpts = [
  {
    company: 'BBCMAESTRO',
    text: 'I put the worlds experts at your fingertips.',
    image: logoBBCMaestro,
    imageRatio: 1,
  },
  {
    company: 'MARMITE',
    text: 'I let you put your name on it.',
    image: logoMarmite,
    imageRatio: 1,
  },
  {
    company: 'JANSSEN',
    text: 'I enabled cancer surgeons to get instant medical advise.',
    image: logoJanssen,
    imageRatio: 772 / 386,
  },
  {
    company: 'HL',
    text: 'I helped keep your money secure.',
    image: logoHL,
    imageRatio: 668 / 350,
  },
]

const AnimatableSquare = styled(Square, {
  variants: {
    fromRight: {
      true: {
        x: 1000,
      },
    },
    fromLeft: {
      true: {
        x: -1000,
      },
    },
  },
})

export function HomeScreen() {
  const [containerDimensions, setContainerDimensions] = useState({ height: 0, width: 0 })
  const [headerDimensions, setHeaderDimensions] = useState({ height: 0, width: 0 })
  const [activeWorkExcerptIndex, setActiveWorkExcerptIndex] = useState(0)
  const [showExcerptImage, setShowExcerptImage] = useState(false)
  const [workExcerptsAllShown, setWorkExcerptsAllShown] = useState(false)

  const screenRatio = useMemo(() => {
    return containerDimensions.height / containerDimensions.width
  }, [containerDimensions])

  const workExcerptsText = useMemo(() => {
    return WORK_EXCERPTS.map((excerpt) => excerpt.text)
  }, [])

  const onStringTyped = useCallback(
    (activeIndex: number) => {
      setShowExcerptImage(true)
      setActiveWorkExcerptIndex(activeIndex)
      console.log({ activeIndex, self })
    },
    [setActiveWorkExcerptIndex, setShowExcerptImage]
  )

  useEffect(() => {
    if (showExcerptImage) {
      const timeout = setTimeout(() => {
        setShowExcerptImage(false)
      }, 4_000)

      return () => clearTimeout(timeout)
    }
  }, [showExcerptImage])

  const linkProps = useLink({
    href: '/user/nate',
  })

  console.log({ screenRatio })
  return (
    <WebContainer
      onLayout={(event) => {
        console.log({ event: event.nativeEvent.layout.height })
        setContainerDimensions({
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
        })
      }}
      headerProps={{
        px: '$5',
        onLayout: (event) => {
          setHeaderDimensions({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
          })
        },
      }}
      innerContainer={{
        width: '100%',
      }}
      px={0}
    >
      <YStack flex={1}>
        <YStack
          jc="center"
          ai="center"
          minHeight={containerDimensions.height - headerDimensions.height}
        >
          <Stack
            flex={1}
            position="relative"
            height={containerDimensions.height * 0.75}
            width="100%"
            alignItems="flex-start"
            $gtSm={{
              flexDirection: 'row',
            }}
          >
            <Image
              src={screenRatio < 2 ? chrisProfileLargeImage : chrisProfileImage}
              $gtSm={{
                src: chrisProfileDesktopImage,
                width: containerDimensions.width / 2,
              }}
              width={containerDimensions.width}
              height={containerDimensions.height * 0.75}
              resizeMode="contain"
            />
            <LinearGradient
              position="absolute"
              $gtSm={{
                top: 0,
                right: 0,
                width: containerDimensions.width / 2,
                height: containerDimensions.height * 0.8,
              }}
              zIndex={1}
              width="100%"
              bottom={0}
              height={containerDimensions.height * 0.4}
              colors={['#06050c', 'transparent']}
              start={[0, 1]}
              end={[0, 0]}
            >
              <Stack
                flex={1}
                alignItems="center"
                justifyContent="flex-start"
                $gtSm={{
                  justifyContent: 'center',
                }}
                px="$5"
                space="$10"
              >
                <H2 ta="center" fontFamily="firaMono" fontWeight="100" maxWidth={500}>
                  <Typed
                    strings={workExcerptsText}
                    onStringTyped={onStringTyped}
                    onComplete={() => setWorkExcerptsAllShown(true)}
                    typeSpeed={30}
                    backSpeed={25}
                    backDelay={4000}
                    preStringTyped={(arg1, arg2) => console.log({ arg1, arg2 })}
                    loop
                    fadeOut
                  />
                </H2>
                {showExcerptImage && (
                  <Square
                    key={'123'}
                    enterStyle={{
                      opacity: 0,
                    }}
                    exitStyle={{
                      scale: 2,
                      opacity: 0,
                      size: 100,
                    }}
                    animation="lazy"
                    size={110}
                    opacity={1}
                  >
                    <Image
                      src={WORK_EXCERPTS[activeWorkExcerptIndex]?.image}
                      borderRadius="$5"
                      borderColor="$gray10Dark"
                      borderWidth="$0.5"
                      width={
                        containerDimensions.width *
                        0.2 *
                        (WORK_EXCERPTS[activeWorkExcerptIndex]?.imageRatio ?? 0)
                      }
                      height={containerDimensions.width * 0.2}
                    />
                  </Square>
                )}
              </Stack>
            </LinearGradient>
          </Stack>
          <Stack zIndex={2} alignItems="center" position="absolute" bottom={0}>
            <Button
              height="$5"
              width="$5"
              borderRadius={90}
              icon={ArrowDown}
              backgroundColor="$gray10Dark"
              color="black"
              mb="$5"
            />
            {workExcerptsAllShown && (
              <Stack position="absolute" top={0}>
                <Spinner size="$5" color="$gray9Dark" />
              </Stack>
            )}
          </Stack>
        </YStack>
      </YStack>
      <YStack jc="center" ai="center" backgroundColor="#d55a00" w={containerDimensions.width}>
        <YStack space="$5" maxWidth={600}>
          <Stack position="relative" overflow="hidden" height="$15">
            <Stack
              marginTop="$-5"
              marginLeft={-containerDimensions.width / 4}
              height="$10"
              width={containerDimensions.width * 2}
              backgroundColor="#000000"
              zIndex={20}
              transform={[
                {
                  rotate: '5deg',
                },
              ]}
            />
          </Stack>
          <YStack px="$5" mt="$-14" pb="$10" maw={600} space="$5">
            <Stack>
              <H2 ta="center">Some of my recent work</H2>
            </Stack>
            <Stack>
              <H3>BBC Maestro</H3>
              <H4 fontSize="$5" opacity={0.5}>
                June 2022 - May 2023
              </H4>
            </Stack>
            <Text>
              {
                WORK_EXCERPTS.find((excerpt) => {
                  return excerpt.company === 'BBCMAESTRO'
                })?.text
              }
            </Text>
            <XStack space="$5">
              <Stack marginLeft={-60}>
                <Image
                  src={caseStudyBBCMaestroComingSoon}
                  width={containerDimensions.width / 2}
                  maxWidth={200}
                  resizeMode="contain"
                  aspectRatio={0.5}
                  accessibilityLabel="An iphone with the text, 'coming soon' displayed on the screen"
                />
              </Stack>
              <Text>
                As the lead React Native engineer on a green field project, I worked largely
                independently but as part of the wider agile team, to architect, advise and build
                BBC Maestro's flagship mobile platform for iOS & Android on mobile & tablet.
              </Text>
            </XStack>

            <Text>
              Wearing many hats, I was able to work together with product managers, the CTO,
              designer, testers, and backend engineers whilst also coding the app. Bringing my
              experience building apps and working in green-field startups I was able to table tools
              which enabled us to build a robust, scalable and
            </Text>
          </YStack>
        </YStack>
      </YStack>
    </WebContainer>
  )
}
