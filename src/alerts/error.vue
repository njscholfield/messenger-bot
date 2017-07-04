<template>
  <div class="alert alert-dismissible alert-danger">
    <button type="button" class="close" @click="hide">&times;</button>{{ message }}
  </div>
</template>

<script>
  export default {
    name: 'error-alert',
    props: ['message'],
    methods: {
      hide() {
        this.$emit('hide');
      }
    }
  }
</script>
