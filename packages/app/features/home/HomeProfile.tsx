import { Button, YStack, Image, H2, Stack, Square } from '@my/ui'
import { ArrowDown } from '@tamagui/lucide-icons'
import { LinearGradient } from '@tamagui/linear-gradient'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Typed from 'react-typed'
import { type WorkExcerpts } from 'app/features/home/screen'
import SocialMeta from 'app/features/app/SocialMeta/SocialMeta'
import { OGType } from 'app/features/app/SocialMeta/types'
import CONSTANTS from 'app/lib/constants'

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
      <SocialMeta type={ OGType.website } 
        title="Chris McKirgan, Software Engineer"
        description="Web developer, public speaker, hacker & Jesus follower"
        url={`${CONSTANTS.DOMAIN_URL}`}
        publishedDate={new Date("2023-12-15T15:01:40+00:00")}
        image={{
          facebook: `${CONSTANTS.DOMAIN_URL}/${"home/assets/sharing/og-image.jpg"}`,
          twitter: `${CONSTANTS.DOMAIN_URL}/${"home/assets/sharing/og-image.jpg"}`,
        }}
      /> 
      <Stack position="absolute" top={0}>
        <Image
          source={{
            uri:
            containerDimensions.width && containerDimensions.width > 437
              ? chrisProfileImageMedium
              : chrisProfileImage,
            blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAINAoYDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBQQD/8QAFhABAQEAAAAAAAAAAAAAAAAAABEB/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAGREBAQEBAQEAAAAAAAAAAAAAABEBAhIx/9oADAMBAAIRAxEAPwDyoD675YqAKIoAAAAAAAAgAAAAAAAACAAAICAioKIqIIAioCIomqiCIqIqAIqIqIqIqIqIqIqIqIqIqIqAIIAioAAAAAAAqAAKAqCoqgqKIAKigAAKAAAAOmA9LiAAAAKgCiKAAAAIAAAAAAAAIAACCACiAgIAIAioioiiAgiKiKiKiKgIiiCIoisooioioioyqAAgIigACAAACiKqAAKAqCoqgqAigKCoogAoAAAA6YivS5AAgAAAAAAACoAAAAAgAAAACIKgCgIACICKgoiogICKiKiKICCIqIqIqIqIqIqIqMqgIiiAioiogIAogIAAACgAIoiqCoKigKKAIoiqAAiiKoAAAA6QivQ5AAAACoKiiAKIAogCiAKIAogCoCACAqAACIAIKAiACIogAIIiiAioioiiCIogjIIIiiKiKiKiKIIigIgAAIAAAKIKKAqKIqgqKIKgooCoogCgAKgqKIA6Qg9DkoAAAAAKIAogCiAiiAKIAogAAACAqAgAgoCIAIACIoioiiCICKiKgIiiCIogiKICKiKiKgIgICKgCKIAAgCiAKIqoKgCiKqKIqgqCoqoAoiqgACiAKIA6Qg9DkogCiAKICKIKKACiAAAAAAAAggogCoICoCAIAAiKCACAiiCIogIqIqICCIogjKiCIoioioCIogIoggKgIAgCiCiiKAqCooiqKIoiiCiqgqKIoACiiAKIA6Ig9DioAKIAogCiAKIAogCiAiiAKIAogACIKICgICoIgqCCqgiCoIiiAgIIiiAioioioCIogiKIIigIyCCCgIiqgiCiAKIKKIKKqAiiKoogqKqCiiKIogooigKgCiAjoiD0OSiAKIAogCiAKICKIAogCiAKIAogCoICiCCoIKqAgCACCIqoIgqCIoggoCMqIIgIIigIiiCIogiKAiKCCAICgICiAKqCiiCo0IAqsqqKIqiiCoqsqCiAKIKKICOiIO7kogCiFEUQBRAFEAUQBRAFEAUQBRAFRKAoggqIAqCCqIiCiIiqggKgiKICKIIgIIiqgjKiCIogiKAiKIIigIgCCKogCiCiiCiiVVRRBRoQEVWVUUQUaGVEUQUUQBRAHRGSu7g0M0oNDK0FEoCiFBRAFKgC0qALRAFESg0iUBSoUFEqILSoAtSoCqglQVCoiqggKiCKCIgqCIogiKqCMqIIiiCIqogiiCMqCFSqFShRRmlKLSpSlVoZVUWlSlUapWataRarNWgqs0qo0JRRVZFGhARSoAtEAdClSld3BaJSgogCiAKVAFpUAVayA1Ss0oNVKlKC0qUoLRKUFGaUFolKgtKyAtKiCrSoVAEpUUpUABEqKqURFVEKgIIiglSsqqCIohUZUqCVKqpUqVm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"

          }}
          aspectRatio={1}
          height={containerDimensions.height ?? "200"}
          resizeMode="contain"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAINAoYDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBQQD/8QAFhABAQEAAAAAAAAAAAAAAAAAABEB/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAGREBAQEBAQEAAAAAAAAAAAAAABEBAhIx/9oADAMBAAIRAxEAPwDyoD675YqAKIoAAAAAAAAgAAAAAAAACAAAICAioKIqIIAioCIomqiCIqIqAIqIqIqIqIqIqIqIqIqIqIqAIIAioAAAAAAAqAAKAqCoqgqKIAKigAAKAAAAOmA9LiAAAAKgCiKAAAAIAAAAAAAAIAACCACiAgIAIAioioiiAgiKiKiKiKgIiiCIoisooioioioyqAAgIigACAAACiKqAAKAqCoqgqAigKCoogAoAAAA6YivS5AAgAAAAAAACoAAAAAgAAAACIKgCgIACICKgoiogICKiKiKICCIqIqIqIqIqIqIqMqgIiiAioiogIAogIAAACgAIoiqCoKigKKAIoiqAAiiKoAAAA6QivQ5AAAACoKiiAKIAogCiAKIAogCoCACAqAACIAIKAiACIogAIIiiAioioiiCIogjIIIiiKiKiKiKIIigIgAAIAAAKIKKAqKIqgqKIKgooCoogCgAKgqKIA6Qg9DkoAAAAAKIAogCiAiiAKIAogAAACAqAgAgoCIAIACIoioiiCICKiKgIiiCIogiKICKiKiKgIgICKgCKIAAgCiAKIqoKgCiKqKIqgqCoqoAoiqgACiAKIA6Qg9DkogCiAKICKIKKACiAAAAAAAAggogCoICoCAIAAiKCACAiiCIogIqIqICCIogjKiCIoioioCIogIoggKgIAgCiCiiKAqCooiqKIoiiCiqgqKIoACiiAKIA6Ig9DioAKIAogCiAKIAogCiAiiAKIAogACIKICgICoIgqCCqgiCoIiiAgIIiiAioioioCIogiKIIigIyCCCgIiqgiCiAKIKKIKKqAiiKoogqKqCiiKIogooigKgCiAjoiD0OSiAKIAogCiAKICKIAogCiAKIAogCoICiCCoIKqAgCACCIqoIgqCIoggoCMqIIgIIigIiiCIogiKAiKCCAICgICiAKqCiiCo0IAqsqqKIqiiCoqsqCiAKIKKICOiIO7kogCiFEUQBRAFEAUQBRAFEAUQBRAFRKAoggqIAqCCqIiCiIiqggKgiKICKIIgIIiqgjKiCIogiKAiKIIigIgCCKogCiCiiCiiVVRRBRoQEVWVUUQUaGVEUQUUQBRAHRGSu7g0M0oNDK0FEoCiFBRAFKgC0qALRAFESg0iUBSoUFEqILSoAtSoCqglQVCoiqggKiCKCIgqCIogiKqCMqIIiiCIqogiiCMqCFSqFShRRmlKLSpSlVoZVUWlSlUapWataRarNWgqs0qo0JRRVZFGhARSoAtEAdClSld3BaJSgogCiAKVAFpUAVayA1Ss0oNVKlKC0qUoLRKUFGaUFolKgtKyAtKiCrSoVAEpUUpUABEqKqURFVEKgIIiglSsqqCIohUZUqCVKqpUqVm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"
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
