<template>
  <b
    v-if="messages.length"
    style="color:red"
  >
    {{ messages.join(', ') }}
  </b>
</template>
<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
