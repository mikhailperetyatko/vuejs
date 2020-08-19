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
              />
              <ErrorMessage
                :messages="errors.color"
              />
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button
                  type="button"
                  aria-label="Убрать один товар"
                  @click.prevent="amount > 1 ? amount-- : 1"
                >
                  <svg
                    width="12"
                    height="12"
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
                    width="12"
                    height="12"
                    fill="currentColor"
                  >
                    <use xlink:href="#icon-plus" />
                  </svg>
                </button>
              </div>
              <button
                class="button button--primery"
                type="submit"
              >
                В корзину
              </button>
              <ErrorMessage
                :messages="errors.amount"
              />
              <b v-if="addToCartSuccess">
                Товар успешно доавлен в корзину!
              </b>
            </div>
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
import validate from '@/helpers/validate';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  components: {
    ProductColors,
    Breadcrumbs,
    ErrorMessage,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      amount: 1,
      currentColor: '',
      errors: {},
      addToCartSuccess: false,
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
    validate,
    numberFormat,
    checkForm() {
      this.errors = {};
      this.errors.color = validate(this.currentColor, 'required|string');
      this.errors.amount = validate(this.amount, 'integer|min:1|max:10');
      return !this.errors.color.length && !this.errors.amount.length;
    },
    addToCart() {
      this.addToCartSuccess = false;
      if (this.checkForm()) {
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
