<template>
  <div
    v-if="loadingInProgress"
  >
    <slot
      name="spinner"
    >
      <SpinnerDots
        :title="spinnerTitle"
        :color="spinnerColor"
      />
    </slot>
  </div>
  <div
    v-else-if="loadFailed"
  >
    Произошла ошибка
    <button @click="load()">
      Еще раз
    </button>
  </div>
  <div v-else>
    <slot
      name="content"
    />
  </div>
</template>
<script>
import HTTP from '@/http-common';
import SpinnerDots from '@/components/SpinnerDots.vue';

export default {
  components: {
    SpinnerDots,
  },
  props: {
    method: {
      default: 'get',
      type: String,
    },
    url: {
      default: '/',
      type: String,
    },
    params: {
      default: () => ({}),
      type: Object,
    },
    data: {
      default: () => ({}),
      type: Object,
    },
    spinnerTitle: {
      default: 'Загрузка компонента',
      type: String,
    },
    spinnerColor: {
      default: 'black',
      type: String,
    },
    autoLoad: {
      default: true,
      type: Boolean,
    },
    todo: {
      default: null,
      type: Function,
    },
    forcedLoadingInProgress: {
      default: false,
      type: Boolean,
    },
    forcedLoadFailed: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      loadingInProgress: this.forcedLoadingInProgress,
      loadFailed: this.forcedLoadFailed,
    };
  },
  computed: {
    handler() {
      return this.todo ? () => this.loadByParamsFunc() : () => this.loadByHTTP();
    },
  },
  watch: {
    url() {
      this.load();
    },
    params() {
      this.load();
    },
    forcedLoadingInProgress(value) {
      this.loadingInProgress = value;
    },
    forcedLoadFailed(value) {
      this.loadFailed = value;
    },
  },
  created() {
    if (this.autoLoad) {
      this.load();
    }
  },
  methods: {
    load() {
      this.loadingInProgress = true;
      this.loadFailed = false;
      this.handler()
        .then((response) => {
          this.$emit('success', response.data);
        })
        .catch(() => {
          this.loadFailed = true;
        })
        .then(() => {
          this.loadingInProgress = false;
        });
    },
    loadByHTTP() {
      return HTTP({
        method: this.method,
        url: this.url,
        params: this.params,
        data: this.data,
      });
    },
    loadByParamsFunc() {
      return new Promise(() => this.todo());
    },
  },
};
</script>
