<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input type="checkbox" name="switch" id="inSwitch" :checked="value" @change="$emit('input', $event.target.checked)">
    <label for="inSwitch" id="lblSwitch">Toggle</label>
  </div>
</template>

<script>
  export default {
    name: 'toggle-switch',
    props: ['label', 'value']
  }
</script>

<style>
  #lblSwitch {
    cursor: pointer;
    text-indent: -9999px;
    width: 4em;
    height: 2em;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;
  }

  #lblSwitch:after {
    content: '';
    position: absolute;
    top: 0.1em;
    left: 0.1em;
    width: 1.8em;
    height: 1.8em;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  #lblSwitch:active:after {
    width: 3em;
  }

  #inSwitch{
    height: 0;
    width: 0;
    visibility: hidden;
    margin: 0;
  }

  #inSwitch:checked + #lblSwitch {
    background: #43AC6A;
  }

  #inSwitch:checked + #lblSwitch:after {
    left: calc(100% - 0.1em);
    transform: translateX(-100%);
  }
</style>
