<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="_uid + '_' + color">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :value="color" v-model="currentColor">
        <span class="colors__value" :style="'background-color: ' + color"></span>
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ProductColors',
  props: [
    'colors',
  ],
  data() {
    return {
      currentColor: this.colors[0],
    };
  },
};
</script>
