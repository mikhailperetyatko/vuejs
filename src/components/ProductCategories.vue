<template>
  <SpinnerDots
    v-if="loadingCategories"
  />
  <div
    v-else-if="loadingCategoriesFail"
  >
    <button @click="loadCategories()">
      Еще раз
    </button>
  </div>
  <div
    v-else
  >
    <div
      v-for="category in categories"
      :key="category.id"
    >
      <label>
        <input
          v-if="inputType === 'checkbox'"
          v-model="currentCategories"
          type="checkbox"
          :value="category.id"
          @change="categoryChange()"
        >
        <input
          v-else
          v-model="currentCategory"
          type="radio"
          :value="category.id"
          @change="categoryChange()"
        >
        {{ category.title }}
      </label>
    </div>
  </div>
</template>
<script>
import SpinnerDots from '@/components/SpinnerDots.vue';
import axios from 'axios';
import { BASE_API_URL } from '@/config';

export default {
  name: 'ProductCategories',
  components: {
    SpinnerDots,
  },
  props: {
    categoriesChecked: {
      type: Array,
      default: () => [],
    },
    categoryChecked: {
      type: Number,
      default: () => 0,
    },
    inputType: {
      type: String,
      default: 'radio',
    },
  },
  data() {
    return {
      currentCategories: this.categoriesChecked,
      currentCategory: this.categoryChecked,
      categoriesData: null,
      loadingCategories: false,
      loadingCategoriesFail: false,
    };
  },
  computed: {
    categories() {
      return this.categoriesData
        ? this.categoriesData.items
        : [];
    },
  },
  watch: {
    categoriesChecked() {
      if (!this.categoriesChecked.length) this.currentCategories = [];
      if (!Object.keys(this.categoryChecked).length) this.currentCategory = {};
    },
  },
  created() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      this.loadingCategories = true;
      this.loadingCategoriesFail = false;
      setTimeout(() => {
        axios.get(`${BASE_API_URL}/api/productCategories`)
          .then((response) => {
            this.categoriesData = response.data;
          })
          .catch(() => {
            this.loadingCategoriesFail = true;
          })
          .then(() => {
            this.loadingCategories = false;
          });
      }, 2000);
    },
    categoryChange() {
      if (this.inputType === 'checkbox') {
        this.$emit('update:categoriesChecked', this.currentCategories);
      }
      if (this.inputType === 'radio') {
        this.$emit('update:categoryChecked', this.currentCategory);
      }
    },
  },
};
</script>
