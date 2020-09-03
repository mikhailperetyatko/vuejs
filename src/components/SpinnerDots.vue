<template>
  <div :style="`color:${color}`">
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
    color: {
      type: String,
      default: 'black',
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
