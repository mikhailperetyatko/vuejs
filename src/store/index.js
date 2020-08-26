import Vue from 'vue';
import Vuex from 'vuex';
import getProduct from '@/helpers/getProduct';
import axios from 'axios';
import { BASE_API_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  getters: {
    product: (state) => ({ productId }) => (
      getProduct(state, { productId })
    ),
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((el) => el.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            img: product.image.file.url,
          },
        };
      });
    },
    totalCartPrice(state, getters) {
      return getters.cartDetailProducts.reduce((total, item) => (total + item.product.price * item.amount), 0);
    },
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const product = getProduct(state, { productId });
      if (product) product.amount += +amount;
      else state.cartProducts.push({ productId, amount });
    },
    updateCartProduct(state, { productId, amount }) {
      const product = getProduct(state, { productId });
      if (product) product.amount = amount;
    },
    deleteCartProduct(state, { productId }) {
      state.cartProducts = state.cartProducts.filter((item) => (
        item.productId !== productId
      ));
    },
    updateUserAccessKey(state, token) {
      state.userAccessKey = token;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  actions: {
    loadCart(context) {
      axios.get(`${BASE_API_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
