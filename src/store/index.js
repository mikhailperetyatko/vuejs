import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 3 },
      { productId: 2, amount: 2 },
      { productId: 3, amount: 1 },
      { productId: 4, amount: 1 },
    ],
  },
});
