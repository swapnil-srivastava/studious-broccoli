<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div 
      v-for="language in languages" 
      :key="language" 
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <h2 class="text-lg font-bold p-4 bg-gray-100 sticky top-0 z-10">{{ language }}</h2>
      <div 
        class="overflow-y-auto h-[calc(100vh-200px)] md:h-[500px]"
        @scroll="(event) => onScroll(event, language)"
      >
        <div v-if="!repositories[language] || repositories[language].length === 0" class="p-4 text-gray-500">
          No repositories found for this language.
        </div>
        <div v-else class="space-y-4 p-4">
          <div
            v-for="repo in repositories[language]"
            :key="repo.id"
            class="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300 ease-in-out"
          >
            <a
              :href="repo.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:underline"
            >
              <h3 class="font-semibold">{{ repo.name }}</h3>
            </a>
            <p class="text-gray-600 text-sm mt-2">{{ repo.description }}</p>
            <div class="flex justify-between items-center mt-3 text-xs text-gray-500">
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
        <div v-if="loading[language]" class="text-center p-4 text-gray-600">
          Loading more repositories...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { Repository } from '../types/github';

const props = defineProps<{
  repositories: Record<string, Repository[]>;
  languages: string[];
}>();

const emit = defineEmits(['loadMore']);

const loading = ref<Record<string, boolean>>({});

const onScroll = (event: Event, language: string) => {
  const target = event.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50 && !loading.value[language]) {
    loadMore(language);
  }
};

const loadMore = (language: string) => {
  if (loading.value[language]) return;
  loading.value[language] = true;
  emit('loadMore', language);
};
</script>