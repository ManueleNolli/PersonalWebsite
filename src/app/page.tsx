import { Image } from 'primereact/image'
import Link from 'next/link'
import ParticlesBackground from '@/app/components/particles/particlesBackground'

export default function Home() {
  return (
    <div>
      <div id="Home" className="header-item" header-label="Home">
        <Image src="/home.jpg" alt="Myself" imageClassName="h-svh w-screen object-cover object-[25%]" />
        <div className="absolute top-[40%] left-[60%] md:top-[60%] md:left-0 md:right-0 text-center">
          <h1 className="text-black text-8xl font-bold leading-relaxed md:text-6xl font-mono text-primary-900">Manuele Nolli</h1>
          <h2 className="text-black text-6xl md:text-4xl font-mono text-primary-900">Software Engineer</h2>
        </div>
        <Link href={'#first'}>
          <Image src="/arrow.png" alt="Scroll down" imageClassName="w-16 absolute animate-bounce bottom-10 mr-auto ml-auto left-0 right-0" />
        </Link>
      </div>

      <div className="bg-surface-900 text-center header-item scroll-mt-[8%]" id="first" header-label="LFirst">
        <h1 className="text-4xl">First</h1>
      </div>
      <h1 className="bg-green-200 h-96 text-center header-item scroll-mt-[8%]" id="second" style={{ height: 250 }} header-label="LSecond">
        Second
      </h1>
      <h1 className="bg-blue-200 h-96 text-center header-item scroll-mt-[8%]" id="third" style={{ height: 100 }} header-label="LThird">
        Third
      </h1>
      <h1 className="bg-yellow-200 h-96 text-center header-item scroll-mt-[8%]" id="fourth" style={{ height: 900 }} header-label="LFourth">
        Fourth
      </h1>
      <a href="https://www.flaticon.com/free-icons/south-arrow" title="south-arrow icons">
        South-arrow icons created by Mohamed Mbarki - Flaticon
      </a>
      <div className="h-96">
        <ParticlesBackground>
          <h1>Particles</h1>
        </ParticlesBackground>
      </div>
    </div>
  )
}
