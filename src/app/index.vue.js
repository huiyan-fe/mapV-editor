import Vue from 'vue';
import App from './App.vue';

//
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
Vue.use(VueMaterial);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
    size: 'mini'
});
import store from './store/index.js';
Vue.config.devtools = true;
new Vue({
    el: '#content',
    store,
    render: h => h(App)
});