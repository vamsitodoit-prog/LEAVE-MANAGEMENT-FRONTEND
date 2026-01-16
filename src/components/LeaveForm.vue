<template>
  <div class="bg-white p-8 rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6">New Leave Request</h2>
    <form @submit.prevent="submitLeave" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <input v-model="form.start_date" type="date" required placeholder="Start Date"
          class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500">
        <input v-model="form.end_date" type="date" required placeholder="End Date"
          class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500">
      </div>
      <select v-model="form.leave_type" class="w-full p-3 border rounded-xl">
        <option value="CL">Casual Leave</option>
        <option value="SL">Sick Leave</option>
        <option value="PL">Paid Leave</option>
      </select>
      <textarea v-model="form.reason" rows="4" required placeholder="Reason"
        class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"></textarea>
      <input type="file" @change="handleFile" accept=".pdf,.jpg,.png"
        class="w-full p-3 border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl">
      <button type="submit" :disabled="loading"
        class="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700">
        {{ loading ? 'Submitting...' : 'Submit Leave' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLeaveStore } from '@/stores/leave.js'

const emit = defineEmits(['leave-created'])
const store = useLeaveStore()

const form = ref({
  start_date: '', end_date: '', leave_type: 'CL', reason: ''
})
const file = ref(null)
const loading = ref(false)

const handleFile = (e) => file.value = e.target.files[0]

const submitLeave = async () => {
  loading.value = true
  const formData = new FormData()
  Object.entries(form.value).forEach(([key, value]) => formData.append(key, value))
  if (file.value) formData.append('attachment', file.value)
  
  try {
    await store.createLeave(formData)
    emit('leave-created')
    form.value = { start_date: '', end_date: '', leave_type: 'CL', reason: '' }
  } catch {
    alert('Failed to submit')
  } finally {
    loading.value = false
  }
}
</script>
