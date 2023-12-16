import { YStack, Stack, styled, Square } from '@my/ui'
import WebContainer from 'app/features/app/WebContainer'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  useWindowDimensions,
  ScrollView as RNScrollView,
  type LayoutChangeEvent,
} from 'react-native'
import HomeProfile from 'app/features/home/HomeProfile'
import { BBCMaestroCaseStudy } from 'app/features/home/caseStudies/bbcMaestro/BBCMaestroCaseStudy'
import CarescribeCaseStudy from 'app/features/home/caseStudies/carescribe/CarescribeCaseStudy'
import { JanssenCaseStudy } from 'app/features/home/caseStudies/janssen/JanssenCaseStudy'
import { HargreavesLansdownCaseStudy } from 'app/features/home/caseStudies/hargreaveslansdown/HargreavesLansdownCaseStudy'
import { SalveCaseStudy } from 'app/features/home/caseStudies/salve/SalveCaseStudy'

const logoSalve = '/home/assets/logos/salve.png'
const logoBBCMaestro = '/home/assets/logos/bbcmaestro.png'
const logoJanssen = '/home/assets/logos/janssenoncology.jpg'
const logoCarescribe = '/home/assets/logos/carescribe.jpeg'
const logoHL = '/home/assets/logos/hargreaveslansdown.jpg'

export type WorkExcerpts = Array<{
  company: string
  text: string
  image: string
  imageRatio: number
}>

const WORK_EXCERPTS: WorkExcerpts = [
  {
    company: 'SALVE',
    text: 'I helped patients through the journey of infertility treatment.',
    image: logoSalve,
    imageRatio: 1,
  },
  {
    company: 'BBCMAESTRO',
    text: 'I put the worlds experts at your fingertips.',
    image: logoBBCMaestro,
    imageRatio: 1,
  },
  {
    company: 'CARESCIBE',
    text: 'I leveled the playing field for disadvantaged students.',
    image: logoCarescribe,
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

export function HomeScreen() {
  const [containerDimensions, setContainerDimensions] = useState({ height: 0, width: 0 })
  const [headerDimensions, setHeaderDimensions] = useState({ height: 0, width: 0 })
  const [activeWorkExcerptIndex, setActiveWorkExcerptIndex] = useState(0)
  const [showExcerptImage, setShowExcerptImage] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const scrollViewRef = useRef<RNScrollView>(null)

  const [{ windowHeight, windowWidth }, setWindowDimensions] = useState({
    windowHeight: 0,
    windowWidth: 0,
  })

  /**
   * array of scroll-to positions of case studies, indexed by index
   */
  const [caseStudyPositions, setCaseStudyPositions] = useState<Record<number, number>>({})

  // this is initially set server-side which will result in 0 values on first render
  const unsafeDimensions = useWindowDimensions()

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  useEffect(() => {
    if (!pageLoaded) return

    setWindowDimensions({
      windowWidth: unsafeDimensions.width,
      windowHeight: unsafeDimensions.height,
    })
  }, [pageLoaded, unsafeDimensions])

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

  const handleScrollToCaseStudy = useCallback(
    (index: number) => {
      console.log({ caseStudyPositions: caseStudyPositions[index] })
      scrollViewRef.current?.scrollTo({
        y: (caseStudyPositions[index] ?? 0) - headerDimensions.height,
        animated: true,
      })
    },
    [scrollViewRef, windowHeight, caseStudyPositions, headerDimensions]
  )

  const setCaseStudyLayout = useCallback(
    (event: LayoutChangeEvent, index: number) => {
      const layout = event.nativeEvent.layout
      caseStudyPositions[index] = layout.y

      setCaseStudyPositions({
        ...caseStudyPositions,
      })
    },
    [caseStudyPositions]
  )

  return (
    <WebContainer
      onLayout={(event) => {
        setContainerDimensions({
          height: event.nativeEvent.layout.height,
          width: event.nativeEvent.layout.width,
        })
      }}
      onHeaderLayout={(height, width) => {
        setHeaderDimensions({
          height,
          width,
        })
      }}
      scrollViewRef={scrollViewRef}
      headerProps={{
        px: '$5',
      }}
      transparentUntilScroll={true}
      maxWidth={windowWidth}
      overflow="hidden"
      innerContainer={{
        width: '100%',
        px: 0,
        flex: 0,
      }}
      px={0}
    >
      <YStack space={0}>
        <YStack space={0} minHeight={windowHeight} overflow="hidden">
          <HomeProfile
            workExcerpts={WORK_EXCERPTS}
            handleScrollToCaseStudy={handleScrollToCaseStudy}
          />
        </YStack>

        <Stack minHeight={windowHeight} flex={1} onLayout={(event) => setCaseStudyLayout(event, 0)}>
          <SalveCaseStudy />
        </Stack>
        <Stack minHeight={windowHeight} flex={1} onLayout={(event) => setCaseStudyLayout(event, 1)}>
          <BBCMaestroCaseStudy />
        </Stack>
        <Stack minHeight={windowHeight} onLayout={(event) => setCaseStudyLayout(event, 2)}>
          <CarescribeCaseStudy />
        </Stack>
        <Stack minHeight={windowHeight} onLayout={(event) => setCaseStudyLayout(event, 3)}>
          <JanssenCaseStudy />
        </Stack>
        <Stack minHeight={windowHeight} onLayout={(event) => setCaseStudyLayout(event, 4)}>
          <HargreavesLansdownCaseStudy />
        </Stack>
      </YStack>
    </WebContainer>
  )
}
