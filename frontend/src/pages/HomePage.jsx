import HeroSection        from '../components/home/HeroSection'
import StatsBar           from '../components/home/StatsBar'
import WhoWeAreSection    from '../components/home/WhoWeAreSection'
import VisionMissionSection from '../components/home/VisionMissionSection'
import ExpertiseSection   from '../components/home/ExpertiseSection'
import ClientsSection     from '../components/home/ClientsSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <WhoWeAreSection />
      <VisionMissionSection />
      <ExpertiseSection />
      <ClientsSection />
    </>
  )
}