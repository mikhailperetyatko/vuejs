<template>
  <Loadable
    method="get"
    :url="`/api/products/${$route.params.id}`"
    @success="productData=$event"
  >
    <template
      v-slot:spinner
    >
      <div style="height:450px">
        <Spinner />
      </div>
    </template>
    <template v-slot:content>
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
                <Loadable
                  :id="product.id"
                  :auto-load="false"
                  spinner-title="Добавляем товар в корзину"
                  spinner-color="white"
                  :status="addProductToCartStatus"
                  :do-func="() => addToCart()"
                />
                <b v-if="productExistsInCart">
                  Товар в Козине.
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
  </Loadable>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';
import Spinner from '@/components/Spinner.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProductAmount from '@/components/ProductAmount.vue';
import { mapActions, mapGetters } from 'vuex';
import Loadable from '@/components/Loadable.vue';
import Cartable from '@/components/Cartable.vue';

export default {
  components: {
    ProductColors,
    Breadcrumbs,
    ProductAmount,
    Spinner,
    Loadable,
  },
  filters: {
    numberFormat,
  },
  extends: Cartable,
  data() {
    return {
      amount: 1,
      currentColor: 0,
      validate: {},
      addToCartSuccess: false,
      addToCartFail: false,
      validatedInfoHidden: true,
      productData: null,
      addingProductToCart: false,
    };
  },
  computed: {
    ...mapGetters({ getProduct: 'product' }),
    productExistsInCart() {
      return this.getProduct({ productId: this.product.id }) !== undefined;
    },
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
  methods: {
    ...mapActions(['addProductToCart']),
    numberFormat,
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
