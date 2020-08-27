<template>
  <div
    v-if="loadingProduct"
    style="height:400px"
  >
    <Spinner />
  </div>
  <div
    v-else-if="loadingProductFail"
    style="height:400px"
  >
    Произошла ошибка
    <button @click="loadProduct()">
      Еще раз
    </button>
  </div>
  <div v-else>
    <main
      v-if="Object.keys(product).length"
      class="content container"
    >
      <div class="content__top">
        <Breadcrumbs
          :links="breadcrumbs"
        />
      </div>
      <section class="item">
        <div class="item__pics pics">
          <div
            v-if="product.image"
            class="pics__wrapper"
          >
            <img
              width="370"
              height="370"
              :src="product.image.file.url"
              :alt="product.title"
            >
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">
            Артикул: {{ product.id }}
          </span>
          <h2 class="item__title">
            {{ product.title }}
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
                :disabled="addingProductToCart"
              >
                В корзину
              </button>
              <SpinnerDots
                v-show="addingProductToCart"
                title="Добавляем товар в корзину"
              />
              <b v-show="addToCartSuccess">
                Товар успешно доавлен в корзину!
              </b>
              <b v-show="addToCartFail">
                При добавлении товара в корзину произошла ошибка, попробуйте еще раз.
              </b>
            </form>
          </div>
        </div>
      </section>
    </main>
    <h3 v-else>
      Запрошенный товар не найден
    </h3>
  </div>
</template>
<script>
import { BASE_API_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';
import Spinner from '@/components/Spinner.vue';
import SpinnerDots from '@/components/SpinnerDots.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProductAmount from '@/components/ProductAmount.vue';
import axios from 'axios';
import { mapActions } from 'vuex';
import timeoutWithPromise from '@/helpers/timeoutWithPromise';

export default {
  components: {
    ProductColors,
    Breadcrumbs,
    ProductAmount,
    Spinner,
    SpinnerDots,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      amount: 1,
      currentColor: 0,
      validate: {},
      addToCartSuccess: false,
      addToCartFail: false,
      validatedInfoHidden: true,
      productData: null,
      loadingProduct: false,
      loadingProductFail: false,
      addingProductToCart: false,

    };
  },
  computed: {
    product() {
      return this.productData ?? {};
    },
    category() {
      return this.productData
        ? this.productData.category
        : {};
    },
    breadcrumbs() {
      return [
        {
          description: 'Каталог',
          data: { name: 'main' },
        },
        {
          description: this.category.title,
          data: { name: 'main', params: { filters: { categoryId: this.category.id } } },
        },
        {
          description: this.product.name,
          data: {},
        },
      ];
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    numberFormat,
    loadProduct() {
      this.loadingProduct = true;
      this.loadingProductFail = false;
      return timeoutWithPromise()
        .then(() => {
          axios.get(`${BASE_API_URL}/api/products/${+this.$route.params.id}`)
            .then((response) => {
              this.productData = response.data;
            })
            .catch(() => {
              this.loadingProductFail = true;
            })
            .then(() => {
              this.loadingProduct = false;
            });
        });
    },
    addToCart() {
      this.validatedInfoHidden = false;
      this.addToCartSuccess = false;
      this.addToCartFail = false;
      if (Object.values(this.validate).indexOf(false) === -1) {
        this.addingProductToCart = true;
        this.addProductToCart(
          {
            productId: this.product.id,
            amount: this.amount,
          },
        )
          .then(() => {
            this.addToCartSuccess = true;
          })
          .catch(() => {
            this.addToCartFail = true;
          })
          .then(() => {
            this.addingProductToCart = false;
          });
      }
    },
  },
};
</script>
