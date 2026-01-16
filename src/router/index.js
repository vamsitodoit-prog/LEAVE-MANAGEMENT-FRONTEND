import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import AdminChat from './views/AdminChat.vue'
import AdminDashboard from './views/AdminDashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: () => import('./views/Dashboard.vue') },  // Add this
  { path: '/admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin-chat/:leaveId', component: AdminChat, meta: { requiresAuth: true, requiresAdmin: true } }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
