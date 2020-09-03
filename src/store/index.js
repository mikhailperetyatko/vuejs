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
    axiosStatuses: [
      {
        name: 'loadCart',
        statuses: {
          loading: false,
          failed: false,
        },
      },
      {
        name: 'addProductToCart',
        statuses: {
          loading: false,
          failed: false,
        },
      },
      {
        name: 'updateProductCart',
        statuses: {
          loading: false,
          failed: false,
        },
      },
      {
        name: 'deleteProductCart',
        statuses: {
          loading: false,
          failed: false,
        },
      },
    ],
  },
  getters: {
    getStatus: (state) => ({ statusName }) => state.axiosStatuses.find((item) => item.name === statusName),
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
    setLoadStatus(state, status) {
      state.axiosStatuses.find((item) => item.name === status.name).statuses.loading = status.value;
    },
    setFailStatus(state, status) {
      state.axiosStatuses.find((item) => item.name === status.name).statuses.failed = status.value;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('setLoadStatus', { name: 'loadCart', value: true });
      context.commit('setFailStatus', { name: 'loadCart', value: false });
      return timeoutWithPromise()
        .then(() => {
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
            })
            .catch(() => {
              context.commit('setFailStatus', { name: 'loadCart', value: true });
            })
            .then(() => {
              context.commit('setLoadStatus', { name: 'loadCart', value: false });
            });
        });
    },
    addProductToCart(context, { productId, amount }) {
      context.commit('setLoadStatus', { name: 'addProductToCart', value: true });
      context.commit('setFailStatus', { name: 'addProductToCart', value: false });
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
            })
            .catch(() => {
              context.commit('setFailStatus', { name: 'addProductToCart', value: true });
            })
            .then(() => {
              context.commit('setLoadStatus', { name: 'addProductToCart', value: false });
            });
        });
    },
    updateProductCart(context, { productId, amount }) {
      context.commit('setLoadStatus', { name: 'updateProductCart', value: true });
      context.commit('setFailStatus', { name: 'updateProductCart', value: false });
      context.commit('updateCartProduct', { productId, amount });
      return timeoutWithPromise()
        .then(() => {
          axios.put(
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
            .catch(() => {
              context.commit('syncCartProducts');
              context.commit('setFailStatus', { name: 'updateProductCart', value: true });
            })
            .then(() => {
              context.commit('setLoadStatus', { name: 'updateProductCart', value: false });
            });
        });
    },
    deleteProductCart(context, { productId }) {
      context.commit('setLoadStatus', { name: 'deleteProductCart', value: true });
      context.commit('setFailStatus', { name: 'deleteProductCart', value: false });
      context.commit('deleteCartProduct', { productId });
      return timeoutWithPromise()
        .then(() => {
          axios({
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
            .catch(() => {
              context.commit('syncCartProducts');
              context.commit('setFailStatus', { name: 'deleteProductCart', value: true });
            })
            .then(() => {
              context.commit('setLoadStatus', { name: 'deleteProductCart', value: false });
            });
        });
    },
  },
});
