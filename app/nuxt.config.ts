// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    cdnURL: import.meta.env.VITE_CDN_URL,
    head: {
      title: 'Box Office',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          charset: 'utf-8'
        },
        {
          name: 'robots',
          content: import.meta.env.VITE_ROBOTS_TAG
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/ico',
          href: 'https://cdn.joinnus.com/entretenimiento/favicon.ico'
        },
        {
          rel: 'preload',
          href: `${import.meta.env.VITE_CDN_URL}/fonts/Poppins/Poppins-Light.woff2`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: `${import.meta.env.VITE_CDN_URL}/fonts/Poppins/Poppins-Regular.woff2`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: `${import.meta.env.VITE_CDN_URL}/fonts/Poppins/Poppins-Medium.woff2`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: `${import.meta.env.VITE_CDN_URL}/fonts/Poppins/Poppins-SemiBold.woff2`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: `${import.meta.env.VITE_CDN_URL}/fonts/Poppins/Poppins-Bold.woff2`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: `${import.meta.env.VITE_CDN_URL}/fonts/Poppins/Poppins-ExtraBold.woff2`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: `${import.meta.env.VITE_CDN_URL}/fonts/Poppins/Poppins-Black.woff2`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          href: import.meta.env.VITE_CDN_URL,
          rel: 'preconnect',
          crossorigin: 'anonymous'
        },
        {
          href: import.meta.env.VITE_CDN_URL,
          rel: 'dns-prefetch',
          crossorigin: 'anonymous'
        }
      ],
      style: [],
      script: [],
      noscript: []
    }
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['@pinia/nuxt'],
  compatibilityDate: '2024-11-18'
})