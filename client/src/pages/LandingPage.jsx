import Hero from '../components/Home/Hero'
import OfferCarousel from '../components/Home/OfferCarousel'
import Use from '../components/Home/Use'

export default function LandingPage() {
    return (
        <div className='w-screen'>
            <Hero />
            <Use />
            <OfferCarousel />
        </div>
    )
}