import React from 'react'
import { ArticleMarkdownData } from 'app/features/blog/articles'
import { Image, Stack, Text, XStack } from '@my/ui'
import { ArrowRight, Book } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

type ArticleCardProps = {
  article: ArticleMarkdownData
  url: string
  tags?: Array<string>
}

const ArticleCard = ({ article, url, tags = [] }: ArticleCardProps) => {
  const link = useLink({
    href: url,
  })

  return (
    <Stack
      flex={1}
      flexGrow={1}
      borderRadius="$5"
      overflow="hidden"
      position="relative"
      onPress={link.onPress}
      animation="bouncy"
      hoverStyle={{
        scale: 1.05,
        cursor: 'pointer',
      }}
      pressStyle={{
        scale: 0.9,
      }}
    >
      <Image
        source={{
          uri: article.imageBanner,
        }}
        height={300}
        resizeMode="cover"
        opacity={0.4}
      />
      <Stack p="$5" position="absolute" top={0} w="100%" zIndex={1}>
        <Text variant="heading2" numberOfLines={2} mt={0} color="white">
          {article.title}
        </Text>
        <Text variant="bodySM" numberOfLines={3} textOverflow="ellipsis">
          {article.metaDescription}
        </Text>
      </Stack>
      <XStack
        p="$5"
        position="absolute"
        bottom={0}
        w="100%"
        zIndex={1}
        backgroundColor="white"
        justifyContent="space-between"
      >
        <XStack gap="$2.5">
          <Book color="black" />
          <Text variant="bodySM" mt={0} color="black">
            {article.articleReadTimeMinutes} minute read
          </Text>
          <XStack space="$5">
            {tags.map((tag) => (
              <Stack backgroundColor="#dddddd" px="$2" borderRadius="$2">
                <Text variant="bodySM" mt={0} color="black">
                  Latest article
                </Text>
              </Stack>
            ))}
          </XStack>
        </XStack>
        <ArrowRight color="black" />
      </XStack>
    </Stack>
  )
}

export default ArticleCard
