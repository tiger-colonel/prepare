import App from './App.vue';
import './index.less';
import LazyLoad from '@fe-vue/lazyload';

Vue.use(LazyLoad, {
    placeholder: 'http://h0.beicdn.com/open201932/5f6a2aac25910dca_100x100.png',
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        App,
    },
    template: '<App/>',
});
