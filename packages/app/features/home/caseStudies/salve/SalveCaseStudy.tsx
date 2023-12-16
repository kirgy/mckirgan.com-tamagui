import { Image, YStack, Text, Stack, XStack, Button } from '@my/ui'
import CaseStudyTitle from 'app/features/home/caseStudies/CaseStudyTitle'
import { useState } from 'react'
import CONSTANTS from '../../../../lib/constants'
import { Linking } from 'react-native'

const salveApp = '/home/case-studies/salve-app.png'

export function SalveCaseStudy() {
  const [containerDimensions, setContainerDimensions] = useState<{
    height: number | undefined
    width: number | undefined
  }>({ width: undefined, height: undefined })


  return (
    <Stack flex={1} py="$5" space="$5" backgroundColor="#fff" ai="center">
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
          title="Salve"
          role="Senior React Native Engineer"
          time="May 2023 - December 2023"
          color="#8665e3"
        />

        <XStack flex={1} flexWrap="wrap">
          <Stack flex={1}>
            <Image
              source={{uri: salveApp}}
              aspectRatio={0.75}
              width={(containerDimensions.width || 1) * 0.9}
              maxHeight={500}
              resizeMode="contain"
              alignSelf="center"
            />
          </Stack>
          <Stack pt="$5" flex={1}>
            <Text variant="body" color="$gray5Dark">
              Salve is a medtech startup, helping patients journeying through infertility treatment. Through their innovative mobile app, they integrate and transform the complexities of clinics EMR systems into a patient-friendly platform. The app provides timely medication reminders, video calling, in-vitro fertilisation processes, instant messaging to name but a few of the many features.
            </Text>
            <Text variant="body" color="$gray5Dark">
              As a senior React Native & node full-stack engineer in a med-tech scale-up, I worked fully-remotely alongside other remote engineers in a sizable team to build and assist in full-stack development of the mobile app, bringing my experience of React Native development to a team lacking that specific skill set.
              </Text>

            <Text variant="body" color="$gray5Dark">
              My project focus was a large-scale system refactor to support multi-account / multi-site authentication for fertility patients who often travel between multiple clinic sites for a variety of medical treatment. Further to this, I worked alongside other engineers to assist in react-native specific issues and provide ongoing support to the team.
            </Text>
            <Text variant="body" color="$gray5Dark">
              As an experienced mobile engineer, I worked alongside product owners, the tech lead, and other senior stakeholders to research, advise and shape business requirements as we journeyed through uncovering them together. Often working in ambiguity in the rapid scale-up company, I routinely took initiative to reach out to other engineers and product owners to reshape or raise issues, as the product development progressed.
            </Text>
          </Stack>
        </XStack>
        <Stack alignItems="flex-start" pb="$5">
          <Button flex={0} backgroundColor="#8665e3" color="#fff" size="$5" onPress={() => Linking.openURL("https://salvehealth.com/")}>
            Discover the Salve App
          </Button>
        </Stack>
      </YStack>
    </Stack>
  )
}
