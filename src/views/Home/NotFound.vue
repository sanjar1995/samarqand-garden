<template>
  <div class="page-not-found">
    <i class="fal fa-frown page-not-found__sad"></i>
    <h3 class="page-not-found__title">{{ $t("notFound.title") }}</h3>
    <h4 class="page-not-found__sub">{{ $t("notFound.sub") }}</h4>
    <router-link :to="`/${locale}`" class="page-not-found__back">
      <i class="fal fa-chevron-left"></i> {{ $t("notFound.back") }}
    </router-link>
  </div>
</template>
<script setup>
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
useHead({
  title: `${t("notFound.sub")}`,
});
</script>
