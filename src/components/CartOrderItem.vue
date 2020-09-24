<template>
  <li
    class="cart__order"
  >
    <h3>{{ item.product.title }}</h3>
    <b>{{ totalPrice | numberFormat }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
    <span>Количество: {{ item.quantity | numberFormat }}</span>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';

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
    totalPrice() {
      return this.item.quantity * this.item.product.price;
    },
  },
};
</script>
