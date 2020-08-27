<template>
  <div>
    {{ title }}{{ dots }}
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Загрузка',
    },
  },
  data() {
    return {
      dots: '',
    };
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      setInterval(() => {
        if (this.dots.length < 3) {
          this.dots += '.';
        } else {
          this.dots = '';
        }
      }, 500);
    },
  },
};
</script>
