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
    orderData: {},
    orderError: {},
    httpStatuses: {
      loadCart: 'pending',
      addProductToCart: 'pending',
      updateProductCart: 'pending',
      deleteProductCart: 'pending',
      cartToOrder: 'pending',
      orderInfo: 'pending',
    },

  },
  getters: {
    getStatus: (state) => (statusName) => state.httpStatuses[statusName],
    getStatuses: (state) => ([...statusesName]) => statusesName
      .reduce((accum, status) => [...accum, state.httpStatuses[status]], []),
    product: (state) => ({ productId }) => (
      getProduct(state, { productId })
    ),
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((el) => el.product.id === item.productId);
        return {
          ...item,
          quantity: item.amount,
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
    order(state) {
      return {
        data: state.orderData,
        error: state.orderError,
      };
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
    setSuccessStatus(state, { statusName, id }) {
      state.httpStatuses[statusName] = `success${id ? `:${id}` : ''}`;
    },
    setErrorStatus(state, { statusName, id }) {
      state.httpStatuses[statusName] = `error${id ? `:${id}` : ''}`;
    },
    setPendingStatus(state, { statusName, id }) {
      state.httpStatuses[statusName] = `pending${id ? `:${id}` : ''}`;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    resetOrder(state) {
      state.orderData = {};
      state.orderError = {};
    },
    updateOrderData(state, response) {
      state.orderData = response;
    },
    updateOrderError(state, error) {
      state.orderError = error;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('setPendingStatus', { statusName: 'loadCart' });
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
          context.commit('setSuccessStatus', { statusName: 'loadCart' });
        })
        .catch(() => {
          context.commit('setErrorStatus', { statusName: 'loadCart' });
        });
    },
    addProductToCart(context, { productId, amount }) {
      context.commit('setPendingStatus', { statusName: 'addProductToCart', id: productId });
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
          context.commit('setSuccessStatus', { statusName: 'addProductToCart', id: productId });
        })
        .catch(() => {
          context.commit('setErrorStatus', { statusName: 'addProductToCart', id: productId });
        });
    },
    updateProductCart(context, { productId, amount }) {
      context.commit('setPendingStatus', { statusName: 'updateProductCart', id: productId });
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
          context.commit('setSuccessStatus', { statusName: 'updateProductCart', id: productId });
        })
        .catch(() => {
          context.commit('syncCartProducts');
          context.commit('setErrorStatus', { statusName: 'updateProductCart', id: productId });
        });
    },
    deleteProductCart(context, { productId }) {
      context.commit('setPendingStatus', { statusName: 'deleteProductCart', id: productId });
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
          context.commit('setSuccessStatus', { statusName: 'deleteProductCart', id: productId });
        })
        .catch(() => {
          context.commit('syncCartProducts');
          context.commit('setErrorStatus', { statusName: 'deleteProductCart', id: productId });
        });
    },
    cartToOrder(context, requestBody) {
      context.commit('setPendingStatus', { statusName: 'cartToOrder' });
      context.commit('resetOrder');
      return HTTP({
        method: 'post',
        url: '/api/orders',
        params: { userAccessKey: context.state.userAccessKey },
        data: {
          ...requestBody,
        },
      })
        .then((response) => {
          context.commit('setSuccessStatus', { statusName: 'cartToOrder' });
          context.commit('updateOrderData', response.data);
          context.commit('resetCart');
        })
        .catch((error) => {
          context.commit('setErrorStatus', { statusName: 'cartToOrder' });
          context.commit('updateOrderError', error.response.data.error);
        });
    },
    loadOrderInfo(context, orderId) {
      context.commit('setPendingStatus', { statusName: 'orderInfo' });
      return HTTP({
        method: 'get',
        url: `/api/orders/${orderId}`,
        params: { userAccessKey: context.state.userAccessKey },
      })
        .then((response) => {
          context.commit('setSuccessStatus', { statusName: 'orderInfo' });
          context.commit('updateOrderData', response.data);
        })
        .catch((error) => {
          context.commit('setErrorStatus', { statusName: 'orderInfo' });
          context.commit('updateOrderError', error.response.data.error);
        });
    },
  },
});
