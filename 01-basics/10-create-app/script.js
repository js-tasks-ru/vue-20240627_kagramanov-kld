import { defineComponent, createApp, ref } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
  name: 'App',

  setup() {
    const today = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    let dateNow = ref(today)

    setInterval(() => {
      dateNow.value = today
    }, 3600000)

    return {
      dateNow
    }
  },

  template: `
    <div>Сегодня {{ dateNow }}</div>
  `
})

const app = createApp(App)
app.mount('#app');
