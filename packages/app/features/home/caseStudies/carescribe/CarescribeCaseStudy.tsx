import { Stack, Image, Text, YStack, Button } from '@my/ui/src'
import CaseStudyTitle from 'app/features/home/caseStudies/CaseStudyTitle'
import { useState } from 'react'
import CONSTANTS from '../../../../../lib/constants'

const bbcMaestroStoreMockup = require('./carescribe-app-screenshot.png')

const CarescribeCaseStudy = () => {
  const [containerDimensions, setContainerDimensions] = useState<{
    height: number | undefined
    width: number | undefined
  }>({ width: undefined, height: undefined })

  return (
    <Stack flex={1} py="$5" space="$5" backgroundColor="#333333" ai="center">
      <YStack
        width="100%"
        flex={1}
        space="$5"
        px="$5"
        maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH}
        onLayout={(event) => {
          setContainerDimensions({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
          })
        }}
      >
        <CaseStudyTitle
          title="CareScribe"
          role="Lead React App Engineer"
          time="June 2021 - June 2022"
          color="#ffffff"
        />
        <Stack flex={1}>
          <Image
            src={bbcMaestroStoreMockup}
            aspectRatio={1000 / 709}
            width={(containerDimensions.width || 1) * 0.9}
            maxWidth="100%"
            maxHeight={500}
            resizeMode="stretch"
            alignSelf="center"
          />
        </Stack>
        <Text color="$gray5Light" fontFamily="roboto" fontSize={22}>
          CareScribe is fast becoming the UK's leading provider of accessibility software, and is
          drastically leveling the playing field for students with accessibility needs. Caption.Ed,
          now their flagship product, provides students the ability to live-transcribe zoom
          meetings, in-person lectures and other media into an live-rolling and editable transcript.
          Users can record a series of different notes to help then study and revisit key moments.
        </Text>
        <Text color="$gray5Light" fontFamily="roboto" fontSize={22}>
          As the lead, and sole engineer for the majority of the project, I was brought onto the
          team to own and lead development of the company's flagship product. Working with the CTO,
          Tech Director, UX team, & designer, I planned and undertook a complete green-field
          refactor of their existing product, creating a robust and scalable base for the future,
          whilst creating a catelogue of competition crushing features.
        </Text>
        <Text color="$gray5Light" fontFamily="roboto" fontSize={22}>
          As the project reached maturity, and the company acquired perminant engineer staff, I
          worked with the new Lead Engineer to complete the product, add robust automated testing,
          and release the product to market.
        </Text>
        <Stack flexShrink={1} pb="$5" alignItems="flex-start">
          <Button flex={0} backgroundColor="#53a9ae" color="#ffffff" size="$5">
            Find out about Caption.Ed
          </Button>
        </Stack>
      </YStack>
    </Stack>
  )
}

export default CarescribeCaseStudy
