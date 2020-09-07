<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: {id: product.id} }"
    >
      <img
        :src="product.img"
        :alt="product.title"
        style="width:100%;height:100%;object-fit:contain;"
      >
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>
    <fieldset class="form__block">
      <legend class="form__legend">
        Цвет:
      </legend>
      <ProductColors
        :colors="product.colors"
        :color-checked.sync="currentColor"
      />
    </fieldset>
    <Loadable
      :auto-load="false"
      spinner-title="Добавляем товар в корзину"
      :forced-loading-in-progress="loadingInProgress && addToCartProductId !== null"
      :forced-load-failed="loadFailed && addToCartProductId !== null"
    />
    <b v-if="productExistsInCart">
      Товар в
      <router-link
        :to="{ name: 'cart' }"
      >
        Козине
      </router-link>
    </b>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';
import { mapGetters, mapActions } from 'vuex';
import Loadable from '@/components/Loadable.vue';
import Cartable from '@/components/Cartable.vue';

export default {
  name: 'ProductItem',
  components: {
    ProductColors,
    Loadable,
  },
  filters: {
    numberFormat,
  },
  extends: Cartable,
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentColor: 0,
      addToCartProductId: null,
    };
  },
  computed: {
    ...mapGetters({ getProduct: 'product' }),
    productExistsInCart() {
      return this.getProduct({ productId: this.product.id }) !== undefined;
    },
  },
  watch: {
    currentColor() {
      this.addToCart();
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart() {
      this.addToCartProductId = this.product.id;
      this.addProductToCart(
        {
          productId: this.product.id,
          amount: 1,
        },
      );
    },
  },
};
</script>
