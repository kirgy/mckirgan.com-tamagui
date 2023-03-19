import { Button, YStack, Image, H2, Stack, Square } from '@my/ui'
import { ArrowDown } from '@tamagui/lucide-icons'
import { LinearGradient } from '@tamagui/linear-gradient'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Typed from 'react-typed'
import { type WorkExcerpts } from 'app/features/home/screen'

const chrisProfileImage = require('app/features/home/assets/chris-profile-home-mobile.jpg')
const chrisProfileImageMedium = require('app/features/home/assets/chris-profile-home-mobile-medium.jpg')
const transparentPixel = require('app/features/home/assets/transparent-pixel.png')

const logoBBCMaestro = require('app/features/home/assets/logos/bbcmaestro.png')
const logoJanssen = require('app/features/home/assets/logos/janssenoncology.jpg')
const logoMarmite = require('app/features/home/assets/logos/marmite.jpg')
const logoHL = require('app/features/home/assets/logos/hargreaveslansdown.jpg')
const caseStudyBBCMaestroComingSoon = require('app/features/home/assets/caseStudies/bbcmaestroComingSoon.png')

type HomeProfileProps = {
  workExcerpts: WorkExcerpts
}

export default function HomeProfile({ workExcerpts }: HomeProfileProps) {
  const [showExcerptImage, setShowExcerptImage] = useState(false)
  const [activeWorkExcerptIndex, setActiveWorkExcerptIndex] = useState(0)
  const [containerDimensions, setContainerDimensions] = useState<{
    height: number | undefined
    width: number | undefined
  }>({ width: undefined, height: undefined })

  const workExcerptsText = useMemo(() => {
    return workExcerpts.map((excerpt) => excerpt.text)
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

  return (
    <YStack
      flex={1}
      ai="center"
      onLayout={(event) => {
        setContainerDimensions({
          height: event.nativeEvent.layout.height,
          width: event.nativeEvent.layout.width,
        })
      }}
    >
      <Stack position="absolute" top={0}>
        <Image
          src={
            containerDimensions.width && containerDimensions.width > 437
              ? chrisProfileImageMedium
              : chrisProfileImage
          }
          aspectRatio={1}
          height={containerDimensions.height ?? '100%'}
          resizeMode="contain"
        />
      </Stack>
      <Stack flex={1} position="relative" width="100%" alignItems="flex-start">
        <LinearGradient
          position="absolute"
          zIndex={1}
          width="100%"
          bottom={0}
          height="60%"
          colors={['#06050c', 'transparent']}
          start={[0, 1]}
          end={[0, 0]}
        >
          <YStack flex={1} justifyContent="flex-end" space="$5">
            <Stack flex={0.5} alignItems="center" justifyContent="flex-end" px="$5" space="$5">
              <Stack width="100%" maxWidth={500}>
                <H2 ta="center" fontFamily="firaMono" fontWeight="100">
                  <Typed
                    strings={workExcerptsText}
                    onStringTyped={onStringTyped}
                    typeSpeed={30}
                    backSpeed={25}
                    backDelay={4000}
                    loop
                    fadeOut
                  />
                </H2>
              </Stack>
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
                  src={
                    showExcerptImage
                      ? workExcerpts[activeWorkExcerptIndex]?.image
                      : transparentPixel
                  }
                  borderRadius="$5"
                  borderColor="$gray10Dark"
                  borderWidth={showExcerptImage ? '$0.5' : 0}
                  aspectRatio={workExcerpts[activeWorkExcerptIndex]?.imageRatio ?? 1}
                  height={100}
                  width=""
                />
              </Square>
            </Stack>
            <Stack zIndex={2} alignItems="center">
              <Button
                height="$5"
                width="$5"
                p={0}
                borderRadius={90}
                icon={ArrowDown}
                backgroundColor="$gray5Dark"
                color="black"
                mb="$5"
              />
            </Stack>
          </YStack>
        </LinearGradient>
      </Stack>
    </YStack>
  )
}
