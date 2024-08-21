import { Octokit } from 'octokit'
import { config } from '@/app/constants/config'

export type Repository = {
  name: string
  url: string
  description: string
  isFork: string
  updatedAt: Date
  owner: string
}

type fetchRepositoriesResult = {
  repos: Repository[]
  ok: boolean
}

const getAPIKey = (): string => {
  const api_key = process.env.NEXT_PUBLIC_GITHUB_API_KEY

  if (api_key == undefined) throw new Error('GITHUB API Key not found')

  return api_key
}

export const getRepositories = async (): Promise<fetchRepositoriesResult> => {
  let api_key
  try {
    api_key = getAPIKey()
  } catch (e) {
    console.log('CATCHED APIKey error')
    return {
      ok: false,
      repos: [],
    }
  }

  const { projects_repositories_length } = config

  const octokit = new Octokit({ auth: api_key })

  const {
    viewer: {
      repositories: { nodes },
    },
  } = await octokit.graphql(`{
  viewer {
    repositories(first: ${projects_repositories_length}, orderBy: {field: UPDATED_AT, direction: DESC}) {
      pageInfo {hasNextPage, endCursor}
      nodes {
        name
        url
        description
        isArchived
        isFork
        updatedAt
        owner {
          login
        }
      }
    }
  }
}`)

  // FILTER ARCHIVED
  console.log('nodes', nodes)
  const repos: Repository[] = nodes
    .filter((repo: any) => !repo.isArchived)
    .map((repo: any) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      isFork: repo.isFork,
      updatedAt: new Date(repo.updatedAt),
      owner: repo.owner.login,
    }))

  return {
    repos,
    ok: true,
  }
}
