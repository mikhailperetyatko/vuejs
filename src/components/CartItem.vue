<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.img"
        width="120"
        height="120"
        :alt="item.product.name"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.name }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="`background-color: ${item.color}`" />
        {{ currentColor.title }}
      </span>
    </p>
    <span class="product__code">
      {{ item.product.id }}
    </span>
    <ProductAmount
      :amount.sync="amount"
      :valid.sync="validate.amount"
      class="product__counter form__counter"
    />
    <b class="product__price">
      <span>{{ item.product.price | numberFormat }} ₽</span>
    </b>
    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct({
        productId: item.product.id,
        color: item.color,
      })"
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
      >
        <use xlink:href="#icon-close" />
      </svg>
    </button>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import colors from '@/data/colors';
import { mapMutations } from 'vuex';
import ProductAmount from '@/components/ProductAmount.vue';

export default {
  components: {
    ProductAmount,
  },
  filters: {
    numberFormat,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      errors: {},
      validate: {},
    };
  },
  computed: {
    currentColor() {
      return colors.find((color) => this.item.color === color.rgb);
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.item.amount = value;
        if (this.validate.amount) {
          this.$store.commit(
            'updateCartProduct',
            {
              productId: this.item.product.id,
              color: this.item.color,
              amount: value,
            },
          );
        }
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
