<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': unavailablePrevPageLink}"
        aria-label="Предыдущая страница"
        @click.prevent="prevPage"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </a>
    </li>
    <li
      v-for="pageNumber in pageAmount"
      :key="pageNumber"
      class="pagination__item"
    >
      <a
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current': pageNumber === currentPage}"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': unavailableNextPageLink}"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="nextPage"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  model: {
    prop: 'currentPage',
    event: 'paginate',
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 6,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    pageAmount() {
      return Math.ceil(this.amount / this.perPage);
    },
    unavailablePrevPageLink() {
      return this.currentPage === 1;
    },
    unavailableNextPageLink() {
      return this.currentPage === this.pageAmount;
    },
  },
  methods: {
    paginate(page) {
      return this.$emit('paginate', page);
    },
    prevPage() {
      if (!this.unavailablePrevPageLink) this.paginate(this.currentPage - 1);
    },
    nextPage() {
      if (!this.unavailableNextPageLink) this.paginate(this.currentPage + 1);
    },
  },
};
</script>
