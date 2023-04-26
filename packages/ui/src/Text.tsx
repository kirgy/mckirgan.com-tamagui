import { styled, Text as TamaguiText } from 'tamagui'

const Text = styled(TamaguiText, {
  name: 'Text',
  fontFamily: '$body',
  fontSize: '$8',
  lineHeight: '$8',
  marginTop: '$8',
  fontWeight: '$1',

  variants: {
    variant: {
      body: {},
      bodySM: {
        lineHeight: '$4',
        fontSize: '$4',
        marginTop: '$4',
      },
      heading1: {
        fontFamily: '$heading',
        fontSize: '$10',
        lineHeight: '$10',
        marginTop: '$10',
      },
      heading2: {
        fontFamily: '$heading',
        fontSize: '$9',
        lineHeight: '$9',
        marginTop: '$9',
      },
      heading3: {
        fontFamily: '$heading',
        fontSize: '$8',
        lineHeight: '$8',
        marginTop: '$8',
      },
    },
  } as const,
})

export default Text
