import { defineStore } from 'pinia'
import axios from 'axios'

interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  language: string
  stargazers_count: number
  created_at: string
}

export interface SearchParams {
  languages: string[]
  startDate: string
  endDate: string
  minStars: number
}

interface GithubState {
  repositories: Repository[]
  loading: boolean
  error: string | null
}

export const useGithubStore = defineStore('github', {
  state: (): GithubState => ({
    repositories: [],
    loading: false,
    error: null
  }),
  actions: {
    async searchRepositories(params: SearchParams) {
      this.loading = true
      this.error = null
      this.repositories = []

      try {
        
        const promises = params.languages.map(language =>
          axios.get('https://api.github.com/search/repositories', {
            params: {
              q: `language:${language} created:${params.startDate}..${params.endDate} stars:>=${params.minStars}`,
              sort: 'stars',
              order: 'desc',
              per_page: 100 // Adjust this value as needed
            }
          })
        )

        const responses = await Promise.all(promises)
        
        this.repositories = responses.flatMap(response => 
          response.data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            full_name: item.full_name,
            html_url: item.html_url,
            description: item.description,
            language: item.language,
            stargazers_count: item.stargazers_count,
            created_at: item.created_at
          }))
        )

        // Sort the combined results by star count in descending order
        this.repositories.sort((a, b) => b.stargazers_count - a.stargazers_count)

      } catch (error) {
        this.error = 'An error occurred while fetching repositories'
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
})