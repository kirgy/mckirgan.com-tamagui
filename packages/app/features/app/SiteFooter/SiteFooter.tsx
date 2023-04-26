import { ListItem, Paragraph, Separator, Stack, XGroup, YStack } from '@my/ui/src'
import { Github, Linkedin, Twitter } from '@tamagui/lucide-icons'

const SiteFooter = () => {
  return (
    <YStack flex={1} space="$5">
      <XGroup als="center" separator={<Separator />}>
        <XGroup.Item>
          <ListItem fontSize="$1" flex={1} hoverTheme pressTheme textAlign="left">
            <Linkedin size={15} />
          </ListItem>
        </XGroup.Item>
        <XGroup.Item>
          <ListItem fontSize="$1" flex={1} hoverTheme pressTheme textAlign="left">
            <Twitter size={15} />
          </ListItem>
        </XGroup.Item>
        <XGroup.Item>
          <ListItem
            fontSize="$1"
            flex={1}
            hoverTheme
            pressTheme
            textAlign="left"
            accessibilityLabel="github"
          >
            <Github size={15} />
          </ListItem>
        </XGroup.Item>
      </XGroup>

      <Separator />

      <Paragraph color="$gray9" fontSize="$1" textAlign="center">
        Designed, coded & copyright NybbleMouse Limited, copyright 2023. Company number: 09769539
      </Paragraph>
    </YStack>
  )
}

export default SiteFooter
