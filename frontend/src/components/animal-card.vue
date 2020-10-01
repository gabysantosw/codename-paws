<template lang="pug">
  li 
    img(:alt='animal.type' :src='animal.image')
    router-link(:to='`/animals/${animal._id}`') {{ animal.name }}
    span , location: {{ animal.city }}
</template>

<script>
export default {
  name: 'AnimalCard',
  props: ['animal'],
};
</script>
