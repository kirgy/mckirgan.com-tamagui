import { H1, H2, Image, YStack, Text, Stack, XStack, Button } from '@my/ui'
import CaseStudyTitle from 'app/features/home/caseStudies/CaseStudyTitle'
import { useState } from 'react'
import CONSTANTS from '../../../../lib/constants'
import { Linking } from 'react-native'
import useWindowSize from 'app/lib/hooks/useWindowSize'

const bbcMaestroDesktop = '/home/case-studies/bbcmaestro-desktop.png'
const bbcMaestroMobile = '/home/case-studies/bbcmaestro-mobile.png'

export function BBCMaestroCaseStudy() {
  const [containerDimensions, setContainerDimensions] = useState<{
    height: number | undefined
    width: number | undefined
  }>({ width: undefined, height: undefined })

  const windowSize = useWindowSize();
  const isPortrait = (windowSize?.height ?? 0) > (windowSize?.width ?? 0);

  return (
    <Stack flex={1} py="$5" space="$5" backgroundColor="#d55a00" ai="center">
      <YStack
        flex={1}
        width="100%"
        maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH}
        onLayout={(event) => {
          setContainerDimensions({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
          })
        }}
        space="$5"
        px="$5"
      >
        <CaseStudyTitle
          title="BBC Maestro"
          role="Lead React Native Engineer"
          time="June 2022 - May 2023"
          color="#ffffff"
        />

        <XStack flex={1} flexWrap="wrap">
          <Stack flex={1}>
            <Image
              source={{uri: isPortrait ? bbcMaestroMobile :bbcMaestroDesktop}}
              aspectRatio={0.75}
              width={(containerDimensions.width || 1) * 0.9}
              maxHeight={500}
              resizeMode="contain"
              alignSelf="center"
            />
          </Stack>
          <Stack pt="$5" flex={1}>
            <Text variant="body">
              BBC Maestro provides on demand video based courses from the leading figures in their
              field. Historically, this has been confined to their web platform which meant their
              mobile and tablet users weren't able to access their content easily on the move,
              harness the full potential of their device, and were limited in capabilities.
            </Text>
            <Text variant="body">
              As the lead React Native engineer on this green field project, I brought my experience
              building mobile applications to the company needing a mobile expert to expand their
              core business offering - placing their platform in their user's pockets.
            </Text>
            <Text variant="body">
              I owned the technical development of the project, working closely with the CTO,
              product owner, designer and other stakeholders, I was able to bring a robust, scalable
              feature-complete application through testing and bug-fixing, ready for public launch,
              before handing off the project to the new perminant developers who will continue
              project maintainance.
            </Text>
          </Stack>
        </XStack>
        <Stack alignItems="flex-start" pb="$5">
          <Button flex={0} backgroundColor="#ffffff" color="#d55a00" size="$5" onPress={() => Linking.openURL("https://apps.apple.com/gb/app/bbc-maestro/id1631849210")}>
            Download the app
          </Button>
        </Stack>
      </YStack>
    </Stack>
  )
}
