import Vue from 'vue';
import Vuex from 'vuex';
import getProduct from '@/helpers/getProduct';
import HTTP from '@/http-common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    httpStatuses: {
      loadCart: null,
      addProductToCart: null,
      updateProductCart: null,
      deleteProductCart: null,
    },
  },
  getters: {
    getStatus: (state) => ({ statusName }) => state.httpStatuses[statusName],
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
    setLoadStatus(state, { statusName }) {
      state.httpStatuses[statusName] = 'loading';
    },
    setFailStatus(state, { statusName }) {
      state.httpStatuses[statusName] = 'faild';
    },
    cancelStatus(state, { statusName }) {
      state.httpStatuses[statusName] = null;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('setLoadStatus', { statusName: 'loadCart' });
      return HTTP({
        method: 'get',
        url: '/api/baskets',
        params: { userAccessKey: context.state.userAccessKey },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
          context.commit('cancelStatus', { statusName: 'loadCart' });
        })
        .catch(() => {
          context.commit('setFailStatus', { statusName: 'loadCart' });
        });
    },
    addProductToCart(context, { productId, amount }) {
      context.commit('setLoadStatus', { statusName: 'addProductToCart' });
      return HTTP({
        method: 'post',
        url: '/api/baskets/products',
        params: { userAccessKey: context.state.userAccessKey },
        data: {
          productId,
          quantity: amount,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
          context.commit('cancelStatus', { statusName: 'addProductToCart' });
        })
        .catch(() => {
          context.commit('setFailStatus', { statusName: 'addProductToCart' });
        });
    },
    updateProductCart(context, { productId, amount }) {
      context.commit('setLoadStatus', { statusName: 'updateProductCart' });
      context.commit('updateCartProduct', { productId, amount });
      return HTTP({
        method: 'put',
        url: '/api/baskets/products',
        params: { userAccessKey: context.state.userAccessKey },
        data: {
          productId,
          quantity: amount,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('cancelStatus', { statusName: 'updateCartProductsData' });
        })
        .catch(() => {
          context.commit('syncCartProducts');
          context.commit('setFailStatus', { statusName: 'updateProductCart' });
        });
    },
    deleteProductCart(context, { productId }) {
      context.commit('setLoadStatus', { statusName: 'deleteProductCart' });
      context.commit('deleteCartProduct', { productId });
      return HTTP({
        method: 'delete',
        url: '/api/baskets/products',
        params: { userAccessKey: context.state.userAccessKey },
        data: {
          productId,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('cancelStatus', { statusName: 'deleteProductCart' });
        })
        .catch(() => {
          context.commit('syncCartProducts');
          context.commit('setFailStatus', { name: 'deleteProductCart', value: true });
        });
    },
  },
});
