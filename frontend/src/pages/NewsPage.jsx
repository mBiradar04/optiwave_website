import NewsHero from '../components/news/NewsHero'
import ComingSoon from '../components/ui/ComingSoon'

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <ComingSoon message="We're preparing this section with the latest news and events from CCSL. Check back soon." />
    </>
  )
}
