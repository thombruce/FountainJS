<template>
  <article class='screenplay'>
    <header class='title-page' v-if='title' v-html='document.html.title_page'></header>
    <div class='script' v-html='document.html.script'></div>
  </article>
</template>

<script>
export default {
  props: {
    screenplay: Object,
    title: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
@import '../assets/css/screenplay';
</style>
