import { createApp } from 'vue';
// import { createPinia } from 'pinia';

import App from './App.vue';
import Previewer from 'virtual:vue-component-preview';

const app = createApp(App);

// app.use(createPinia());

app.use(Previewer);

app.mount('#app')
