// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  routeRules: {
    // prerender index route by default
    "/": { prerender: true },
  },

  modules: ["@nuxt/image", "@nuxt/fonts"],
  compatibilityDate: "2024-12-07",
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Hemocione + CazéTV",
    },
  },
  runtimeConfig: {
    public: {
      webhookToken: process.env.NUXT_PUBLIC_WEBHOOK_TOKEN,
    },
  },
});
