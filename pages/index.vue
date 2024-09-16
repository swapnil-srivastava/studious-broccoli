<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">GitHub Repository Search</h1>
    <SearchForm @search="handleSearch" />
    <div v-if="githubStore.loading" class="mt-8 text-center text-gray-600">
      <span class="animate-spin inline-block mr-2">⌛</span> Loading...
    </div>
    <template v-else>
      <div v-if="searchSummary" class="mt-6 mb-4 p-4 bg-blue-100 rounded-lg text-blue-800">
        {{ searchSummary }}
      </div>
      <RepositoryList
        v-if="githubStore.repositories && Object.keys(githubStore.repositories).length > 0"
        :repositories="githubStore.repositories"
        :languages="githubStore.searchedLanguages"
        @loadMore="handleLoadMore"
      />
      <div v-else class="mt-8 text-center text-gray-600">
        No repositories found matching your criteria.
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useGithubStore } from '~/stores/github';
import type { SearchParams } from '../types/github';
const searchSummary = ref('');

const githubStore = useGithubStore();

const handleSearch = (searchParams: SearchParams) => {
  githubStore.searchRepositories(searchParams);

  const languagesText = searchParams.languages.length > 0 
    ? `for ${searchParams.languages.join(', ')} ` 
    : ''
  
  searchSummary.value = `GitHub repositories ${languagesText}between ${searchParams.startDate} and ${searchParams.endDate} with at least ${searchParams.minStars} stars`;
}

const handleLoadMore = (language: string) => {
  githubStore.loadMoreRepositories(language)
}
</script>