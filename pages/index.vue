<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">GitHub Repository Search</h1>
    <SearchForm @search="handleSearch" />
    <div v-if="loading" class="mt-8 text-center text-gray-600">
      <span class="animate-spin inline-block mr-2">⌛</span> Loading...
    </div>
    <div v-else-if="error" class="mt-8 text-red-500 text-center">{{ error }}</div>
    <div v-else class="mt-8 space-y-8">
      <RepositoryList
        v-for="(repos, lang) in repositories"
        :key="lang"
        :language="lang"
        :repositories="repos"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGithubStore } from '~/stores/github'

const githubStore = useGithubStore()
const { repositories, loading, error } = storeToRefs(githubStore)

const handleSearch = (params: { language: string; startDate: string; endDate: string; minStars: number }) => {
  githubStore.searchRepositories(params.language, params.startDate, params.endDate, params.minStars)
}
</script>