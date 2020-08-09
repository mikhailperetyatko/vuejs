<template>
  <main
    v-if="product"
    class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a
            class="breadcrumbs__link"
            href="#"
            @click.prevent="gotoPage('main')"
          >
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a
            class="breadcrumbs__link"
            href="#"
            @click.prevent="gotoPage('main', {categoryIds: [category.id]})"
          >
            {{ category.title }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.name }}
          </a>
        </li>
      </ul>
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
          >
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">
                Цвет:
              </legend>
              <ProductColors :colors="product.colors" />
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button
                  type="button"
                  aria-label="Убрать один товар"
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
                  type="text"
                  value="1"
                  name="count"
                >

                <button
                  type="button"
                  aria-label="Добавить один товар"
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
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';

export default {
  components: {
    ProductColors,
  },
  filters: {
    numberFormat,
  },
  props: {
    pageParams: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    product() {
      return products.find((product) => product.id === this.pageParams.id) ?? gotoPage('NotFoundPage');
    },
    category() {
      return categories.find((category) => category.id === this.product.categoryId);
    },
  },
  methods: {
    gotoPage,
    numberFormat,
  },
};
</script>
