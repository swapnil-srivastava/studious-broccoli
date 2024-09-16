import { defineStore } from 'pinia'
import axios from 'axios'

interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  stargazers_count: number
  created_at: string
}

interface GithubState {
  repositories: Record<string, Repository[]>
  loading: boolean
  error: string | null
}

export const useGithubStore = defineStore('github', {
  state: (): GithubState => ({
    repositories: {},
    loading: false,
    error: null
  }),
  actions: {
    async searchRepositories(language: string, startDate: string, endDate: string, minStars: number) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('https://api.github.com/search/repositories', {
          params: {
            q: `language:${language} created:${startDate}..${endDate} stars:>=${minStars}`,
            sort: 'stars',
            order: 'desc'
          }
        })
        this.repositories[language] = response.data.items
      } catch (error) {
        this.error = 'An error occurred while fetching repositories'
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
})