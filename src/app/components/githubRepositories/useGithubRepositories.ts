'use client'

import { useEffect, useState } from 'react'
import { getRepositories, Repository } from '@/app/services/github'

export default function useGithubRepositories() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchGithubRepositories = async () => {
      const repositoriesResponse = await getRepositories()
      if (!repositoriesResponse.ok) {
        setError(true)
        return
      }

      setRepos(repositoriesResponse.repos)
    }

    fetchGithubRepositories().then(() => {
      setLoading(false)
    })
  }, [])

  return {
    repos,
    loading,
    error,
  }
}
