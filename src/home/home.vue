<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <h3>{{ user.loggedIn }}</h3>
    </div>
  </div>
</template>

<script>
  import navbar from '../navbar.vue';

  export default {
    name: 'home',
    components: {
      navbar
    },
    data() {
      return {
        user: {
          loggedIn: false
        }
      };
    },
    methods: {
      checkLogin() {
        fetch('/auth/verify/')
          .then(blob => blob.json())
          .then(data => {
            this.user = data;
            this.$emit('alert', {type: 'reset'});
          })
          .catch(() => this.$emit('alert', {type: 'error', message: 'Can\'t check if you are logged in... Check your connection and try again!'}));
      }
    },
    mounted() {
      this.checkLogin();
    }
  }
</script>
