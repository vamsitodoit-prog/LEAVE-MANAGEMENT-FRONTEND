<template>
  <div class="flex bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen dark:from-gray-900 dark:to-gray-800">
    <!-- Fixed Sidebar -->
    <AdminSidebar />

    <!-- Main Content (Offset for sidebar) -->
    <main class="ml-64 flex-1 p-8 overflow-auto">
      <!-- Topbar -->
      <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-6 mb-8 sticky top-0 z-10">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Dashboard</h1>
            <p class="text-gray-600 dark:text-gray-400">Welcome back, Administrator</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white shadow-lg">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">A</div>
              <div>
                <p class="font-semibold">Administrator</p>
                <p class="text-sm opacity-90">admin@leavehub.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="stat-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
          <div class="flex items-center justify-between mb-6">
            <div class="p-4 bg-blue-100 rounded-3xl group-hover:bg-blue-200 transition-all">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8.303a7 7 0 012.104 14.606A7 7 0 0115.5 9a3.5 3.5 0 013.121 5H15a3 3 0 01-3-3V8a3 3 0 013-3h4.586z"/>
              </svg>
            </div>
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Total Employees</h3>
          <p class="text-4xl font-bold text-gray-900 mb-4">53</p>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full animate-pulse" style="width: 70%"></div>
          </div>
        </div>

        <!-- Repeat for other 3 stats cards with different colors/icons -->
        <div class="stat-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
          <div class="flex items-center justify-between mb-6">
            <div class="p-4 bg-green-100 rounded-3xl group-hover:bg-green-200 transition-all">
              <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Present Today</h3>
          <p class="text-4xl font-bold text-gray-900 mb-4">44</p>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style="width: 82%"></div>
          </div>
        </div>

        <!-- On Leave -->
        <div class="stat-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
          <div class="flex items-center justify-between mb-6">
            <div class="p-4 bg-orange-100 rounded-3xl group-hover:bg-orange-200 transition-all">
              <svg class="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">On Leave</h3>
          <p class="text-4xl font-bold text-gray-900 mb-4">9</p>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full" style="width: 18%"></div>
          </div>
        </div>

        <!-- Late Today -->
        <div class="stat-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
          <div class="flex items-center justify-between mb-6">
            <div class="p-4 bg-red-100 rounded-3xl group-hover:bg-red-200 transition-all">
              <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Late Today</h3>
          <p class="text-4xl font-bold text-gray-900 mb-4">2</p>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div class="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full" style="width: 5%"></div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Pending Requests -->
        <div class="lg:col-span-2">
          <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Pending Leave Requests</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Employee</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Type</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                          <span class="text-white font-bold text-sm">J</span>
                        </div>
                        <span class="font-semibold text-gray-900">John Doe</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Annual</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Activity Feed -->
        <div>
          <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8 h-fit">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer">
                <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">John leave approved</p>
                  <p class="text-sm text-gray-500">2 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue'
</script>

<style scoped>
.stat-card {
  transition: all 0.3s ease;
}
</style>
