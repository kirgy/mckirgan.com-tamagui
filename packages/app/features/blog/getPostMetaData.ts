import * as fs from 'fs'
// import matter from 'gray-matter'
// import * as FileSystem from 'expo-file-system'

type PostMetadata = {
  title: string
  image: string
  publishedDate: Date
  articleReadTimeMinutes: number
  slug: string
}

const getPostMetaData = async (): Promise<PostMetadata[]> => {
  const folder = 'posts/'
  const files = fs.readdirSync(folder)
  // const files = await FileSystem.readDirectoryAsync(folder)

  const markdownPosts = files.filter((file) => file.endsWith('.md'))
  console.log({ markdownPosts })

  const postmeta = markdownPosts.map(async (fileName) => {
    const fileContents = fs.readFileSync(`./articles/${fileName}`, 'utf8')
    // const fileContents = await FileSystem.readAsStringAsync(`./articles/${fileName}`, 'utf8')
    // const matterResult = matter(fileContents)
    return {
      title: 'test', //matterResult.data.title,
      image: 'testimage', //matterResult.data.image,
      publishedDate: new Date('2023-04-10T21:41:38.400Z'),
      articleReadTimeMinutes: 8,
      slug: fileName.replace('.md', ''),
    }
  })

  console.log({ postmeta })

  return await Promise.all(postmeta)
}

export default getPostMetaData
