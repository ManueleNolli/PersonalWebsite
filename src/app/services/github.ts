import { Octokit } from 'octokit'
import { config } from '@/app/constants/config'

export type Repository = {
  name: string
  url: string
  description: string
  owned: boolean // If I own the repository
  isFork: string
  updatedAt: Date
  ownerName: string
  ownerUrl: string
}

type fetchRepositoriesResult = {
  repos: Repository[]
  afterCursor: string | null
  ok: boolean
}

const getAPIKey = (): string => {
  const api_key = process.env.NEXT_PUBLIC_GITHUB_API_KEY

  if (api_key == undefined) throw new Error('GITHUB API Key not found')

  return api_key
}

export const getRepositories = async (afterCursor: string | null): Promise<fetchRepositoriesResult> => {
  let api_key
  try {
    api_key = getAPIKey()
  } catch (e) {
    return {
      ok: false,
      afterCursor: null,
      repos: [],
    }
  }

  const { projects_repositories_length } = config

  const octokit = new Octokit({ auth: api_key })

  // get logged in user
  const {
    viewer: { login },
  } = await octokit.graphql(`{
    viewer {
      login
    }
  }`)

  const {
    viewer: {
      repositories: { pageInfo, nodes },
    },
  } = await octokit.graphql(`{
  viewer {
    repositories(first: ${projects_repositories_length}, ${afterCursor ? `after:"${afterCursor}"` : ''} orderBy: {field: UPDATED_AT, direction: DESC}) {
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
          url
        }
      }
    }
  }
}`)

  console.log(nodes)
  console.log('login', login)
  // FILTER ARCHIVED
  const repos: Repository[] = nodes
    .filter((repo: any) => !repo.isArchived)
    .map((repo: any) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      owned: repo.owner.login === login,
      isFork: repo.isFork,
      updatedAt: new Date(repo.updatedAt),
      ownerName: repo.owner.login,
      ownerUrl: repo.owner.url,
    }))

  return {
    repos,
    afterCursor: pageInfo.hasNextPage ? pageInfo.endCursor : null,
    ok: true,
  }
}
