import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';
import getProduct from '@/helpers/getProduct';
import localStoragePlugin from '@/store/plugins/localStoragePlugin';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: JSON.parse(localStorage.getItem('cartProducts') ?? '[]'),
  },
  getters: {
    product: (state) => ({ productId, color }) => (
      getProduct(state, { productId, color })
    ),
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => (
        {
          ...item,
          product: products.find((product) => product.id === item.productId) ?? {},
        }
      ));
    },
    totalCartPrice(state, getters) {
      return getters.cartDetailProducts.reduce((total, item) => (total + item.product.price * item.amount), 0);
    },
  },
  mutations: {
    addProductToCart(state, { productId, color, amount }) {
      const product = getProduct(state, { productId, color });
      if (product) product.amount += +amount;
      else state.cartProducts.push({ productId, amount, color });
    },
    updateCartProduct(state, { productId, color, amount }) {
      const product = getProduct(state, { productId, color });
      if (product) product.amount = amount;
    },
    deleteCartProduct(state, { productId, color }) {
      state.cartProducts = state.cartProducts.filter((item) => (
        item.productId !== productId
        || item.color !== color
      ));
    },
  },
  plugins: [
    localStoragePlugin,
  ],
});
