<template>
  <Navbar />
  <HomeCategories />
  <main class="main container">
    <RouterView />
  </main>
  <Footer />
</template>

<script setup>
import Navbar from "@/components/Home/HomeNav.vue";
import Footer from "@/components/Home/HomeFooter.vue";
import HomeCategories from "@/components/Home/HomeCategories.vue";
</script>
