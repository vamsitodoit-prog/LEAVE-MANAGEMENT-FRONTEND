<template>
  <aside class="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl min-h-screen p-6 fixed h-screen overflow-y-auto">
    <!-- Logo -->
    <div class="mb-12">
      <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">LeaveHub</h2>
      <p class="text-gray-400 text-sm">Admin Panel</p>
    </div>

    <!-- Navigation -->
    <nav class="space-y-2 mb-12">
      <router-link to="/admin-dashboard" class="sidebar-link flex items-center space-x-3 p-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all group">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link to="/admin-requests" class="sidebar-link flex items-center space-x-3 p-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <span>Requests</span>
      </router-link>

      <router-link to="/admin-employees" class="sidebar-link flex items-center space-x-3 p-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8.303a7 7 0 012.104 14.606A7 7 0 0115.5 9a3.5 3.5 0 013.121 5H15a3 3 0 01-3-3V8a3 3 0 013-3h4.586z"/>
        </svg>
        <span>Employees</span>
      </router-link>

      <router-link to="/admin-updates" class="sidebar-link flex items-center space-x-3 p-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 10v2a2 2 0 01-2 2H9a2 2 0 00-2 2v2a2 2 0 002 2h10a2 2 0 002-2"/>
        </svg>
        <span>Updates</span>
      </router-link>

      <router-link to="/admin-chat" class="sidebar-link flex items-center space-x-3 p-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span>Chat</span>
      </router-link>
    </nav>

    <!-- Theme Toggle & Logout -->
    <div class="absolute bottom-6 left-6 right-6">
      <button @click="toggleTheme" class="w-full flex items-center justify-center space-x-3 p-4 bg-white/10 rounded-2xl text-gray-300 hover:bg-white/20 hover:text-white transition-all mb-4">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isDark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <span>{{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}</span>
      </button>
      
      <router-link to="/login" class="w-full flex items-center justify-center space-x-3 p-4 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white rounded-2xl transition-all font-semibold">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        <span>Logout</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}

onMounted(() => {
  if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
