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
            v-model.number="currentFilters.priceFrom"
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
            v-model.number="currentFilters.priceTo"
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
            <ProductCategories :categories-checked.sync="currentFilters.categoryIds" />
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
        <ProductColors
          :colors-checked.sync="currentFilters.colors"
          :colors="colors"
          :input-type="'checkbox'"
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
import ProductCategories from '@/components/ProductCategories.vue';

export default {
  name: 'ProductFilter',
  components: {
    ProductColors,
    ProductCategories,
  },
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentFilters: { ...this.filters },
      categoryVisible: Object.entries(this.filters).filter((filter) => filter[1].length).length,
    };
  },
  methods: {
    submit() {
      this.$emit('update:filters', { ...this.currentFilters });
    },
    reset() {
      this.currentFilters = {};
      this.categoryVisible = false;
      this.$emit('resetPagination');
      this.submit();
    },
  },
};
</script>
