import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import AdminChat from './views/AdminChat.vue'
import AdminDashboard from './views/AdminDashboard.vue'
import AdminRequests from './views/AdminRequests.vue'  // NEW
import Dashboard from './views/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin-requests', component: AdminRequests, meta: { requiresAuth: true, requiresAdmin: true } },  // NEW
  { path: '/admin-chat/:leaveId', component: AdminChat, meta: { requiresAuth: true, requiresAdmin: true } }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
