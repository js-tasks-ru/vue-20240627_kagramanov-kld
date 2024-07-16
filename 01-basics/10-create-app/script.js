import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
  name: 'Block',

  template: `
    <div>\`Сегодня ${new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })}\`</div>
  `
})

const app = createApp(App)
app.mount('#app');
