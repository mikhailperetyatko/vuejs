<template>
  <div>
    Загрузка{{ dots }}
  </div>
</template>
<script>
export default {
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
