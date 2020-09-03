<template>
  <router-link
    v-if="!loadingInProgress"
    class="header__cart"
    aria-label="Корзина с товарами"
    :to="{ name: 'cart' }"
  >
    <svg
      width="30"
      height="21"
      fill="currentColor"
    >
      <use xlink:href="#icon-cart" />
    </svg>
    <span
      class="header__count"
      aria-label="Количество товаров"
    >
      {{ cartProductAmount | numberFormat }}
    </span>
  </router-link>
  <SpinnerDots
    v-else
    title=""
    color="white"
  />
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import SpinnerDots from '@/components/SpinnerDots.vue';
import Cartable from '@/components/Cartable.vue';

export default {
  components: {
    SpinnerDots,
  },
  filters: {
    numberFormat,
  },
  extends: Cartable,
  computed: {
    cartProductAmount() {
      return this.$store.getters.cartDetailProducts.length;
    },
  },
};
</script>
