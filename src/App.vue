<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script>
import MainLayout from './layouts/main.layout'
export default {
  name: 'App',
  components: { MainLayout }
}
</script>

<style>
</style>
