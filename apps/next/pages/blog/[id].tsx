import matter from 'gray-matter'
import getPostMetaData from 'app/features/blog/getPostMetaData'
import path from 'path'
import fs from 'fs'
import { GetStaticProps } from 'next'
import BlogEntry from 'app/features/blog/BlogEntry'
import ReactMarkdown from 'react-markdown'
import { blogComponents } from '@my/ui/src'

export const generateStaticParams = async () => {
  const posts = await getPostMetaData()
  return posts.map((post) => ({
    slug: post.title,
  }))
}

const BlogArticle = (props: any) => {
  const matterResult = matter(props.articleMarkdown)

  return (
    <BlogEntry
      url={`/blog/${props.slug}`}
      title={matterResult.data.title}
      image={props.banner}
      publishedDate={matterResult.data.publishedDate}
      articleReadTimeMinutes={5}
      social={{
        text: matterResult.data.socialText,
      }}
    >
      <ReactMarkdown components={blogComponents}>{matterResult.content}</ReactMarkdown>
    </BlogEntry>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), '../../packages/app/features/blog/articles/')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map(async (filename, index) => {
    return { params: { id: index } }
  })
  console.log({ posts })
  return {
    paths: [{ params: { id: 'design-tokens-why-you-need-them-today' } }],
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{
  filename: string
  articalMarkdown: string
}> = async ({ params }) => {
  const postsDirectory = path.join(process.cwd(), '../../packages/app/features/blog/articles/')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, `${filename}/article.md`)
    const imagePath = path.join(postsDirectory, `${filename}/banner.png`)

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const imageContents = fs.readFileSync(imagePath, 'utf8')

    return {
      slug: filename,
      banner: imageContents,
      articleMarkdown: fileContents,
    }
  })

  return {
    props: posts.find((post) => post.slug === params.id),
  }
}

export default BlogArticle
