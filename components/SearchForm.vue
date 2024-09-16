<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div>
      <label for="language" class="block text-gray-700 text-sm font-bold mb-2">Programming Language</label>
      <select v-model="language" id="language" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="">Select a language</option>
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>
    <div class="flex space-x-4">
      <div class="flex-1">
        <label for="startDate" class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
        <input v-model="startDate" type="date" id="startDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="flex-1">
        <label for="endDate" class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
        <input v-model="endDate" type="date" id="endDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
    </div>
    <div>
      <label for="minStars" class="block text-gray-700 text-sm font-bold mb-2">Minimum Stars</label>
      <input v-model.number="minStars" type="number" id="minStars" min="0" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
      Search
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const languages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'Ruby', 'Go', 'PHP']

const language = ref('')
const startDate = ref('')
const endDate = ref('')
const minStars = ref(0)

const emit = defineEmits(['search'])

const handleSubmit = () => {
  emit('search', {
    language: language.value,
    startDate: startDate.value,
    endDate: endDate.value,
    minStars: minStars.value
  })
}
</script>