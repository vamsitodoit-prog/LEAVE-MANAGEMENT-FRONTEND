<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900">
    <!-- Chat Header -->
    <div class="bg-white/80 backdrop-blur-md shadow-xl border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="$router.go(-1)" class="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Employee Messages</h1>
              <p class="text-sm text-gray-500">{{ activeChat?.employee?.username || 'Select conversation' }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 text-sm">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">{{ messages.length }} messages</span>
            <button @click="markAllRead" class="px-4 py-2 bg-green-100 text-green-800 rounded-xl hover:bg-green-200 transition-all text-sm font-medium">
              Mark All Read
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages List -->
    <div class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <!-- No Active Chat -->
      <div v-if="!activeChat" class="text-center py-20">
        <div class="w-24 h-24 bg-gray-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No active conversation</h3>
        <p class="text-gray-500 mb-8 max-w-md mx-auto">Select a leave request from dashboard to start chatting</p>
        <router-link to="/admin" class="btn-primary px-8 py-3 inline-flex items-center">
          ← Back to Dashboard
        </router-link>
      </div>

      <!-- Active Chat Messages -->
      <div v-else class="space-y-6">
        <!-- Chat Header with Leave Info -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 p-6 rounded-3xl border border-blue-200 dark:border-blue-800/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ activeChat.employee.username.charAt(0).toUpperCase() }}</span>
              </div>
              <div>
                <h3 class="font-bold text-xl text-gray-900">{{ activeChat.employee.username }}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span class="status-pending">{{ activeChat.status }}</span>
                  <span>{{ formatDate(activeChat.start_date) }} - {{ formatDate(activeChat.end_date) }}</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <button @click="approveChatLeave" :disabled="loading" class="btn-success mr-2 text-sm px-4 py-2">
                ✅ Approve
              </button>
              <button @click="rejectChatLeave" :disabled="loading" class="btn-danger text-sm px-4 py-2">
                ❌ Reject
              </button>
            </div>
          </div>
        </div>

        <!-- Messages Container -->
        <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col h-[60vh]">
          <!-- Messages List -->
          <div id="adminChatBox" class="chat-box flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            <div v-for="msg in messages" :key="msg.id" 
              :class="['p-4 rounded-2xl shadow-sm max-w-md', 
                msg.sender.isAdmin ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto' : 'bg-white dark:bg-gray-700 border']"
              :style="msg.unread ? 'border-left: 4px solid #3b82f6' : ''">
              <div class="flex items-start justify-between mb-2">
                <span class="font-semibold text-sm opacity-90">{{ msg.sender.name }}</span>
                <span class="text-xs opacity-75">{{ formatTime(msg.timestamp) }}</span>
              </div>
              <p class="text-sm leading-relaxed">{{ msg.text }}</p>
              <span v-if="!msg.read && !msg.sender.isAdmin" class="w-2 h-2 bg-blue-400 rounded-full mt-1 block ml-auto"></span>
            </div>
            
            <!-- Typing Indicator -->
            <div v-if="typing" class="flex space-x-1 p-4 bg-gray-100 rounded-2xl">
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="border-t border-gray-200 dark:border-gray-700 p-6 bg-white/50 dark:bg-gray-800/50">
            <div class="flex space-x-3">
              <input 
                v-model="newMessage" 
                @keyup.enter="sendMessage"
                :disabled="sending"
                placeholder="Reply to employee..."
                class="flex-1 px-5 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-3 focus:ring-blue-500/30 focus:border-transparent transition-all text-lg placeholder-gray-500 resize-none">
              <button 
                @click="sendMessage" 
                :disabled="!newMessage.trim() || sending"
                class="btn-primary px-8 flex items-center text-lg font-bold whitespace-nowrap">
                {{ sending ? 'Sending...' : 'Send' }}
                <svg v-if="!sending" class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLeaveStore } from '@/stores/leave.js'

const router = useRouter()
const store = useLeaveStore()

const activeChat = ref(null)
const messages = ref([])
const newMessage = ref('')
const loading = ref(false)
const sending = ref(false)
const typing = ref(false)

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { 
  month: 'short', day: 'numeric' 
})
const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString([], { 
  hour: '2-digit', minute: '2-digit' 
})

const sendMessage = async () => {
  if (!newMessage.value.trim() || sending.value) return
  
  const message = newMessage.value
  newMessage.value = ''
  sending.value = true
  
  // Add to messages immediately
  messages.value.push({
    id: Date.now(),
    text: message,
    sender: { name: 'Admin', isAdmin: true },
    timestamp: new Date().toISOString(),
    read: true
  })
  
  // Scroll to bottom
  setTimeout(() => {
    const chatBox = document.querySelector('.chat-box')
    chatBox.scrollTop = chatBox.scrollHeight
  }, 100)
  
  sending.value = false
}

const approveChatLeave = async () => {
  loading.value = true
  // API call logic here
  loading.value = false
}

const rejectChatLeave = async () => {
  loading.value = true
  // API call logic here
  loading.value = false
}

const markAllRead = () => {
  messages.value.forEach(msg => msg.read = true)
}

onMounted(() => {
  // Load messages from store or API
  messages.value = [
    { id: 1, text: 'Hi, I need clarification on my sick leave dates.', sender: { name: 'John Doe', isAdmin: false }, timestamp: '2026-01-16T10:30:00Z', unread: true },
    { id: 2, text: 'Can you provide medical certificate?', sender: { name: 'Admin', isAdmin: true }, timestamp: '2026-01-16T10:35:00Z', read: true },
    { id: 3, text: 'Yes, attaching now.', sender: { name: 'John Doe', isAdmin: false }, timestamp: '2026-01-16T10:37:00Z', unread: false }
  ]
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
