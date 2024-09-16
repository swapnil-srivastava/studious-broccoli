<template>
  <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label for="language" class="block text-gray-700 text-sm font-bold mb-2">Programming Languages</label>
      <div class="relative">
        <input
          v-model="languageInput"
          @input="filterLanguages"
          type="text"
          id="language"
          placeholder="Search for languages"
          class="block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div v-if="filteredLanguages.length > 0" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          <ul>
            <li
              v-for="lang in filteredLanguages"
              :key="lang"
              @click="selectLanguage(lang)"
              class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ lang }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="selectedLanguages.length > 0" class="mb-4 flex flex-wrap gap-2">
      <div 
        v-for="lang in selectedLanguages" 
        :key="lang"
        class="inline-flex items-center bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700"
      >
        {{ lang }}
        <button 
          @click="removeLanguage(lang)" 
          type="button"
          class="ml-2 focus:outline-none"
        >
          <svg class="h-4 w-4 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <div class="mb-4 flex flex-col sm:flex-row sm:space-x-4">
      <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
        <label for="startDate" class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
        <input 
          v-model="startDate" 
          type="date" 
          id="startDate" 
          class="block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      <div class="w-full sm:w-1/2">
        <label for="endDate" class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
        <input 
          v-model="endDate" 
          type="date" 
          id="endDate" 
          class="block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
    </div>

    <div class="mb-6">
      <label for="minStars" class="block text-gray-700 text-sm font-bold mb-2">Minimum Stars</label>
      <input 
        v-model.number="minStars" 
        type="number" 
        id="minStars" 
        min="0" 
        class="block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
    </div>

    <div class="flex items-center justify-between">
      <button 
        type="submit" 
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const languages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'Ruby', 'Go', 'PHP']

const languageInput = ref('')
const selectedLanguages = ref<string[]>([])
const startDate = ref('')
const endDate = ref('')
const minStars = ref(0)

const emit = defineEmits(['search'])

const filteredLanguages = computed(() => {
  if (!languageInput.value) return []
  const lowercaseInput = languageInput.value.toLowerCase()
  return languages.filter(lang => 
    lang.toLowerCase().includes(lowercaseInput) && !selectedLanguages.value.includes(lang)
  )
})

const filterLanguages = () => {
  // This function can be left empty or used for additional filtering logic
}

const selectLanguage = (lang: string) => {
  if (!selectedLanguages.value.includes(lang)) {
    selectedLanguages.value.push(lang)
  }
  languageInput.value = ''
}

const removeLanguage = (lang: string) => {
  selectedLanguages.value = selectedLanguages.value.filter(l => l !== lang)
}

const handleSubmit = () => {
  emit('search', {
    languages: selectedLanguages.value,
    startDate: startDate.value,
    endDate: endDate.value,
    minStars: minStars.value
  })
}
</script>