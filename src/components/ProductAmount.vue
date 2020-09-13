<template>
  <div>
    <button
      type="button"
      aria-label="Убрать один товар"
      :class="{ 'pagination__link--disabled': currentAmount == 1 }"
      @click.prevent="currentAmount > 1 ? currentAmount-- : 1"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-minus" />
      </svg>
    </button>
    <input
      v-model.number="currentAmount"
      type="number"
    >
    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="currentAmount++"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-plus" />
      </svg>
    </button>
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
  components: {
    ErrorMessage,
  },
  props: {
    amount: {
      type: Number,
      default: 1,
    },
    valid: {
      type: Boolean,
      default: false,
    },
    validatedInfoHidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentAmount: this.amount ?? 1,
      currentValid: false,
      errors: [],
    };
  },
  watch: {
    amount(value) {
      this.currentAmount = value;
    },
    currentAmount() {
      this.getValidate();
    },
    errors() {
      if (!this.errors.length) {
        this.$emit('update:amount', this.currentAmount);
      }
      this.$emit('update:valid', this.currentValid);
    },
  },
  mounted() {
    this.getValidate();
  },
  methods: {
    getValidate() {
      this.errors = validate(this.currentAmount, 'integer|required|min:1');
      this.currentValid = !this.errors.length;
    },
  },
};
</script>
