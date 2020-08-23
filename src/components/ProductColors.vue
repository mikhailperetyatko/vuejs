<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
    >
    <transition-group
      class="colors"
      tag="ul"
      name="custom-classes-transition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <li
        v-for="color in colors"
        :key="color.id"
        class="colors__item"
      >
        <label class="colors__label">
          <input
            v-if="inputType = 'radio'"
            v-model="currentColor"
            class="colors__radio sr-only"
            type="radio"
            :value="color.id"
            @change.prevent="colorChange"
          >
          <input
            v-else
            v-model="currentColors"
            class="colors__radio sr-only"
            type="checkbox"
            :value="color.id"
            @change.prevent="colorChange"
          >
          <span
            class="colors__value"
            :style="`background-color: ${color.code}`"
          />
        </label>
      </li>
    </transition-group>
    <ErrorMessage
      v-if="!validatedInfoHidden"
      :messages="errors"
    />
  </div>
</template>
<script>
import validate from '@/helpers/validate';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'ProductColors',
  components: {
    ErrorMessage,
  },
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
      type: Number,
      default: () => 0,
    },
    valid: {
      type: Boolean,
      default: false,
    },
    validatedInfoHidden: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentColor: this.colorChecked,
      currentColors: this.colorsChecked,
      currentValid: false,
      errors: [],
    };
  },
  watch: {
    colorChecked() {
      if (!this.colorChecked) this.currentColor = {};
    },
    colorsChecked() {
      if (!this.colorsChecked.length) this.currentColor = [];
    },
    currentColor() {
      this.getValidate();
    },
    errors() {
      this.$emit('update:valid', this.currentValid);
    },
  },
  mounted() {
    this.getValidate();
  },
  methods: {
    colorChange() {
      if (this.inputType === 'checkbox') {
        this.$emit('update:colorsChecked', this.currentColors);
      }
      if (this.inputType === 'radio') {
        this.$emit('update:colorChecked', this.currentColor);
      }
    },
    getValidate() {
      this.errors = validate(this.inputType === 'checkbox' ? this.currentColors : this.currentColor, 'required');
      this.currentValid = !this.errors.length;
    },
  },
};
</script>
