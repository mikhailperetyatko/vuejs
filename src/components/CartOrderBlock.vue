<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <CartOrderItem
        v-for="item in products"
        :key="item.product.id"
        :item="item"
      />
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ totalCartItems | amountFormat(['позиция', 'позиции', 'позиций']) }}</b> ({{ totalCartProducts | amountFormat }}) на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
    <slot />
  </div>
</template>
<script>
import CartOrderItem from '@/components/CartOrderItem.vue';
import numberFormat from '@/helpers/numberFormat';
import amountFormat from '@/helpers/amountFormat';

export default {
  components: {
    CartOrderItem,
  },
  filters: {
    numberFormat,
    amountFormat,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalCartItems: {
      type: Number,
      default: 0,
    },
    totalCartProducts: {
      type: Number,
      default: 0,
    },
  },
};
</script>
