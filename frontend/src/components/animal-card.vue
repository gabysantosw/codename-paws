<template lang="pug">
  li {{ animal.name }}, location: {{ animal.city }}
</template>

<script>
export default {
  name: 'AnimalCard',
  props: ['animal']
};
</script>

<style lang="scss"></style>
