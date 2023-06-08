import Text from './Text'

const blogComponents = {
  p: ({ children, ...props }) => {
    return (
      <Text {...props} variant="bodySM">
        {children}
      </Text>
    )
  },
  h1: ({ children, ...props }) => {
    return (
      <Text {...props} variant="heading1">
        {children}
      </Text>
    )
  },
  h2: ({ children, ...props }) => {
    return (
      <Text {...props} variant="heading2">
        {children}
      </Text>
    )
  },
  h3: ({ children, ...props }) => {
    return (
      <Text {...props} variant="heading3">
        {children}
      </Text>
    )
  },
}

export default blogComponents
