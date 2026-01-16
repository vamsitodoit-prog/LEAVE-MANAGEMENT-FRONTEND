<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Employee Dashboard</h1>
      <div class="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-200">
        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <!-- My Leave Requests -->
          <div class="text-center p-8 bg-blue-50 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300">
            <h3 class="text-2xl font-bold text-blue-800 mb-4">📋 My Leave Requests</h3>
            <p class="text-4xl font-bold text-blue-600 mb-4">3</p>
            <button class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              + New Request
            </button>
          </div>
          
          <!-- Pending Approval -->
          <div class="text-center p-8 bg-green-50 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300">
            <h3 class="text-2xl font-bold text-green-800 mb-4">✅ Pending Approval</h3>
            <p class="text-4xl font-bold text-green-600">1</p>
          </div>
        </div>
        
        <router-link to="/admin-dashboard" class="block text-center text-blue-600 hover:text-blue-800 font-semibold mt-8 bg-blue-50 hover:bg-blue-100 p-4 rounded-2xl transition-all duration-300">
          👨‍💼 Switch to Admin View
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
</script>

<!-- ✅ NO <style> SECTION NEEDED -->
