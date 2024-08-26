'use client'

import useGithubRepositories from '@/app/components/githubRepositories/useGithubRepositories'
import { Repository } from '@/app/services/github'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import React from 'react'
import { Skeleton } from 'primereact/skeleton'
import { config } from '@/app/constants/config'
import Error from '@/app/error'
import AnimatedOnScroll from '@/app/components/animatedOnScroll/animatedOnScroll'

export default function GithubRepositories() {
  const { repos, loadingStart, loadingNext, nextFetchCursor, error, reset, fetchNextRepositories } = useGithubRepositories()
  const { projects_repositories_length } = config

  const renderCard = (repo: Repository) => {
    const renderHeader = () => {
      if (repo.isFork) {
        return (
          <div className={'relative'}>
            <Image src="/fork.png" alt="Fork" imageClassName="w-4 absolute right-2 top-2" />
          </div>
        )
      } else if (!repo.owned) {
        return (
          <div className={'relative'}>
            <Image src="/collaboration.png" alt="Collaboration" imageClassName="w-8 absolute right-2 top-2" />
          </div>
        )
      }
    }

    return (
      <div
        key={repo.name}
        className="w-96 md:max-w-[90%] bg-white/95 hover:bg-white cursor-pointer flex flex-col h-full p-4 rounded"
        onClick={() => window.open(repo.url, '_blank')}
      >
        {/*HEADER*/}
        {renderHeader()}

        {/*TITLE*/}
        <div className={'p-0 m-2 hover:text-primary-900 text-primary-800 text-2xl font-semibold'}>{repo.name}</div>

        {/*SUBTITLE*/}
        <Button
          label={repo.ownerName}
          onClick={() => window.open(repo.ownerUrl, '_blank')}
          text
          className={'p-0 m-2 hover:text-primary-750 no-outline hover:bg-transparent text-primary-600 text-left'}
        />

        {/*DESCRIPTION*/}
        <div className={'m-2 text-gray-500 grow'}>{repo.description}</div>

        {/*DATE*/}
        <div className={'m-2 text-gray-500'}>
          {repo.updatedAt.getDate()}.{repo.updatedAt.getMonth() + 1}.{repo.updatedAt.getFullYear()}
        </div>
      </div>
    )
  }

  const renderSkeletonCard = () => {
    return (
      <div className="grid grid-cols-4 gap-x-4 gap-y-16 2xl:grid-cols-3 2xl:gap-x-4 2xl:gap-y-4 xl:grid-cols-2 xl:gap-2 md:grid-cols-1 md:gap-y-4 justify-items-center mx-[5%] py-4 ">
        {Array.from({ length: projects_repositories_length }).map((_, index) => (
          <Skeleton key={index} className="max-w-96 md:max-w-[90%] max-h-96 min-h-80 bg-white/95 flex flex-col p-4 rounded animate-pulse">
            <div className={'p-0 m-2 bg-gray-200 min-h-10 w-[80%] rounded '} />
            <div className={'p-0 m-2 bg-gray-200 min-h-8 w-1/2 rounded'} />
            <div className={'p-0 m-2 bg-gray-200 min-h-32 w-[90%] rounded'} />
            <div className={'p-0 m-2 bg-gray-200 min-h-8 w-1/4 rounded'} />
          </Skeleton>
        ))}
      </div>
    )
  }

  if (error) {
    return <Error error={error} reset={reset} />
  }

  if (loadingStart) {
    return renderSkeletonCard()
  }

  return (
    <AnimatedOnScroll animationStart="top-bottom">
      <>
        <div className="grid grid-cols-4 gap-x-4 gap-y-16 2xl:grid-cols-3 2xl:gap-x-4 2xl:gap-y-4 xl:grid-cols-2 xl:gap-2 md:grid-cols-1 md:gap-y-4 justify-items-center mx-[5%]">
          {repos.map((repo) => renderCard(repo))}
        </div>
        {loadingNext && renderSkeletonCard()}

        {nextFetchCursor && (
          <div className="flex justify-center">
            <Button
              className="text-white bg-primary-600 hover:bg-transparent rounded-md text-lg m-8 border-1 border-primary-500"
              onClick={() => fetchNextRepositories()}
            >
              <div className="flex items-center justify-center w-full">Load More</div>
            </Button>
          </div>
        )}
      </>
    </AnimatedOnScroll>
  )
}
