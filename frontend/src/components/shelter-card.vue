<template lang="pug">
  li {{ user.name }}, location: {{ user.city }}. Animals in care: {{ user.animals.length }}
</template>

<script>
export default {
  name: 'ShelterCard',
  props: ['user']
};
</script>

<style lang="scss"></style>
