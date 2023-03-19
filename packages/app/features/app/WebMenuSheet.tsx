import {
  Button,
  H2,
  ListItem,
  Paragraph,
  Separator,
  Sheet,
  Stack,
  useMedia,
  XGroup,
  XStack,
  YGroup,
  YStack,
} from '@my/ui/src'
import {
  Book,
  ChevronRight,
  Github,
  Home,
  Linkedin,
  Mail,
  Star,
  Twitter,
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useLink } from 'solito/link'

type WebMenuSheet = {
  menuOpen: boolean
  setMenuOpen: (isOpen: boolean) => void
}

const WebMenuSheet = ({ menuOpen, setMenuOpen }: WebMenuSheet): JSX.Element => {
  const [position, setPosition] = useState(0)
  const media = useMedia()

  const linkHomeProps = useLink({
    href: '/',
  })
  const linkBlogProps = useLink({
    href: '/blog',
  })
  const linkContactProps = useLink({
    href: '/contact',
  })

  return (
    <Sheet
      forceRemoveScrollEnabled={menuOpen}
      modal={true}
      open={menuOpen}
      onOpenChange={setMenuOpen}
      snapPoints={[90, 23]}
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame f={1} p="$4" jc="flex-start" ai="center" space="$10">
        <YStack px="$4" width="100%" maw={600} space="$5">
          <XGroup als="center" bordered width="100%" space="$1">
            <Button flex={1} {...linkHomeProps}>
              <XStack space="$2.5" alignItems="center">
                <Home size={15} />
                <Paragraph>Home</Paragraph>
              </XStack>
            </Button>

            <Button flex={1} {...linkBlogProps}>
              <XStack space="$2.5" alignItems="center">
                <Book size={15} />
                <Paragraph>Blog</Paragraph>
              </XStack>
            </Button>

            <Button flex={1} {...linkContactProps}>
              <XStack space="$2.5" alignItems="center">
                <Mail size={15} />
                <Paragraph>Contact</Paragraph>
              </XStack>
            </Button>
          </XGroup>

          <Separator />

          <YGroup width="100%" space="$2.5">
            <YGroup.Item>
              <Paragraph fontSize="$4">Read some of my articles</Paragraph>
            </YGroup.Item>
            <YGroup.Item>
              <YGroup als="center" bordered separator={<Separator />} width="100%">
                <YGroup.Item>
                  <ListItem
                    hoverTheme
                    pressTheme
                    title="Star"
                    subTitle="Subtitle"
                    icon={Book}
                    iconAfter={ChevronRight}
                  />
                </YGroup.Item>
                <YGroup.Item>
                  <ListItem
                    hoverTheme
                    pressTheme
                    title="Moon"
                    subTitle="Subtitle"
                    icon={Book}
                    iconAfter={ChevronRight}
                  />
                </YGroup.Item>
              </YGroup>
            </YGroup.Item>
          </YGroup>

          <Separator />

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
            Designed, coded & copyright NybbleMouse Limited, copyright 2023. Company number:
            09769539
          </Paragraph>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}

export default WebMenuSheet
