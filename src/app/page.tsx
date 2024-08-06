import { Image } from 'primereact/image'

export default function Home() {
  return (
    <div>
      <Image src="/home3.jpg" alt="Myself" imageClassName="h-svh w-screen object-cover object-[25%]" />

      <h1 className="bg-red-200 text-center header-item scroll-mt-[8%]" id="first" style={{ height: 400 }}>
        First
      </h1>
      <h1 className="bg-green-200 h-96 text-center header-item scroll-mt-[8%]" id="second" style={{ height: 250 }}>
        Second
      </h1>
      <h1 className="bg-blue-200 h-96 text-center header-item scroll-mt-[8%]" id="third" style={{ height: 100 }}>
        Third
      </h1>
      <h1 className="bg-yellow-200 h-96 text-center header-item scroll-mt-[8%]" id="fourth" style={{ height: 900 }}>
        Fourth
      </h1>
    </div>
  )
}
