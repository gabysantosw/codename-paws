<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/shelters">Shelters</router-link> |
      <router-link to="/animals">Animals</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/styles/main.scss';
</style>
