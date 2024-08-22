'use client'

import { useEffect, useState } from 'react'
import { getRepositories, Repository } from '@/app/services/github'

export default function useGithubRepositories() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [nextFetchCursor, setNextFetchCursor] = useState<string | null>(null)
  const [loadingStart, setLoadingStart] = useState<boolean>(true)
  const [loadingNext, setLoadingNext] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const fetchGithubRepositories = async () => {
    const repositoriesResponse = await getRepositories(nextFetchCursor)
    if (!repositoriesResponse.ok) {
      setError(true)
      return
    }

    setRepos((repos) => [...repos, ...repositoriesResponse.repos])
    setNextFetchCursor(repositoriesResponse.afterCursor)
  }

  const fetchNextRepositories = async () => {
    setLoadingNext(true)
    fetchGithubRepositories().then(() => {
      setLoadingNext(false)
    })
  }

  useEffect(() => {
    fetchGithubRepositories().then(() => {
      setLoadingStart(false)
    })
  }, [])

  return {
    repos,
    loadingStart,
    loadingNext,
    nextFetchCursor,
    error,
    fetchNextRepositories,
  }
}
