import { Image } from 'primereact/image'
import Link from 'next/link'
import ParticlesBackground from '@/app/components/particles/particlesBackground'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { parallaxParticles } from '@/app/constants/parallaxParticles'
import React from 'react'
import PolygonMaskParticles from '@/app/components/particles/polygonMaskParticles'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'
import AnimatedText from '@/app/components/animatedText/animatedText'
import HorizontalScroll from '@/app/components/horizontalScroll/horizontalScroll'

export default function Home() {
  const renderHome = () => {
    return (
      <div id="Home" className="header-item" header-label="Home">
        <Image src="/home.jpg" alt="Myself" imageClassName="h-svh w-screen object-cover object-[25%]" />
        <div className="absolute top-[40%] left-[60%] md:top-[60%] md:left-0 md:right-0 text-center">
          <AnimatedText className="text-6xl font-bold leading-relaxed md:text-4xl font-mono text-primary-900">Manuele Nolli</AnimatedText>
          <AnimatedText className="text-4xl md:text-2xl font-mono text-primary-900">Software Engineer</AnimatedText>
        </div>
        <Link href={'#aboutme'}>
          <Image src="/arrow.png" alt="Scroll down" imageClassName="w-16 md:w-8 absolute animate-bounce bottom-10 mr-auto ml-auto left-0 right-0" />
        </Link>
      </div>
    )
  }

  const renderAboutMe = () => {
    return (
      <div
        className="header-item bg-surface-900 scroll-mt-[8%] text-primary-50 flex flex-row md:flex-col min-h-svh"
        id="aboutme"
        header-label="About Me"
      >
        <div className="w-1/2 flex items-center justify-center flex-col md:w-full md:mt-8">
          <AnimatedOnScroll className="text-5xl mb-6 font-bold md:text-3xl">About Me</AnimatedOnScroll>
          <AnimatedOnScroll className="text-2xl w-3/4 text-justify leading-relaxed md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel porttitor mauris. Donec mollis massa a libero mattis consequat.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et massa quis nibh venenatis porta.
            Curabitur vulputate urna ac ex maximus, vel placerat tortor rhoncus. Phasellus tincidunt nulla nec fringilla lacinia. Aliquam scelerisque
            molestie arcu nec pellentesque.
          </AnimatedOnScroll>
        </div>
        <div className="w-1/2 md:w-full md:h-[50vh] md:px-8">
          <PolygonMaskParticles url={'coding.svg'} id="particlesAboutMe" />
        </div>
      </div>
    )
  }

  const renderExperience = () => {
    return (
      <HorizontalScroll>
        <div className="bg-red-500 p-16 flex justify-center">
          <AnimatedOnScroll className="text-5xl mb-6 font-bold">Experience</AnimatedOnScroll>
        </div>
        <div className="bg-blue-500" />
        <div className="bg-yellow-500" />
      </HorizontalScroll>
    )
  }

  const renderContactMe = () => {
    return (
      <div className="header-item" header-label="Contact Me" id="contactme">
        <ParticlesBackground options={parallaxParticles} id="particlesContactMe">
          <div className="py-24 opacity-90">
            <div className="grid grid-cols-2 md:grid-cols-1 p-8 mx-auto max-w-[50%] md:max-w-[90%] bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
              <div className={'flex flex-col justify-between '}>
                <div>
                  <h1 className="text-gray-800 text-6xl md:text-4xl md:text-center font-extrabold">Contact me!</h1>
                  <p className="text-gray-500 mt-4 text-xl md:text-justify">
                    Would you like to ask me something or just say hello? Feel free to send me a message, I will be happy to answer you.
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="text-gray-800 text-xl font-bold">Email</h2>
                  <ul className="mt-4">
                    <li className="flex items-center md:flex-col md:space-y-4">
                      <div className="bg-[#e6e6e6cf] h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-700)" viewBox="0 0 479.058 479.058">
                          <path
                            d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                            data-original="#000000"
                          />
                        </svg>
                      </div>
                      <a href="aboutme" className="text-primary-800 text-lg ml-4">
                        <strong>manuele.nolli.01@gmail.com</strong>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 ">
                  <h2 className="text-gray-800 text-xl font-bold">Socials</h2>

                  <ul className="flex mt-4 space-x-4">
                    <li className="bg-[#e6e6e6cf] h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                      <a href="aboutme">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-700)" viewBox="0 0 24 24">
                          <path
                            d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z"
                            data-original="#000000"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="bg-[#e6e6e6cf] h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                      <a href="aboutme">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-700)" viewBox="0 0 511 512">
                          <path
                            d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                            data-original="#000000"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="bg-[#e6e6e6cf] h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                      <a href="aboutme">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-700)" viewBox="0 0 24 24">
                          <path d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z"></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <form className="space-y-8 pt-5">
                <FloatLabel>
                  <InputText id="name" className="w-full p-inputtext-lg" />
                  <label htmlFor="name">Name</label>
                </FloatLabel>

                <FloatLabel>
                  <InputText id="email" className="w-full p-inputtext-lg" />
                  <label htmlFor="email">Email</label>
                </FloatLabel>

                <FloatLabel>
                  <InputText id="subject" className="w-full p-inputtext-lg" />
                  <label htmlFor="subject">Subject</label>
                </FloatLabel>

                <FloatLabel>
                  <InputTextarea id="message" rows="6" className="w-full "></InputTextarea>
                  <label htmlFor="message">Message</label>
                </FloatLabel>

                <Button className="text-white bg-primary-700 hover:bg-primary-900 rounded-md text-lg px-4 py-3 w-full !mt-6" size="large">
                  <div className="flex items-center justify-center w-full">Send</div>
                </Button>
              </form>
            </div>
          </div>
        </ParticlesBackground>
      </div>
    )
  }

  return (
    <div>
      {/* HOME */}
      {renderHome()}

      {/* ABOUT ME */}
      {renderAboutMe()}

      {/* EXPERIENCE */}
      {renderExperience()}

      {/* PROJECTS */}
      <h1 className="bg-blue-200 h-96 text-center header-item scroll-mt-[8%]" id="third" style={{ height: 100 }} header-label="LThird">
        Projects
      </h1>

      <a href="https://www.flaticon.com/free-icons/south-arrow" title="south-arrow icons">
        South-arrow icons created by Mohamed Mbarki - Flaticon
      </a>

      {/*CONTACT ME*/}
      {renderContactMe()}
    </div>
  )
}
