export default defineNuxtConfig({
  compatibilityDate: '2025-09-28',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Abang AI Hub',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Browse articles, buy digital products, and open your member library in Abang AI Hub.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap'
        }
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('abang-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          type: 'text/javascript',
          tagPosition: 'head'
        }
      ]
    }
  },
  runtimeConfig: {
    adminEmails: '',
    resendApiKey: '',
    resendFrom: 'Abang AI Hub <receipts@example.com>',
    toyyibpaySecretKey: '',
    toyyibpayCategoryCode: '',
    oauth: {
      google: {
        clientId: '',
        clientSecret: ''
      }
    },
    public: {
      siteUrl: 'http://localhost:3000'
    }
  }
})
