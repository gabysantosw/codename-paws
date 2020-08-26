<script>
export default {
  name: 'ShelterAnimal',
  props: ['animal']
};
</script>

<template lang="pug">
  li {{ animal.name }}
</template>

<style lang="scss"></style>
