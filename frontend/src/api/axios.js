import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle 401 gracefully and retry once without stale tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')

      if (originalRequest && !originalRequest._retry) {
        originalRequest._retry = true
        delete originalRequest.headers.Authorization
        return api(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

export default api