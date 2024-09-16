<template>
  <div class="container mx-auto px-4 py-8">
    <div v-for="language in languages" :key="language" class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">{{ language }}</h2>
      <div v-if="!repositories[language] || repositories[language].length === 0" class="text-gray-500">
        No repositories found for {{ language }}.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="repo in repositories[language]"
          :key="repo.id"
          class="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 ease-in-out"
        >
          <a
            :href="repo.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            {{ repo.name }}
          </a>
          <p class="text-gray-600 mt-2">{{ repo.description || 'No description available' }}</p>
          <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              {{ repo.stargazers_count }}
            </span>
            <span>{{ new Date(repo.created_at).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
      <div v-if="hasMoreRepos(language)" class="mt-4 text-center">
        <button
          @click="loadMore(language)"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="loading[language]"
        >
          {{ loading[language] ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

import type { Repository } from '../types/github';

const props = defineProps<{
  repositories: Record<string, Repository[]>;
  languages: string[];
}>();

const emit = defineEmits(['loadMore'])

const loading = ref<Record<string, boolean>>({})

const hasMoreRepos = (language: string) => {
  return true
}

const loadMore = (language: string) => {
  if (loading.value[language]) return
  loading.value[language] = true
  emit('loadMore', language)
}

// Expose loadMore method to parent component
defineExpose({ loadMore })
</script>