<script>
import BaseFormField from '@/components/BaseFormField.vue';

export default {
  components: {
    BaseFormField,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    extClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
