import React from 'react'
import Head from 'next/head'
import { format } from 'date-fns'
import CONSTANTS from 'app/lib/constants'
import { OGType } from './types'


type SocialMetaProps = {
  type: OGType
  title: string
  description: string
  url: string
  publishedDate: Date
  image: {
    facebook: string
    twitter: string
  }
}

const SocialMeta = (metaData: SocialMetaProps) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{metaData.title}</title>
      <meta name="description" content={metaData.description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaData.type} />
      <meta property="og:url" content={metaData.url} />
      <meta property="og:title" content={metaData.title} />
      <meta property="og:description" content={metaData.description} />
      <meta property="og:image" content={metaData.image.facebook} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaData.url} />
      <meta property="twitter:title" content={metaData.title} />
      <meta property="twitter:description" content={metaData.description} />
      <meta property="twitter:image" content={metaData.image.twitter} />

      {/* General */}
      <meta property="og:site_name" content="McKirgan.com - NybbleMouse Limited" />
      <meta name="author" content={CONSTANTS.SOCIAL.TWITTER} />
      <meta
        name="publish_date"
        property="og:publish_date"
        content={`${format(metaData.publishedDate, 'yyyy-MM-dd')}T${format(
          metaData.publishedDate,
          'HH:mm:sszzz'
        )}`}
      />
    </Head>
  )
}

export default SocialMeta
