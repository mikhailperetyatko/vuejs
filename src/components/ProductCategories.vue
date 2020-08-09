<template>
  <div>
    <div
      v-for="category in categories"
      :key="category.id"
    >
      <label>
        <input
          v-model="currentCategories"
          type="checkbox"
          :value="category.id"
          :name="`category${category.id}`"
          @change="$emit('update:categoriesChecked', currentCategories)"
        >
        {{ category.title }}
      </label>
    </div>
  </div>
</template>
<script>
import categories from '@/data/categories';

export default {
  name: 'ProductCategories',
  props: {
    categoriesChecked: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentCategories: this.categoriesChecked,
    };
  },
  computed: {
    categories() {
      return categories;
    },
  },
  watch: {
    categoriesChecked() {
      if (!this.categoriesChecked.length) this.currentCategories = [];
    },
  },
};
</script>
