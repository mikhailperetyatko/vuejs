<template>
  <li
    class="cart__order"
  >
    <h3>{{ item.product.title }}</h3>
    <b>{{ totalPrice | numberFormat }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
    <span>Количество: {{ item.amount | numberFormat }}</span>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';

export default {
  filters: {
    numberFormat,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(['totalCartItemPrice']),
    totalPrice() {
      return this.totalCartItemPrice(this.item.product.id);
    },
  },
};
</script>
