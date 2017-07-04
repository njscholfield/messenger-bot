<template>
  <div id="alerts">
    <transition name="fade">
      <success-alert :message="success.message" v-show="success.visible" @hide="hide('success')"></success-alert>
    </transition>
    <transition name="fade">
      <error-alert :message="error.message" v-show="error.visible" @hide="hide('error')"></error-alert>
    </transition>
  </div>
</template>

<script>
  import successAlert from './success.vue';
  import errorAlert from './error.vue';

  export default {
    name: 'alerts',
    components: {
      successAlert, errorAlert
    },
    data() {
      return {
        success: { visible: false, message: 'Success' },
        error: { visible: false, message: 'Error' }
      };
    },
    methods: {
      show(type, message) {
        this[type].visible = true;
        this[type].message = message;
      },
      hide(type) {
        this[type].visible = false;
      },
      reset() {
        this.success.visible = false;
        this.error.visible = false;
      }
    },
    mounted() {
      this.$parent.$on('alert', ({type, message}) => {
        if(type === 'reset') {
          this.reset()
        } else {
          this.show(type, message);
        }  
      });
    }
  };
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
