<template>
  <ul class="breadcrumbs">
    <li
      v-for="link in links"
      :key="link.description"
      class="breadcrumbs__item"
    >
      <router-link
        :to="link.data"
        class="breadcrumbs__link"
        :class="{'pagination__link--disabled': !Object.keys(link.data).length}"
      >
        {{ link.description }}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
