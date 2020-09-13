<template>
  <BaseFormField
    :title="title"
    :error="error"
  >
    <input
      v-model="dataValue"
      :class="`form__input ${extClass}`"
      :type="inputType"
      :placeholder="placeholder"
    >
  </BaseFormField>
</template>
<script>
import FormFieldMixin from '@/components/FormFieldMixin.vue';

export default {
  mixins: [FormFieldMixin],
};
</script>
