<template>
  <div class="alert alert-dismissible alert-success">
    <button type="button" class="close" @click="hide">&times;</button>{{ message }}
  </div>
</template>

<script>
  export default {
   name: 'success-alert',
   props: ['message'],
   methods: {
     hide() {
       this.$emit('hide');
     }
   }
  }
</script>
