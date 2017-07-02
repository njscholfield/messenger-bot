<template>
  <nav id="navbar" class="navbar navbar-default navbar-fixed">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar" @click="toggleCollapsed()">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">FBMB</a>
        </div>
      <div id="navbar" class="navbar-collapse" :class="collapse">
        <ul class="nav navbar-nav">
          <li id="new-poll" :class="{'active': isCurrentPage('new-poll')}"><a href="/new-poll/">New Poll</a></li>
          <li id="results" :class="{'active': isCurrentPage('results')}"><a href="/results/">Results</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="https://www.instagram.com/secularpitt/" target="_blank"><span class="icon icon-instagram"></span><noscript>Instagram</noscript></a></li>
          <li><a href="https://www.facebook.com/groups/1540310659531212/" target="_blank"><span class="icon icon-facebook"></span><noscript>Facebook</noscript></a></li>
          <li><a href="mailto:secularpitt@gmail.com"><span class="glyphicon glyphicon-envelope"></span><noscript>Email</noscript></a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  module.exports = {
    name: 'navbar',
    props: ['page'],
    data() {
      return {
        collapsed: true,
      };
    },
    computed: {
      collapse: function() {
        return this.collapsed ? 'collapse' : '';
      }
    },
    methods: {
      toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.classList.remove('collapsed');
      },
      isCurrentPage(pageName) {
        return pageName === this.page;
      }
    }
  };
</script>
