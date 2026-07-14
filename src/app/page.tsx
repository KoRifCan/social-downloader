import { HeroSection } from '@/components/home/HeroSection'
import { UrlInput } from '@/components/home/UrlInput'
import { PlatformBadges } from '@/components/home/PlatformBadges'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { Testimonials } from '@/components/home/Testimonials'
import { StatsCounter } from '@/components/home/StatsCounter'
import { CTASection } from '@/components/home/CTASection'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { webAppSchema, organizationSchema } from '@/lib/schema'

export default function HomePage() {
  return (
    <>
      <JsonLd data={webAppSchema()} />
      <JsonLd data={organizationSchema()} />
      <Navbar />
      <main>
        <HeroSection />
        <UrlInput />
        <PlatformBadges />
        <FeaturesSection />
        <Testimonials />
        <StatsCounter />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
