'use client'

import { useEffect, useState } from 'react'
import {  Repository } from '@/app/services/github'

export default function useGithubRepositories() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [nextFetchCursor, setNextFetchCursor] = useState<string | null>(null)
  const [loadingStart, setLoadingStart] = useState<boolean>(true)
  const [loadingNext, setLoadingNext] = useState<boolean>(false)
  const [error, setError] = useState<null | Error>()

  const reset = () => {
    setRepos([])
    setNextFetchCursor(null)
    setLoadingStart(true)
    setLoadingNext(false)
    setError(null)

    fetchGithubRepositories()
      .then(() => {
        setLoadingStart(false)
      })
      .catch((e: Error) => {
        setError(e)
      })
  }

  const fetchGithubRepositories = async () => {

    const url = nextFetchCursor ? `/api/github?nextFetchCursor=${nextFetchCursor}` : '/api/github'

    const repositoriesResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!repositoriesResponse.ok) {
      throw new Error('Error fetching repositories')
    }

    const repositoriesResponseJson = await repositoriesResponse.json() as { repos: Repository[], afterCursor: string | null }

    // Fix date
    repositoriesResponseJson.repos.forEach((repo) => {
      repo.updatedAt = new Date(repo.updatedAt)
    })

    setRepos((repos) => [...repos, ...repositoriesResponseJson.repos])
    setNextFetchCursor(repositoriesResponseJson.afterCursor)
  }

  const fetchNextRepositories = async () => {
    setLoadingNext(true)
    fetchGithubRepositories()
      .then(() => {
        setLoadingNext(false)
      })
      .catch((e: Error) => {
        console.log('Error fetchNextRepositories', e)
        setError(e)
      })
  }

  useEffect(() => {
    fetchGithubRepositories()
      .then(() => {
        setLoadingStart(false)
      })
      .catch((e: Error) => {
        console.log('Error useEffect', e)
        setError(e)
      })
  }, [])

  return {
    repos,
    loadingStart,
    loadingNext,
    nextFetchCursor,
    fetchNextRepositories,
    error,
    reset,
  }
}
