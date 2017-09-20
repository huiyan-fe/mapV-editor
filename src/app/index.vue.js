import Vue from 'vue';
import App from './App.vue';

//
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use(VueMaterial);

new Vue({
    el: '#content',
    render: h => h(App)
});