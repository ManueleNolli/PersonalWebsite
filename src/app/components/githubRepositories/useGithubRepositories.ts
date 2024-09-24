'use client'

import { useEffect, useState } from 'react'
import { getRepositories, Repository } from '@/app/services/github'

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
    const repositoriesResponse = await getRepositories(nextFetchCursor)
    if (!repositoriesResponse.ok) {
      throw new Error('Error fetching repositories')
    }

    setRepos((repos) => [...repos, ...repositoriesResponse.repos])
    setNextFetchCursor(repositoriesResponse.afterCursor)
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
