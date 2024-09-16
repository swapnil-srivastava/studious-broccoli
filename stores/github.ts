import { defineStore } from 'pinia'
import axios from 'axios'

export interface SearchParams {
  languages: string[]
  startDate: string
  endDate: string
  minStars: number
}

interface Repository {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
}

interface GithubState {
  repositories: Record<string, Repository[]>
  searchedLanguages: string[]
  loading: boolean
  error: string | null
  currentPage: Record<string, number | null>  // Allow null values
  lastSearchParams: SearchParams
}

export const useGithubStore = defineStore('github', {
  state: (): GithubState => ({
    repositories: {},
    searchedLanguages: [],
    loading: false,
    error: null,
    currentPage: {},
    lastSearchParams: {
      languages: [],
      startDate: '',
      endDate: '',
      minStars: 0
    }
  }),
  actions: {
    async searchRepositories(params: SearchParams) {
      this.loading = true
      this.error = null
      this.repositories = {}
      this.searchedLanguages = params.languages
      this.currentPage = {}
      this.lastSearchParams = { ...params }

      try {
        await Promise.all(params.languages.map(language => this.fetchRepositories(language, params)))
      } catch (error) {
        this.error = 'An error occurred while fetching repositories'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async loadMoreRepositories(language: string) {
      if (!this.currentPage[language]) return

      if (this.currentPage[language] !== null) {
        await this.fetchRepositories(language, this.lastSearchParams)
      }

      this.currentPage[language]++
      await this.fetchRepositories(language, {
        languages: [language],
        startDate: this.lastSearchParams.startDate,
        endDate: this.lastSearchParams.endDate,
        minStars: this.lastSearchParams.minStars
      })
    },
    async fetchRepositories(language: string, params: SearchParams) {
      try {
        const response = await axios.get('https://api.github.com/search/repositories', {
          params: {
            q: `language:${language} created:${params.startDate}..${params.endDate} stars:>=${params.minStars}`,
            sort: 'stars',
            order: 'desc',
            page: this.currentPage[language] || 1,
            per_page: 30
          }
        })
    
        if (!this.repositories[language]) {
          this.repositories[language] = []
        }
        this.repositories[language].push(...response.data.items)
    
        // If no more results, set currentPage to null to prevent further loading
        if (response.data.items.length === 0) {
          this.currentPage[language] = null;
        } else {
          this.currentPage[language] = (this.currentPage[language] || 0) + 1
        }
      } catch (error) {
        console.error(`Error fetching repositories for ${language}:`, error)
      }
    }
  }
})