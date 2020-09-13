<template>
  <BaseFormField
    :title="title"
    :error="error"
  >
    <textarea
      v-model="dataValue"
      :class="`form__input ${extClass}`"
      :placeholder="placeholder"
    />
  </BaseFormField>
</template>
<script>
import FormFieldMixin from '@/components/FormFieldMixin.vue';

export default {
  mixins: [FormFieldMixin],
};
</script>
