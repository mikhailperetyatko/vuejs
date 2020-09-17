import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    meta: { title: 'Каталог' },
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    meta: { title: 'Страница товара' },
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
  },
  {
    meta: { title: 'Корзина' },
    name: 'cart',
    component: CartPage,
    path: '/cart',
  },
  {
    meta: { title: 'Оформление заказа' },
    name: 'order',
    component: OrderPage,
    path: '/cart/order',
  },
  {
    meta: { title: 'Оформление заказа' },
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/cart/order/:id',
  },
  {
    meta: { title: 'Ошибочный маршрут' },
    name: 'notFound',
    component: NotFoundPage,
    path: '*',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
