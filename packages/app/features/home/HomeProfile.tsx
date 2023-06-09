import { Button, YStack, Image, H2, Stack, Square } from '@my/ui'
import { ArrowDown } from '@tamagui/lucide-icons'
import { LinearGradient } from '@tamagui/linear-gradient'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Typed from 'react-typed'
import { type WorkExcerpts } from 'app/features/home/screen'

const chrisProfileImage = '/home/assets/chris-profile-home-mobile.jpg';
const chrisProfileImageMedium = '/home/assets/chris-profile-home-mobile-medium.jpg';
const transparentPixel = '/home/assets/transparent-pixel.png';

const logoBBCMaestro = '/home/assets/logos/bbcmaestro.png';
const logoJanssen = '/home/assets/logos/janssenoncology.jpg';
const logoMarmite = '/home/assets/logos/marmite.jpg';
const logoHL = '/home/assets/logos/hargreaveslansdown.jpg';

type HomeProfileProps = {
  workExcerpts: WorkExcerpts
  handleScrollToCaseStudy: (index: number) => void
}

export default function HomeProfile({ workExcerpts, handleScrollToCaseStudy }: HomeProfileProps) {
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
      backgroundColor="#06050c"
    >
      <Stack position="absolute" top={0}>
        <Image
          source={{
            uri:
            containerDimensions.width && containerDimensions.width > 437
              ? chrisProfileImageMedium
              : chrisProfileImage
          }}
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
                hoverStyle={{
                  scale: 1.1,
                  cursor: 'pointer',
                }}
                pressStyle={{
                  scale: 0.9,
                }}
                onPress={() => handleScrollToCaseStudy(activeWorkExcerptIndex)}
              >
                <Image
                  source={{
                    uri:
                    showExcerptImage
                      ? workExcerpts[activeWorkExcerptIndex]?.image
                      : transparentPixel
                    }}
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
                animation="bouncy"
                hoverStyle={{
                  scale: 1.2,
                  cursor: 'pointer',
                }}
                pressStyle={{
                  scale: 0.9,
                }}
                onPress={() => handleScrollToCaseStudy(0)}
              />
            </Stack>
          </YStack>
        </LinearGradient>
      </Stack>
    </YStack>
  )
}
