import Vue from 'vue';
import App from './App.vue';
import { message1, message2 } from './first_data';
import alertThis from './second_data';

alertThis(message1);
alertThis(message2);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
