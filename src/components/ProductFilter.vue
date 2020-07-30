<template>
<aside class="filter">
  <h2 class="filter__title">Фильтры</h2>
  <form class="filter__form form" action="#" method="get">
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
        <span class="form__value">От</span>
      </label>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категория</legend>
      <label class="form__label form__label--select">
        <select class="form__select" type="text" name="category" v-model.number="currentCategory">
          <option value="0">Все категории</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Цвет</legend>
      <ul class="colors">
        <li class="colors__item" v-for="color in colors" :key="color">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color" :value="color" v-model="currentColor">
            <span class="colors__value" :style="'background-color: ' + color"></span>
          </label>
        </li>
      </ul>
    </fieldset>
    <button class="filter__submit button button--primery" @click.prevent="submit">
      Применить
    </button>
    <button class="filter__reset button button--second" type="button">
      Сбросить
    </button>
  </form>
</aside>
</template>

<script>
import categories from '../data/categories';

export default {
  name: 'ProductFilter',
  data() {
    return {
      currentCategory: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentColor: '',
    };
  },
  props: [
    'colors',
  ],
  computed: {
    categories() {
      return categories;
    },
  },
  methods: {
    submit() {
      this.$emit('update:categoryId', this.currentCategory);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:color', this.currentColor);
    },
  },
};
</script>
