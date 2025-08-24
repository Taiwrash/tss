import { Helmet } from 'react-helmet-async'

interface MetaTagsProps {
  title: string
  description: string
  image?: string
  type?: string
  url?: string
}

export function MetaTags({ 
  title, 
  description, 
  image = "https://avatars.githubusercontent.com/u/49725691?v=4",
  type = "website",
  url = "https://taiwrash.codes"
}: MetaTagsProps) {
  return (
    <Helmet>
      <title>{`${title} | Taiwrash`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@taiwrash" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}