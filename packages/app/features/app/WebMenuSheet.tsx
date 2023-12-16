import {
  Button,
  ListItem,
  Paragraph,
  Separator,
  Sheet,
  useMedia,
  XGroup,
  XStack,
  YGroup,
  YStack,
} from '@my/ui/src'
import { Book, ChevronRight, Home, Mail } from '@tamagui/lucide-icons'
import SiteFooter from 'app/features/app/SiteFooter/SiteFooter'
import CONSTANTS from 'app/lib/constants'
import { useState } from 'react'
import { Link, useLink } from 'solito/link'

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
    href: CONSTANTS.SOCIAL.TWITTER,
  })

  return (
    <Sheet
      forceRemoveScrollEnabled={menuOpen}
      modal={true}
      open={menuOpen}
      onOpenChange={setMenuOpen}
      snapPoints={[90]}
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
            <Button flex={1} {...linkHomeProps} onPress={() => setMenuOpen(false)}>
              <XStack space="$2.5" alignItems="center">
                <Home size={15} />
                <Paragraph>Home</Paragraph>
              </XStack>
            </Button>

            <Button flex={1} {...linkBlogProps} onPress={() => setMenuOpen(false)}>
              <XStack space="$2.5" alignItems="center">
                <Book size={15} />
                <Paragraph>Blog</Paragraph>
              </XStack>
            </Button>

            <Button flex={1} {...linkContactProps} onPress={() => setMenuOpen(false)}>
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
                  <Link href={`/blog/design-tokens-why-you-need-them-today`}>
                    <ListItem
                      hoverTheme
                      pressTheme
                      title="Design tokens: why you need them today"
                      subTitle="8 minute read"
                      icon={Book}
                      iconAfter={ChevronRight}
                      onPress={() => setMenuOpen(false)}
                    />
                  </Link>
                </YGroup.Item>
                <YGroup.Item>
                  <Link href={`/blog/the-matrix-exploited`}>
                    <ListItem
                      hoverTheme
                      pressTheme
                      title="The Matrix, Exploited"
                      subTitle="11 minute read"
                      icon={Book}
                      iconAfter={ChevronRight}
                      onPress={() => setMenuOpen(false)}
                    />
                  </Link>
                </YGroup.Item>
                <YGroup.Item>
                  <Link href={`/blog/type-script-test-driven-development`}>
                    <ListItem
                      hoverTheme
                      pressTheme
                      title="TypeScript Test Driven Development"
                      subTitle="4 minute read"
                      icon={Book}
                      iconAfter={ChevronRight}
                      onPress={() => setMenuOpen(false)}
                    />
                  </Link>
                </YGroup.Item>
              </YGroup>
            </YGroup.Item>
          </YGroup>

          <Separator />

          <SiteFooter />
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}

export default WebMenuSheet
