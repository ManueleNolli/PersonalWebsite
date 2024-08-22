'use client'

import useGithubRepositories from '@/app/components/githubRepositories/useGithubRepositories'
import { Card } from 'primereact/card'
import { Repository } from '@/app/services/github'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import React from 'react'

export default function GithubRepositories() {
  const { repos, loadingStart, loadingNext, nextFetchCursor, error, fetchNextRepositories } = useGithubRepositories()

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

    const renderTitle = () => {
      return (
        <Button
          label={repo.name}
          text
          className={'p-0 m-0 hover:text-primary-900 text-2xl no-outline hover:bg-transparent text-primary-800 text-left'}
        />
      )
    }
    const renderSubTitle = () => {
      return (
        <Button
          label={repo.ownerName}
          onClick={() => window.open(repo.ownerUrl, '_blank')}
          text
          className={'p-0 m-0 hover:text-primary-750 no-outline hover:bg-transparent text-primary-600'}
        />
      )
    }

    const renderFooter = () => {
      return (
        <p>
          {repo.updatedAt.getDate()}.{repo.updatedAt.getMonth() + 1}.{repo.updatedAt.getFullYear()}
        </p>
      )
    }

    return (
      <Card
        key={repo.name}
        title={renderTitle}
        subTitle={renderSubTitle}
        header={renderHeader}
        footer={null}
        onClick={() => window.open(repo.url, '_blank')}
        className="w-96 bg-white cursor-pointer flex flex-col h-full"
      >
        <div>{repo.description}</div>
        <div className="mt-auto">{renderFooter()}</div>
      </Card>
    )
  }

  if (loadingStart) {
    return (
      <div>
        <h1>LOADING REPOS</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>ERROR DURING LOADING REPOS</h1>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 justify-items-center	">{repos.map((repo) => renderCard(repo))}</div>
      <button onClick={fetchNextRepositories} disabled={!nextFetchCursor}>
        {loadingNext ? 'LOADING NEXT' : 'LOAD NEXT'}
      </button>
    </div>
  )
}
