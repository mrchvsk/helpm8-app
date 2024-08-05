import Hero from '../components/Home/Hero'
import OfferCarousel from '../components/Home/OfferCarousel'
import Use from '../components/Home/Use'

export default function LandingPage() {
    return (
        <div className='w-screen bg-base-200'>
            <Hero />
            <Use />
            <OfferCarousel />
        </div>
    )
}