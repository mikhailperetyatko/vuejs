<template>
  <Loadable
    method="get"
    url="/api/productCategories"
    spinner-title="Загружаем категории"
    @success="categoriesData=$event.items"
  >
    <template v-slot:content>
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
    </template>
  </Loadable>
</template>
<script>
import Loadable from '@/components/Loadable.vue';

export default {
  name: 'ProductCategories',
  components: {
    Loadable,
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
      categoriesData: [],
    };
  },
  computed: {
    categories() {
      return this.categoriesData;
    },
  },
  watch: {
    categoriesChecked() {
      if (!this.categoriesChecked.length) this.currentCategories = [];
      if (!Object.keys(this.categoryChecked).length) this.currentCategory = {};
    },
  },
  methods: {
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
