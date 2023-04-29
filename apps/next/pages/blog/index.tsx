import React, { useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import path from 'path'
import fs from 'fs'
import { ScrollView, Stack, Text, XStack, YStack } from '@my/ui'
import WebContainer from 'app/features/app/WebContainer'
import typedMatter from 'app/lib/typedMatter'
import { ArticleMarkdownData } from 'app/features/blog/articles.d'
import ArticleCard from 'app/features/blog/ArticleCard/ArticleCard'
import CONSTANTS from 'app/lib/constants'

const getArticles = () => {
  const postsDirectory = path.join(process.cwd(), '../../packages/app/features/blog/articles/')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, `${filename}/article.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    return {
      slug: filename,
      articleMarkdown: fileContents,
    }
  })
}

export const getServerSideProps = async () => {
  const articles = getArticles()
  return {
    props: { articles }, // will be passed to the page component as props
  }
}

type BlogIndexProps = Awaited<ReturnType<typeof getServerSideProps>>['props']

const BlogIndex = ({ articles }: BlogIndexProps) => {
  const [headerDimensions, setHeaderDimensions] = useState<
    { height: number; width: number } | undefined
  >()

  let mappedArticles = articles.map((article) => {
    return {
      ...article,
      articleMarkdown: typedMatter<ArticleMarkdownData>(article.articleMarkdown),
    }
  })

  mappedArticles.push(
    mappedArticles[0],
    mappedArticles[0],
    mappedArticles[0],
    mappedArticles[0],
    mappedArticles[0]
  )

  const leadingArticle = mappedArticles[0]

  mappedArticles.shift()

  return (
    <WebContainer
      maxWidth={undefined}
      px={undefined}
      innerContainer={{
        px: undefined,
      }}
      onHeaderLayout={(height: number, width: number) => {
        setHeaderDimensions({ height, width })
      }}
    >
      <ScrollView>
        <YStack marginTop={headerDimensions?.height ?? 0}>
          <Stack px="$5">
            <Text variant="heading2">All blog posts</Text>
          </Stack>
          <Stack flex={1} alignItems="center">
            <YStack
              flex={1}
              width="100%"
              alignItems="center"
              maxWidth={CONSTANTS.LAYOUT_MAX_WIDTH + 40}
            >
              <Stack w="100%" p="$5">
                <ArticleCard
                  article={leadingArticle.articleMarkdown.data}
                  url={`/blog/${leadingArticle.slug}`}
                  tags={['latest']}
                />
              </Stack>
              <XStack flexWrap="wrap" width="100%" justifyContent="space-between">
                {mappedArticles.map((article) => {
                  return (
                    <Stack
                      flexGrow={0}
                      flexBasis="100%"
                      p="$5"
                      $gtXs={{
                        flexBasis: '50%',
                      }}
                    >
                      <ArticleCard
                        article={article.articleMarkdown.data}
                        url={`/blog/${article.slug}`}
                      />
                    </Stack>
                  )
                })}
              </XStack>
            </YStack>
          </Stack>
        </YStack>
      </ScrollView>
    </WebContainer>
  )
}

export default BlogIndex
