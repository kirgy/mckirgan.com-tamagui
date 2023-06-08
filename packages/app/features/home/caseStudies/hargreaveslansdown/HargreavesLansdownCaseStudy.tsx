import { H1, H2, Image, YStack, Text, Stack, XStack, Button } from '@my/ui'
import CaseStudyTitle from 'app/features/home/caseStudies/CaseStudyTitle'
import { useState } from 'react'
import CONSTANTS from '../../../../lib/constants'

const hlMockup = '/home/case-studies/hl-mocked.png'

export function HargreavesLansdownCaseStudy() {
  const [containerDimensions, setContainerDimensions] = useState<{
    height: number | undefined
    width: number | undefined
  }>({ width: undefined, height: undefined })

  return (
    <Stack flex={1} py="$5" space="$5" backgroundColor="#00deb2" ai="center">
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
          title="Hargreaves Lansdown"
          role="PHP Engineer"
          time="May 2019 - March 2021"
          color="#ffffff"
        />

        <XStack flex={1} flexWrap="wrap">
          <Stack flex={1}>
            <Image
              src={hlMockup}
              aspectRatio={0.75}
              width={(containerDimensions.width || 1) * 0.9}
              maxHeight={500}
              resizeMode="contain"
              alignSelf="center"
            />
          </Stack>
          <Stack pt="$5" flex={1}>
            <Text variant="body">
              Hargreaves Lansdown, a FTSE 100 company, is entrusted with £120 billion of UK wealth
              with 1.7 millions clients. They offer a large variety of financial products, from
              stock & shares to pensions and portfolios, there's a reason why they are the number
              one financial institute for private investors.
            </Text>
            <Text variant="body">
              As a senior engineer, I joined HL's Active Savings department, working in complex
              capacity between 2 departments and code infrustructure, my role was to build the
              integration layer between these large & complex systems to enable delivery of HL's new
              Cash ISA product.
            </Text>
            <Text variant="body">
              I owned the technical development of the integration layer, working with both Active
              Savings's wider team, and the general engineering teams. I had to innovate and
              proactively seek out various individuals through this large organisation to overcome
              complex integration challenges, and present them to my agile team to enable business
              to accurate forcast delivery and bring confidence to stakeholders.
            </Text>
          </Stack>
        </XStack>
        <Stack alignItems="flex-start" pb="$5">
          <Button flex={0} backgroundColor="#ffffff" color="#00deb2" size="$5">
            Find out about HL
          </Button>
        </Stack>
      </YStack>
    </Stack>
  )
}
