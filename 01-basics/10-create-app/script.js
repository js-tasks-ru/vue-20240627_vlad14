import { defineComponent, createApp } from 'vue/dist/vue.esm-browser.js'
const App = defineComponent({
    name: 'App',
    setup() {
        const today = new Date();
        function formatoLocaleTimeString(date) {
            return date.toLocaleDateString(navigator.language, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return {
            today,
            formatoLocaleTimeString,
        }
    },

    template:
        `<div>Сегодня {{formatoLocaleTimeString(today)}}</div>`,
})

const app = createApp(App)

const vm = app.mount('#app')

window.vm = vm