import { H1, H2, Stack } from '@my/ui/src'

type CaseStudyTitleProps = {
  title: string
  role: string
  time: string
  color?: string
}

const CaseStudyTitle = ({ title, role, time, color }: CaseStudyTitleProps) => {
  return (
    <Stack>
      <H1 color={color}>{title}</H1>
      <H2 size="$1" opacity={0.7} color={color}>
        {role}
      </H2>
      <H2 size="$1" opacity={0.7} color={color}>
        {time}
      </H2>
    </Stack>
  )
}

export default CaseStudyTitle
