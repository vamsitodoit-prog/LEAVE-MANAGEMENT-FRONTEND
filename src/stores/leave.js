import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

export const useLeaveStore = defineStore('leave', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAdmin: localStorage.getItem('isAdmin') === 'true'
  }),
  actions: {
    setToken(token) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    },
    setUser(user, isAdmin = false) {
      this.user = user
      this.isAdmin = isAdmin
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAdmin', isAdmin.toString())
    },
    async login(credentials) {
      try {
        await new Promise(r => setTimeout(r, 1000))
        
        // Mock different users
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          this.setToken('mock-admin-jwt')
          this.setUser({ name: 'Administrator', email: 'admin@leavehub.com' }, true)
          return true
        } else {
          this.setToken('mock-user-jwt')
          this.setUser({ name: credentials.username, email: `${credentials.username}@company.com` })
          return true
        }
      } catch {
        return false
      }
    },
    logout() {
      this.setToken(null)
      this.setUser(null, false)
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    requiresAdmin: (state) => state.isAdmin
  }
})
