<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color">
      <label class="colors__label">
        <input class="colors__radio sr-only" v-model="currentColor"
          :type="inputType"
          :value="color"
          @change="colorChange"
        >
        <span class="colors__value" :style="'background-color: ' + color"></span>
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ProductColors',
  props: {
    colors: {},
    inputType: {
      default: 'radio',
    },
    colorChecked: {},
  },
  data() {
    return {
      currentColor: '',
    };
  },
  mounted() {
    this.currentColor = this.emptyValue;
  },
  computed: {
    emptyValue() {
      return this.inputType === 'checkbox' ? [] : '';
    },
  },
  methods: {
    colorChange() {
      this.$emit('update:colorChecked', this.currentColor);
    },
  },
  watch: {
    colorChecked() {
      if (!this.colorChecked.length) this.currentColor = this.emptyValue;
    },
  },
};
</script>
