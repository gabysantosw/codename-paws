<script>
import ShelterAnimal from '@/components/shelter-animal.vue';

export default {
  name: 'ShelterCard',
  props: ['user'],
  components: { ShelterAnimal }
};
</script>

<template lang="pug">
  li 
    h2 
      router-link(:to='`/users/${user._id}`') {{ user.name }}
    p Location: {{ user.city }}. 
    h3(v-if='user.animals.length > 0') Animals in care ({{ user.animals.length }})
    ul(v-if='user.animals.length > 0')
      ShelterAnimal(v-for='animal in user.animals' :animal='animal')
</template>

<style lang="scss"></style>
