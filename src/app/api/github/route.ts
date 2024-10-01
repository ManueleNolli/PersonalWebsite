import { getRepositories } from '@/app/services/github'


import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const nextFetchCursor = searchParams.get('nextFetchCursor')

  const repositoriesResponse = await getRepositories(nextFetchCursor)

  if (!repositoriesResponse.ok) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true, repos: repositoriesResponse.repos, afterCursor: repositoriesResponse.afterCursor }), { status: 200 })
}