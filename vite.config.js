const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ['blogs.html']: resolve(__dirname, 'blogs.html'),
        ['guide.html']: resolve(__dirname, 'guide.html'),
        ['about_us.html']: resolve(__dirname, 'about_us.html'),
        ['college_finder_iit.html']: resolve(__dirname, 'college_finder_iit.html'),
        ['college_finder_nit_and_iiit.html']: resolve(__dirname, 'college_finder_nit_and_iiit.html'),
        ['college_info.html']: resolve(__dirname, 'college_info.html'),
      }
    }
  }
})