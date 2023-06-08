import { ListItem, Paragraph, Separator, Text, XGroup, YStack } from '@my/ui/src'
import { Github, Linkedin, Twitter } from '@tamagui/lucide-icons'
import CONSTANTS from 'app/lib/constants'
import { useCallback } from 'react'
import { Linking, Pressable } from 'react-native'

type SocialType = 'linkedin' | 'twitter' | 'github'

const getSocialLink = (type: SocialType) => {
  switch (type) {
    case 'linkedin':
      return CONSTANTS.SOCIAL.LINKEDIN
    case 'twitter':
      return CONSTANTS.SOCIAL.TWITTER
    case 'github':
      return CONSTANTS.SOCIAL.GITHUB
  }

  const _exhaustiveCheck: never = type
  return _exhaustiveCheck
}

const SiteFooter = () => {
  const handleSocialPress = useCallback(async (type: SocialType) => {
    await Linking.openURL(getSocialLink(type))
  }, [])

  return (
    <YStack flex={1} space="$5">
      <YStack>
        <Paragraph color="$gray9" fontSize="$1" textAlign="center">
          Let's connect
        </Paragraph>
        <XGroup als="center" separator={<Separator />}>
          <XGroup.Item>
            <ListItem
              fontSize="$1"
              flex={1}
              hoverTheme
              pressTheme
              textAlign="left"
              onPress={() => handleSocialPress('linkedin')}
            >
              <Linkedin size={15} />
            </ListItem>
          </XGroup.Item>
          <XGroup.Item>
            <ListItem
              fontSize="$1"
              flex={1}
              hoverTheme
              pressTheme
              textAlign="left"
              onPress={() => handleSocialPress('twitter')}
            >
              <Twitter size={15} />
            </ListItem>
          </XGroup.Item>
          <XGroup.Item>
            <Pressable>
              <ListItem
                fontSize="$1"
                flex={1}
                hoverTheme
                pressTheme
                textAlign="left"
                accessibilityLabel="github"
                onPress={() => handleSocialPress('github')}
              >
                <Github size={15} />
              </ListItem>
            </Pressable>
          </XGroup.Item>
        </XGroup>
      </YStack>
      <Separator />

      <Paragraph color="$gray9" fontSize="$1" textAlign="center">
        Designed, coded & copyright NybbleMouse Limited, copyright 2023. Company number: 09769539
      </Paragraph>
    </YStack>
  )
}

export default SiteFooter
