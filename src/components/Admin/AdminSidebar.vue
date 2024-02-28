<template>
  <aside class="admin-aside">
    <div class="admin-aside__top">
      <h2 class="admin-aside__user-title">Samarqand Garden</h2>
      <ul class="admin-aside__user-list">
        <li>
          <p href="#!" class="admin-aside__user-link">
            Имя:
            <span>Bek</span>
          </p>
        </li>
        <li>
          <p href="#!" class="admin-aside__user-link">
            Права:
            <span>Admin</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="admin-aside__center">
      <ul class="admin-aside__category-list">
        <li v-for="link in links" :key="link.path">
          <RouterLink :to="link.path" class="admin-aside__category-link">
            <i :class="link.icon"></i>
            <span>{{ link.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="admin-aside__bottom">
      <router-link
        :to="Tr.i18nRoute({ name: 'home-home' })"
        class="admin-aside__logout"
      >
        <i class="fal fa-sign-out-alt"></i>
        <span>Выйти</span>
      </router-link>
    </div>
  </aside>
</template>
<script setup>
import Tr from "@/i18n/translation";
const props = defineProps(["links"]);
</script>
