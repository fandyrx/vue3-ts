let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://123.207.32.32:8000/'
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://bookbook.cc/api/vue3-ts-cms'
} else {
  BASE_URL = 'http://httpbin.org'
}

export { BASE_URL, TIME_OUT }
