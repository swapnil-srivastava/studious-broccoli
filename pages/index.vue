<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">GitHub Repository Search</h1>
    <SearchForm @search="handleSearch" />
    <div v-if="githubStore.loading" class="mt-8 text-center text-gray-600">
      <span class="animate-spin inline-block mr-2">⌛</span> Loading...
    </div>
    <div v-else-if="githubStore.error">{{ githubStore.error }}</div>
      <RepositoryList v-else
        :repositories="githubStore.repositories" 
        :languages="githubStore.searchedLanguages"
        @loadMore="handleLoadMore"
      />
  </div>
</template>

<script setup lang="ts">
import { useGithubStore } from '~/stores/github'
import type { SearchParams } from '~/stores/github'

const githubStore = useGithubStore()

const handleSearch = (searchParams: SearchParams) => {
  githubStore.searchRepositories(searchParams)
}

const handleLoadMore = (language: string) => {
  githubStore.loadMoreRepositories(language)
}
</script>