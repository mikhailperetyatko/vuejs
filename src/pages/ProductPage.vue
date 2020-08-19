<template>
  <main
    v-if="product"
    class="content container"
  >
    <div class="content__top">
      <Breadcrumbs
        :links="breadcrumbs"
      />
    </div>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="370"
            height="370"
            :src="product.img"
            :alt="product.name"
          >
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">
          Артикул: {{ product.id }}
        </span>
        <h2 class="item__title">
          {{ product.name }}
        </h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCart()"
          >
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">
                Цвет:
              </legend>
              <ProductColors
                :colors="product.colors"
                :color-checked.sync="currentColor"
                :valid.sync="validate.color"
                :validated-info-hidden="validatedInfoHidden"
              />
            </fieldset>

            <div class="item__row">
              <ProductAmount
                :amount.sync="amount"
                :valid.sync="validate.amount"
                :validated-info-hidden="validatedInfoHidden"
                class="form__counter"
              />
            </div>
            <button
              class="button button--primery"
              type="submit"
              style="margin-top:20px;width:100%"
            >
              В корзину
            </button>
            <b v-if="addToCartSuccess">
              Товар успешно доавлен в корзину!
            </b>
          </form>
        </div>
      </div>
    </section>
  </main>
  <h3 v-else>
    Запрошенный товар не найден
  </h3>
</template>
<script>
import products from '@/data/products';
import categories from '@/data/categories';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProductAmount from '@/components/ProductAmount.vue';

export default {
  components: {
    ProductColors,
    Breadcrumbs,
    ProductAmount,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      amount: 1,
      currentColor: '',
      validate: {},
      addToCartSuccess: false,
      validatedInfoHidden: true,
    };
  },
  computed: {
    product() {
      return products.find((product) => product.id === +this.$route.params.id);
    },
    category() {
      return categories.find((category) => category.id === this.product.categoryId);
    },
    breadcrumbs() {
      return [
        {
          description: 'Каталог',
          data: { name: 'main' },
        },
        {
          description: this.category.title,
          data: { name: 'main', params: { filters: { categoryIds: [this.category.id] } } },
        },
        {
          description: this.product.name,
          data: {},
        },
      ];
    },
  },
  methods: {
    numberFormat,
    addToCart() {
      this.validatedInfoHidden = false;
      if (Object.values(this.validate).indexOf(false) === -1) {
        this.$store.commit(
          'addProductToCart',
          {
            productId: this.product.id,
            amount: this.amount,
            color: this.currentColor,
          },
        );
        this.addToCartSuccess = true;
      }
    },
  },
};
</script>
