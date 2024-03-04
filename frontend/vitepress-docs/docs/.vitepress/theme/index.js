import { createPinia } from 'pinia';
import DefaultTheme from "@/layout";
import commonComponent from '@vcomp/common';
import vue3GoogleLogin from 'vue3-google-login'
import 'virtual:svg-icons-register'; // Important
import '@css/vibe.sass';


export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // register global components
    app.use(createPinia());
    app.use(commonComponent);
    app.use(vue3GoogleLogin, {
      clientId: '445840120209-mq2pi8lp3bu8crgelf0tt22b4d5lqvqe.apps.googleusercontent.com'
    })
    // app.component('Layout', DefaultTheme);

    // register website and lp page components

    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },
};
