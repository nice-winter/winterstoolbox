<script setup lang="ts"></script>

<template>
  <ul class="versions nav">
    <li class=""><router-link to="/">Home</router-link></li>
    <li class=""><router-link to="/about">About</router-link></li>
  </ul>
</template>

<style lang="less">
.nav {
  background-color: var(--ev-button-alt-bg);

  a {
    color: var(--ev-button-alt-text);
    text-decoration: none;
  }
}
</style>
