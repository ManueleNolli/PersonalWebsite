'use client'

import useGithubRepositories from '@/app/components/githubRepositories/useGithubRepositories'

export default function GithubRepositories() {
  const { repos, loading, error } = useGithubRepositories()

  if (loading) {
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
      {repos.map((repo) => (
        <div key={repo.name}>
          {repo.name}
          {repo.description}
          {repo.url}
          {repo.updatedAt.toLocaleString()}
          {repo.updatedAt.toLocaleTimeString()}
          {repo.updatedAt.toLocaleDateString()}
          {repo.owner}
          {repo.isFork}
        </div>
      ))}
    </div>
  )
}
