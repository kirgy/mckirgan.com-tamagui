import { Button, XStack } from '@my/ui/src'
import { Facebook, Linkedin, Twitter } from '@tamagui/lucide-icons'
import { useCallback } from 'react'
import { Linking } from 'react-native'

type ShareProps = {
  shareURL: string
  shareText: string
}

type SocialMediaType = 'facebook' | 'twitter' | 'linkedin'

const getTwitterLink = (url: string, text: string): string => {
  return `https://twitter.com/intent/tweet?url=${url}&text=${text}`
}
const getFacebookLink = (url: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`
}
const getLinkedInLink = (url: string, text: string): string => {
  return `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`
}

const getSocialMediaLinkByNetwork = (
  type: SocialMediaType,
  shareURL: string,
  shareText: string
) => {
  const shareURLEncoded = encodeURIComponent(shareURL)
  const shareTextEncoded = encodeURIComponent(shareText)

  switch (type) {
    case 'facebook':
      return getFacebookLink(shareURLEncoded)
    case 'twitter':
      return getTwitterLink(shareURLEncoded, shareTextEncoded)
    case 'linkedin':
      return getLinkedInLink(shareURLEncoded, shareTextEncoded)
  }

  const _exhaustiveCheck: never = type
  return _exhaustiveCheck
}

const Share = ({ shareURL, shareText }: ShareProps) => {
  const handleShare = useCallback(async (type: SocialMediaType) => {
    const shareLink = getSocialMediaLinkByNetwork(type, shareURL, shareText)
    await Linking.openURL(shareLink)
  }, [])

  return (
    <XStack space="$2">
      <Button icon={Linkedin} size="$3" onPress={() => handleShare('linkedin')} />
      <Button icon={Twitter} size="$3" onPress={() => handleShare('twitter')} />
      <Button icon={Facebook} size="$3" onPress={() => handleShare('facebook')} />
    </XStack>
  )
}

export default Share
