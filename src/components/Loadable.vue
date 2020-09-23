<template>
  <div
    v-if="currentStatus === pendingStatus"
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
    v-else-if="currentStatus === errorStatus"
  >
    Произошла ошибка: {{ currentErrorMessage || '' }}
    <button @click="load()">
      Еще раз
    </button>
  </div>
  <div v-else-if="currentStatus === successStatus">
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
    doFunc: {
      default: null,
      type: Function,
    },
    status: {
      default: 'pending',
      type: String,
    },
    id: {
      default: null,
      type: Number,
    },
    errorMessage: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      currentStatus: this.status,
      pendingStatus: `pending${this.id ? `:${this.id}` : ''}`,
      errorStatus: `error${this.id ? `:${this.id}` : ''}`,
      successStatus: `success${this.id ? `:${this.id}` : ''}`,
      currentErrorMessage: this.errorMessage ?? '',
    };
  },
  computed: {
    handler() {
      return this.doFunc ? () => this.loadByParamsFunc() : () => this.loadByHTTP();
    },
  },
  watch: {
    url() {
      this.load();
    },
    params() {
      this.load();
    },
    status(value) {
      this.currentStatus = value;
    },
    errorMessage(value) {
      this.currentErrorMessage = value;
    },
  },
  created() {
    if (this.autoLoad) {
      this.load();
    }
  },
  methods: {
    load() {
      this.currentStatus = 'pending';
      this.handler()
        .then((response) => {
          this.$emit('success', response.data);
        })
        .catch((error) => {
          this.currentStatus = 'error';
          this.currentErrorMessage = error.response.data.error;
        })
        .then(() => {
          this.currentStatus = 'success';
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
      return new Promise(() => this.doFunc());
    },
  },
};
</script>
