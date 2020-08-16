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
    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        :class="{ 'pagination__link--disabled': amount == 1 }"
        @click.prevent="amount > 1 ? amount-- : 1"
      >
        <svg
          width="10"
          height="10"
          fill="currentColor"
        >
          <use xlink:href="#icon-minus" />
        </svg>
      </button>
      <input
        v-model.number="amount"
        type="text"
      >
      <button
        type="button"
        aria-label="Добавить один товар"
        @click.prevent="amount++"
      >
        <svg
          width="10"
          height="10"
          fill="currentColor"
        >
          <use xlink:href="#icon-plus" />
        </svg>
      </button>
    </div>
    <b class="product__price">
      {{ item.product.price | numberFormat }} ₽
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

export default {
  filters: {
    numberFormat,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
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
        this.$store.commit(
          'updateCartProduct',
          {
            productId: this.item.product.id,
            color: this.item.color,
            amount: value,
          },
        );
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
