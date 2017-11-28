import Vue from 'vue';
import App from './App.vue';

//
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
Vue.use(VueMaterial);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'mini' });

new Vue({
    el: '#content',
    render: h => h(App)
});