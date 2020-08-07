<template>
<aside class="filter">
  <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
  <h2 class="filter__title">Фильтры</h2>
  <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" v-model.number="currentFilters.priceFrom">
        <span class="form__value">От</span>
      </label>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price" v-model.number="currentFilters.priceTo">
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категории</legend>
      <button class="button button--second" type="button" @click.prevent="categoryVisible = !categoryVisible">{{ categoryVisible ? 'Скрыть' : 'Отобразить' }}</button>
      <transition name="custom-classes-transition" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
        <label class="form__label form__label--input" v-if="categoryVisible">
          <div v-for="category in categories" :key="category.id" >
            <input type="checkbox" :value="category.id" :name="'category' + category.id" v-model="currentFilters.categoryIds">
            {{ category.title }}
          </div>
        </label>
      </transition>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Цвет</legend>
      <ProductColors :color-checked.sync="currentFilters.colors"
        :colors="colors"
        :input-type="'checkbox'"
      />
    </fieldset>

    <button class="filter__submit button button--primery" type="submit">
      Применить
    </button>
    <button class="filter__reset button button--second" type="button" @click.prevent="reset">
      Сбросить
    </button>
  </form>
</aside>
</template>

<script>
import categories from '@/data/categories';
import ProductColors from '@/components/ProductColors.vue';

export default {
  name: 'ProductFilter',
  props: [
    'colors',
    'filters',
  ],
  data() {
    return {
      currentFilters: { ...this.filters },
      categoryVisible: Object.entries(this.filters).filter((filter) => filter[1].length).length,
    };
  },
  computed: {
    categories() {
      return categories;
    },
  },
  mounted() {
    this.emptyFilters = Object.fromEntries(Object.entries(this.filters).map((filter) => {
      const element = { ...filter };
      switch (typeof element[1]) {
        case 'number':
          element[1] = 0;
          break;
        case 'string':
          element[1] = '';
          break;
        default:
          element[1] = [];
      }
      return element;
    }));
  },
  methods: {
    submit() {
      this.$emit('update:filters', { ...this.currentFilters });
    },
    reset() {
      this.currentFilters = { ...this.emptyFilters };
      this.$emit('resetPagination');
      this.submit();
    },
  },
  components: {
    ProductColors,
  },
};
</script>
