<template>
  <div class="form-group" :class="{'has-error': error}">
    <label :for="name">{{ label }}</label>
    <input class="form-control" type="text" :name="name" required="true" :value="value" :placeholder="placeholder" @input="updater">
  </div>
</template>

<script>
  export default {
    name: 'form-field',
    props: ['label', 'value', 'placeholder', 'error'],
    data() {
      return {
        name: this.label.toLowerCase().replace(' ', '')
      };
    },
    methods: {
      updater($event) {
        this.$emit('input', $event.target.value);
      }
    }
  };
</script>
