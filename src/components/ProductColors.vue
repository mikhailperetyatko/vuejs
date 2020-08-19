<template>
  <div>
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
      type: String,
      default: () => '',
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
      currentColor: '',
      currentValid: false,
      errors: [],
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
    currentColor() {
      this.getValidate();
    },
    errors() {
      this.$emit('update:valid', this.currentValid);
    },
  },
  mounted() {
    this.currentColor = this.emptyValue;
    this.getValidate();
  },
  methods: {
    colorChange() {
      this.$emit(`update:${this.inputType === 'checkbox' ? 'colorsChecked' : 'colorChecked'}`, this.currentColor);
    },
    getValidate() {
      this.errors = validate(this.currentColor, 'required');
      this.currentValid = !this.errors.length;
    },
  },
};
</script>
