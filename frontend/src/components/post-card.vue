<template lang="pug">
  li 
    router-link(:to='`/posts/${post._id}`') {{ post.title }}
</template>

<script>
export default {
  name: 'PostCard',
  props: ['post']
};
</script>
