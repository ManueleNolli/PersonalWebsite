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
import GithubRepositories from '@/app/components/githubRepositories/githubRepositories'
import Journeys from '@/app/components/journeys/journeys'
import { config } from '@/app/constants/config'
import Dialog from '@/app/components/dialag/dialong'

export default function Home() {
  const {
    home_name,
    home_job,
    aboutme_description,
    contact_phrase,
    contact_mail,
    contact_linkedin,
    contact_github,
    contact_instagram,
    attributions,
  } = config

  const renderHome = () => {
    return (
      <div>
        <Image src="/assets/home.jpg" alt="Myself" imageClassName="h-svh w-screen object-cover object-[25%]" />
        <div className="absolute md:top-[40%] md:left-[40%] top-[60%] left-0 right-0 text-center">
          <AnimatedText className=" font-bold leading-relaxed md:text-6xl text-4xl text-primary-650">{home_name}</AnimatedText>
          <AnimatedText className="md:text-4xl text-2xl text-primary-600">{home_job}</AnimatedText>
        </div>
        <Link href={'#aboutme'}>
          <Image src="/assets/arrow.png" alt="Scroll down" imageClassName="md:w-16 w-8 absolute animate-bounce bottom-10 mr-auto ml-auto left-0 right-0" />
        </Link>
      </div>
    )
  }

  const renderAboutMe = () => {
    return (
      <div className="header-item scroll-mt-[8%] text-primary-50 flex md:flex-row flex-col min-h-svh" id="aboutme" header-label="About Me">
        <div className="flex items-center justify-center flex-col w-full md:w-1/2 mt-8 md:mt-0">
          <AnimatedOnScroll className=" mb-6 font-bold text-3xl md:text-5xl">About Me</AnimatedOnScroll>
          <AnimatedOnScroll className=" w-3/4 text-center md:text-justify leading-loose text-lg md:text-2xl ">{aboutme_description}</AnimatedOnScroll>
        </div>
        <div className="md:w-1/2 w-full h-[50vh] md:h-screen px-8 md:px-0">
          <PolygonMaskParticles url={'/assets/coding.svg'} id="particlesAboutMe" />
        </div>
      </div>
    )
  }

  const renderJourney = () => {
    return (
      <div className="header-item scroll-mt-[8%]" header-label="Journey" id="journey">
        <Journeys />
      </div>
    )
  }

  const renderProjects = () => {
    return (
      <div className="header-item scroll-mt-[8%]" header-label="Projects" id="projects">
        <div className=" p-16 flex justify-center text-primary-50 ">
          <AnimatedOnScroll className="text-5xl mb-6 font-bold">Projects</AnimatedOnScroll>
        </div>
        <div className={'pb-16'}>
          <GithubRepositories />
        </div>
      </div>
    )
  }

  const renderContactMe = () => {
    return (
      <div className="header-item scroll-mt-[8%]" header-label="Contact Me" id="contactme">
        <ParticlesBackground options={parallaxParticles} id="particlesContactMe">
          <div className="py-24 opacity-90">
            <div className="grid md:grid-cols-2 grid-cols-1 p-8 mx-auto md:max-w-[70%] max-w-[90%] bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
              <div className={'flex flex-col justify-between mr-4'}>
                <div>
                  <h1 className="text-primary-800 text-3xl md:text-5xl text-center md:text-left font-extrabold">Contact me!</h1>
                  <p className="text-gray-500 mt-4 text-xl text-justify md:text-left">{contact_phrase}</p>
                </div>

                <div className="mt-12">
                  <h2 className="text-primary-800 text-xl font-bold">Email</h2>
                  <ul className="mt-4">
                    <li className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0">
                      <div className="bg-primary-50 h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                        <a href={`mailto:${contact_mail}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-800)" viewBox="0 0 32 32">
                            <path d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM30 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23z" />
                          </svg>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 ">
                  <h2 className="text-gray-800 text-xl font-bold">Socials</h2>
                  <ul className="flex mt-4 space-x-4">
                    <li className="bg-primary-50 h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                      {/*GITHUB*/}
                      <a href={contact_github} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-800)" viewBox="0 0 24 24">
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            data-original="#000000"
                          />
                        </svg>
                      </a>
                    </li>
                    {/*LINKEDIN*/}
                    <li className="bg-primary-50 h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                      <a href={contact_linkedin} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-800)" viewBox="0 0 24 24">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </a>
                    </li>
                    <li className="bg-primary-50 h-16 w-16 rounded-full flex items-center justify-center shrink-0">
                      <a href={contact_instagram} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-800)" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
                  <InputTextarea id="message" rows={6} className="w-full "></InputTextarea>
                  <label htmlFor="message">Message</label>
                </FloatLabel>

                <Button
                  className="text-white bg-primary-600 hover:bg-transparent hover:text-black rounded-md text-lg px-4 py-3 w-full !mt-6"
                  size="large"
                >
                  <div className="flex items-center justify-center w-full">Send</div>
                </Button>
              </form>
            </div>
          </div>

          <div className="absolute right-0 bottom-0">
            {renderAttributions()}
          </div>
        </ParticlesBackground>
      </div>
    )
  }

  const renderAttributions = () => {
    return (
      <Dialog label={'Attributions'}>
        <div className="flex flex-col">
          {attributions.map((attribution, index) => (
            <a key={index} href={attribution.url} target={'_blank'} className="text-primary-600 hover:text-primary-800">
              {attribution.title}
            </a>
          ))}
        </div>
      </Dialog>
    )
  }

  const renderDivider = () => {
    return <div className="w-48 h-1 mx-auto md:my-4 border-0 rounded my-10 dark:bg-primary-100" />
  }

  return (
    <div className="max-w-max	overflow-hidden font-mono">
      <div className="bg-primary-800">
        {/* HOME */}
        {renderHome()}

        {/* ABOUT ME */}
        {renderAboutMe()}

        {renderDivider()}

        {/* JOURNEY */}
        {renderJourney()}

        {renderDivider()}

        {/* PROJECTS */}
        {renderProjects()}
      </div>

      {/*CONTACT ME*/}
      {renderContactMe()}

    </div>
  )
}
