<template>
  <Loadable
    :auto-load="false"
    spinner-title=""
    spinner-color="green"
    :forced-loading-in-progress="loadingInProgress"
    :forced-load-failed="loadFailed"
  >
    <template v-slot:content>
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
    </template>
  </Loadable>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import Cartable from '@/components/Cartable.vue';
import Loadable from '@/components/Loadable.vue';

export default {
  components: {
    Loadable,
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
