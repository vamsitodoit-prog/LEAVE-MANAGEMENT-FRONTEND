<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Leave Requests</h1>
          <p class="text-xl text-gray-600">{{ leaves.length }} total requests</p>
        </div>
        <button class="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300">
          + Export CSV
        </button>
      </div>

      <!-- Requests Table -->
      <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th class="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Employee</th>
                <th class="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Leave Type</th>
                <th class="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Reason</th>
                <th class="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
                <th class="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Dates</th>
                <th class="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="leave in leaves" :key="leave.id" class="hover:bg-gray-50 transition-all duration-200">
                <td class="px-8 py-6 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
                      <span class="text-white font-bold">{{ leave.employee.charAt(0) }}</span>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">{{ leave.employee }}</div>
                      <div class="text-sm text-gray-500">{{ leave.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6 whitespace-nowrap">
                  <span class="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-semibold">
                    {{ leave.type }}
                  </span>
                </td>
                <td class="px-8 py-6">
                  <p class="text-gray-900 font-medium">{{ leave.reason }}</p>
                </td>
                <td class="px-8 py-6 whitespace-nowrap">
                  <span :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold',
                    leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  ]">
                    {{ leave.status }}
                  </span>
                </td>
                <td class="px-8 py-6 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDateRange(leave.start_date, leave.end_date) }}
                </td>
                <td class="px-8 py-6 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button @click="openModal(leave)" class="text-blue-600 hover:text-blue-900 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all">
                    💬 Chat
                  </button>
                  <button @click="approveLeave(leave.id)" 
                    :disabled="leave.status !== 'Pending'"
                    class="bg-green-100 hover:bg-green-200 text-green-800 px-6 py-2 rounded-xl font-semibold disabled:opacity-50 transition-all">
                    ✅ Approve
                  </button>
                  <button @click="rejectLeave(leave.id)"
                    :disabled="leave.status !== 'Pending'"
                    class="bg-red-100 hover:bg-red-200 text-red-800 px-6 py-2 rounded-xl font-semibold disabled:opacity-50 transition-all">
                    ❌ Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Action Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ modalLeave?.employee }}'s Request</h3>
        <div class="space-y-4 mb-8">
          <p><span class="font-semibold">Type:</span> {{ modalLeave?.type }}</p>
          <p><span class="font-semibold">Reason:</span> {{ modalLeave?.reason }}</p>
          <p><span class="font-semibold">Dates:</span> {{ formatDateRange(modalLeave?.start_date, modalLeave?.end_date) }}</p>
        </div>
        <div class="flex space-x-3 pt-4 border-t border-gray-200">
          <button @click="confirmApprove" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
            ✅ Approve
          </button>
          <button @click="confirmReject" class="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
            ❌ Reject
          </button>
          <button @click="showModal = false" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leaves = ref([])
const showModal = ref(false)
const modalLeave = ref(null)

const sampleLeaves = [
  { id: 1, employee: 'John Doe', email: 'john@company.com', type: 'Annual Leave', reason: 'Vacation', status: 'Pending', start_date: '2026-01-20', end_date: '2026-01-25' },
  { id: 2, employee: 'Sarah Wilson', email: 'sarah@company.com', type: 'Sick Leave', reason: 'Flu recovery', status: 'Approved', start_date: '2026-01-15', end_date: '2026-01-17' },
  { id: 3, employee: 'Mike Chen', email: 'mike@company.com', type: 'Casual Leave', reason: 'Personal matter', status: 'Pending', start_date: '2026-01-22', end_date: '2026-01-23' }
]

const formatDateRange = (start, end) => {
  const s = new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const e = new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${s} → ${e}`
}

const approveLeave = (id) => {
  const leave = leaves.value.find(l => l.id === id)
  if (leave) {
    leave.status = 'Approved'
    // Add notification logic here
  }
}

const rejectLeave = (id) => {
  const leave = leaves.value.find(l => l.id === id)
  if (leave) {
    leave.status = 'Rejected'
  }
}

const openModal = (leave) => {
  modalLeave.value = leave
  showModal.value = true
}

const confirmApprove = () => {
  if (modalLeave.value) {
    approveLeave(modalLeave.value.id)
    showModal.value = false
  }
}

const confirmReject = () => {
  if (modalLeave.value) {
    rejectLeave(modalLeave.value.id)
    showModal.value = false
  }
}

onMounted(() => {
  leaves.value = sampleLeaves
})
</script>
