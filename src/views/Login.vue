<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
    <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Leave Platform</h1>
      
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <input v-model="form.username" type="text" placeholder="Username" required
            class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div>
          <input v-model="form.password" type="password" placeholder="Password" required
            class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>
        <button type="submit" :disabled="loading"
          class="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all">
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
      
      <p v-if="error" class="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl">
        {{ error }}
      </p>
      
      <div class="mt-6 text-center text-sm text-gray-500">
        Test: <span class="font-semibold">admin / admin123</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLeaveStore } from '../stores/leave.js'

const store = useLeaveStore()
const router = useRouter()
const form = ref({ username: '', password: '' })
const error = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  error.value = ''
  
  const success = await store.login(form.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Invalid credentials'
  }
  
  loading.value = false
}
</script>
