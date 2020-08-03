<template>
<li class="catalog__item">
  <a class="catalog__pic" href="#" @click.prevent="gotoPage('productPage', product.id)">
    <img :src="product.img" :alt="product.name">
  </a>
  <h3 class="catalog__title">
    <a href="#">
      {{ product.name }}
    </a>
  </h3>
  <span class="catalog__price">
    {{ product.price.toLocaleString() }} ₽
  </span>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in product.colors" :key="color">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :value="color" v-model="currentColor">
        <span class="colors__value" :style="'background-color: ' + color">
        </span>
      </label>
    </li>
  </ul>
</li>
</template>
<script>
import eventBus from '@/eventBus';

export default {
  name: 'ProductItem',
  props: [
    'product',
  ],
  data() {
    return {
      currentColor: this.product.colors[0],
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      console.log(eventBus);
      eventBus.$emit('gotoPage', pageName, pageParams);
    },
  },
};
</script>
