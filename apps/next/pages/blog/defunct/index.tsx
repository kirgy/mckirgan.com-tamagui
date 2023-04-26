import { Text } from '@my/ui/src'
import BlogEntry from 'app/features/blog/BlogEntry'
import Markdown from 'react-native-markdown-display'
import article from './article.md'
// const article = require('./article.md')

const DesignTokensWhyYouNeedThemToday = () => {
  return (
    <BlogEntry
      url="https://example.com/something"
      title="Design Tokens: Why you need them today"
      image={require('./banner.png')}
      publishedDate={new Date('2023-04-10T21:41:38.400Z')}
      articleReadTimeMinutes={8}
    >
      <Markdown>{article}</Markdown>
    </BlogEntry>
  )
}

export default DesignTokensWhyYouNeedThemToday
