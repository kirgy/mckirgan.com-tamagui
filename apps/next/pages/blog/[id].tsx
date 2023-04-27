import matter from 'gray-matter'
import getPostMetaData from 'app/features/blog/getPostMetaData'
import path from 'path'
import fs from 'fs'
import { GetStaticProps, Metadata, ResolvingMetadata } from 'next'
import BlogEntry from 'app/features/blog/BlogEntry'
import SocialMeta, { OGType } from 'app/features/app/SocialMeta'
import ReactMarkdown from 'react-markdown'
import { blogComponents } from '@my/ui/src'
import CONSTANTS from 'app/lib/constants'

export const generateStaticParams = async () => {
  const posts = await getPostMetaData()
  return posts.map((post) => ({
    slug: post.title,
  }))
}

const BlogArticle = (props: any) => {
  const matterResult = matter(props.articleMarkdown)
  const postURL = `${CONSTANTS.DOMAIN_URL}/blog/${props.slug}`
  const parsedDate = new Date(matterResult.data.publishedDate)
  return (
    <BlogEntry
      url={postURL}
      title={matterResult.data.title}
      image={matterResult.data.imageBanner}
      publishedDate={matterResult.data.publishedDate}
      articleReadTimeMinutes={5}
      social={{
        text: matterResult.data.socialText,
      }}
    >
      <SocialMeta
        type={OGType.article}
        title={matterResult.data.title}
        description={matterResult.data.metaDescription}
        url={postURL}
        publishedDate={parsedDate}
        image={{
          facebook: `${CONSTANTS.DOMAIN_URL}${matterResult.data.metaImageFacebook}`,
          twitter: `${CONSTANTS.DOMAIN_URL}${matterResult.data.metaImageTwitter}`,
        }}
      />
      <ReactMarkdown components={blogComponents}>{matterResult.content}</ReactMarkdown>
    </BlogEntry>
  )
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent?: ResolvingMetadata
// ): Promise<Metadata> {
//   const previousImages = (await parent)?.openGraph?.images || []

//   const postsDirectory = path.join(process.cwd(), '../../packages/app/features/blog/articles/')
//   const filePath = path.join(postsDirectory, `${params.id}/article.md`)
//   const imagePaths = {
//     facebook: `/blog/social/${params.id}/facebook.png`,
//   }

//   const fileContents = fs.readFileSync(filePath, 'utf8')
//   const matterResult = matter(fileContents)

//   return {
//     title: matterResult.data.title,
//     openGraph: {
//       images: [imagePaths.facebook, ...previousImages],
//     },
//   }
// }

export async function generateMetadata() {
  return { title: 'client-metadata' }
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), '../../packages/app/features/blog/articles/')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename, index) => {
    return { params: { id: filename } }
  })

  return {
    paths: posts,
    fallback: false,
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

    const fileContents = fs.readFileSync(filePath, 'utf8')

    return {
      slug: filename,
      articleMarkdown: fileContents,
    }
  })

  return {
    props: posts.find((post) => post.slug === params.id),
  }
}

export default BlogArticle
