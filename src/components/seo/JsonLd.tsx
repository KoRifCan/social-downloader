import Script from 'next/script'

interface JsonLdProps {
  schema?: Record<string, unknown>
  data?: Record<string, unknown>
}

export function JsonLd({ schema, data }: JsonLdProps) {
  const content = schema || data
  if (!content) return null
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }}
    />
  )
}
