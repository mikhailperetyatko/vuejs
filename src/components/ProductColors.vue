<template>
  <ul class="colors">
    <li
      v-for="color in colors"
      :key="color"
      class="colors__item"
    >
      <label class="colors__label">
        <input
          v-model="currentColor"
          class="colors__radio sr-only"
          :type="inputType"
          :value="color"
          @change.prevent="colorChange"
        >
        <span
          class="colors__value"
          :style="`background-color: ${color}`"
        />
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ProductColors',
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
    inputType: {
      type: String,
      default: () => 'radio',
    },
    colorsChecked: {
      type: Array,
      default: () => [],
    },
    colorChecked: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      currentColor: '',
    };
  },
  computed: {
    emptyValue() {
      return this.inputType === 'checkbox' ? [] : '';
    },
  },
  watch: {
    colorChecked() {
      if (!this.colorChecked) this.currentColor = '';
    },
    colorsChecked() {
      if (!this.colorsChecked.length) this.currentColor = [];
    },
  },
  mounted() {
    this.currentColor = this.emptyValue;
  },
  methods: {
    colorChange() {
      this.$emit(`update:${this.inputType === 'checkbox' ? 'colorsChecked' : 'colorChecked'}`, this.currentColor);
    },
  },
};
</script>
