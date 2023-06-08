import { H1, H2, Image, YStack, Text, Stack, XStack, Button } from '@my/ui'
import CaseStudyTitle from 'app/features/home/caseStudies/CaseStudyTitle'
import { useState } from 'react'
import CONSTANTS from '../../../../lib/constants'

const expertOnCallMockup = '/home/case-studies/expert-on-call-mockup.png'

export function JanssenCaseStudy() {
  const [containerDimensions, setContainerDimensions] = useState<{
    height: number | undefined
    width: number | undefined
  }>({ width: undefined, height: undefined })

  return (
    <Stack flex={1} py="$5" space="$5" backgroundColor="#ffffff" ai="center">
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
          title="Janssen, Johnson & Johnson"
          agency="Brandcast Health"
          role="React Native & Laravel Full-Stack Engineer"
          time="March 2021 - June 2021"
          color="#00367f"
        />

        <XStack flex={1} flexWrap="wrap">
          <Stack flex={1}>
            <Image
              source={{uri:expertOnCallMockup}}
              aspectRatio={1}
              width={(containerDimensions.width || 1) * 0.9}
              maxHeight={500}
              resizeMode="contain"
              alignSelf="center"
            />
          </Stack>
          <Stack pt="$5" flex={1}>
            <Text variant="body" color="$gray5Dark">
              Janssen, a Johnson & Johnson company, provide a variety of pharmaceutical services and
              research around the world. Part of their services incudes cancer research and tools to
              connect oncology doctors with Janssen's world leading experts. One such tool is a
              ExpertOnCall - an app which enables live video call consultations between cancer
              surgeons and Oncology experts.
            </Text>
            <Text variant="body" color="$gray5Dark">
              As the lead and sole React Native & Laravel full-stack engineer on this brown field
              project, I was brought on board to bring my full-stack & mobile skills to the agency;
              lifting an 3 year-old defunct React Native, Angular & Laravel full-stack project back
              to life, and create additional features.
            </Text>
            <Text variant="body" color="$gray5Dark">
              As the company had limited experience with React Native development, I worked in a
              project lead capacity, where I liased between the Project Manager, the wider
              development team and other stakeholders to advise on process, upgrade the app and
              server to the latest long-term-support versions, and build a handful of new features.
            </Text>
            <Text variant="body" color="$gray5Dark">
              I lead the project through to their client's testing phase before handing off the
              project to the agency's development team who will begin to acquire the skills needed
              to maintain the application. The app is routinely used daily by thausands of Oncology
              Doctors in Saudi Arabia.
            </Text>
          </Stack>
        </XStack>
        <Stack alignItems="flex-start" pb="$5">
          <Button flex={0} backgroundColor="#00367f" color="#ffffff" size="$5">
            Find out about Janssen
          </Button>
        </Stack>
      </YStack>
    </Stack>
  )
}
