<template>
  <aside class="filter">
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
    >
    <h2 class="filter__title">
      Фильтры
    </h2>
    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена
        </legend>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentFilters.minPrice"
            class="form__input"
            type="text"
            name="min-price"
          >
          <span class="form__value">
            От
          </span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentFilters.maxPrice"
            class="form__input"
            type="text"
            name="max-price"
          >
          <span class="form__value">
            До
          </span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Категории
        </legend>
        <button
          class="button button--second"
          type="button"
          @click.prevent="categoryVisible = !categoryVisible"
        >
          {{ categoryVisible ? 'Скрыть' : 'Отобразить' }}
        </button>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <label
            v-if="categoryVisible"
            class="form__label form__label--input"
          >
            <ProductCategories
              :category-checked.sync="currentFilters.categoryId"
            />
          </label>
        </transition>
      </fieldset>

      <fieldset
        class="form__block"
      >
        <legend
          class="form__legend"
        >
          Цвет
        </legend>
        <SpinnerDots
          v-if="loadingColors"
        />
        <div
          v-if="loadingColorsErrors"
        >
          <button
            @click="loadColors()"
          >
            Еще раз
          </button>
        </div>
        <ProductColors
          :color-checked.sync="currentFilters.colorId"
          :colors="colors"
        />
      </fieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import ProductColors from '@/components/ProductColors.vue';
import SpinnerDots from '@/components/SpinnerDots.vue';
import ProductCategories from '@/components/ProductCategories.vue';
import axios from 'axios';
import config from '@/config';

export default {
  name: 'ProductFilter',
  components: {
    ProductColors,
    ProductCategories,
    SpinnerDots,
  },
  props: {
    filters: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentFilters: { ...this.filters },
      categoryVisible: Object.entries(this.filters).filter((filter) => filter[1].length).length,
      colorsData: null,
      loadingColors: false,
      loadingColorsErrors: false,
    };
  },
  computed: {
    colors() {
      return this.colorsData
        ? this.colorsData.items
        : [];
    },
  },
  created() {
    this.loadColors();
  },
  methods: {
    submit() {
      this.$emit('update:filters', {
        ...this.currentFilters,
      });
    },
    reset() {
      this.currentFilters = {};
      this.categoryVisible = false;
      this.$emit('resetPagination');
      this.submit();
    },
    loadColors() {
      this.loadingColors = true;
      this.loadingColorsErrors = false;
      setTimeout(() => {
        axios.get(`${config.BASE_API_URL}/api/colors`)
          .then((response) => {
            this.colorsData = response.data;
          })
          .catch(() => {
            this.loadingColorsErrors = true;
          })
          .then(() => {
            this.loadingColors = false;
          });
      }, 5000);
    },
  },
};
</script>
