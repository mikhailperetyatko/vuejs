import Vue from 'vue';
import Vuex from 'vuex';
import getProduct from '@/helpers/getProduct';
import axios from 'axios';
import { BASE_API_URL } from '@/config';
import timeoutWithPromise from '@/helpers/timeoutWithPromise';

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
      return axios.get(`${BASE_API_URL}/api/baskets`, {
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
    addProductToCart(context, { productId, amount }) {
      return timeoutWithPromise()
        .then(() => {
          axios.post(
            `${BASE_API_URL}/api/baskets/products`,
            {
              productId,
              quantity: amount,
            },
            {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            },
          )
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateProductCart(context, { productId, amount }) {
      context.commit('updateCartProduct', { productId, amount });
      return axios.put(
        `${BASE_API_URL}/api/baskets/products`,
        {
          productId,
          quantity: amount,
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        },
      )
        .then((response) => context.commit('updateCartProductsData', response.data.items))
        .catch(() => context.commit('syncCartProducts'));
    },
    deleteProductCart(context, { productId }) {
      context.commit('deleteCartProduct', { productId });
      return axios({
        method: 'delete',
        url: `${BASE_API_URL}/api/baskets/products`,
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: {
          productId,
        },
      })
        .then((response) => context.commit('updateCartProductsData', response.data.items))
        .catch(() => context.commit('syncCartProducts'));
    },
  },
});
