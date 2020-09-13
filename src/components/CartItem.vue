<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.img"
        width="120"
        height="120"
        :alt="item.product.title"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
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
    <p
      v-show="updateProductCartStatus === `error:${item.product.id}`"
      style="color:red"
    >
      При изменении товара произошла ошибка, изменения откатились.
    </p>
    <p
      v-show="deleteProductCartStatus === `error:${item.product.id}`"
      style="color:red"
    >
      При удалении товара произошла ошибка, изменения откатились.
    </p>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductAmount from '@/components/ProductAmount.vue';
import Cartable from '@/components/Cartable.vue';

export default {
  components: {
    ProductAmount,
  },
  filters: {
    numberFormat,
  },
  extends: Cartable,
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
      return this.item.colors.find((color) => this.item.color === color.rgb);
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.item.amount = value;
        if (this.validate.amount) {
          this.updateProductCart(
            {
              productId: this.item.product.id,
              amount: value,
            },
          );
        }
      },
    },
  },
  methods: {
    ...mapActions({
      deleteProduct: 'deleteProductCart',
      updateProductCart: 'updateProductCart',
    }),
  },
};
</script>
