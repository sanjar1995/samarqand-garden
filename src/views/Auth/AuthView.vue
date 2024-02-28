<template>
  <main class="auth">
    <div class="auth-form">
      <h2 class="auth-form__title">Samarqand Garden</h2>
      <h3 class="auth-form__sub">Вход в Административный панель</h3>
      <div class="auth-form__login">
        <label for="auth-form__login-input">Логин</label>
        <input
          type="text"
          id="auth-form__login-input"
          placeholder="Логин"
          v-model="username"
        />
      </div>
      <div class="auth-form__password">
        <label for="auth-form__password-input">Пароль</label>
        <input
          type="password"
          id="auth-form__password-input"
          placeholder="Пароль"
          v-model="password"
        />
      </div>
      <div class="auth-form__buttons">
        <router-link :to="`/${locale}`" class="btn btn-danger"
          >Назад</router-link
        >
        <button class="btn btn-primary" @click="loginAdmin">
          Войти в Систему
        </button>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useAuth } from "@/stores/auth";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const authStore = useAuth();
const username = ref("");
const password = ref("");
const loginAdmin = () => {
  authStore.loginAdmin(username.value, password.value);
};
</script>
