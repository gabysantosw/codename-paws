<script>
import ShelterAnimal from '@/components/shelter-animal.vue';

export default {
  name: 'ShelterCard',
  props: ['shelter'],
  components: { ShelterAnimal }
};
</script>

<template lang="pug">
  li 
    h2 
      router-link(:to='`/shelters/${shelter._id}`') {{ shelter.name }}
    p Location: {{ shelter.city }}. 
    h3(v-if='shelter.animals.length > 0') Animals in care ({{ shelter.animals.length }})
    ul(v-if='shelter.animals.length > 0')
      ShelterAnimal(v-for='animal in shelter.animals' :animal='animal')
</template>

<style lang="scss"></style>
