<template lang="pug">
  li 
    router-link(:to='`/animals/${animal._id}`') {{ animal.name }}
    span , location: {{ animal.city }}
</template>

<script>
export default {
  name: 'AnimalCard',
  props: ['animal']
};
</script>

<style lang="scss"></style>
