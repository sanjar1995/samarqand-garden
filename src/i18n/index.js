import { createI18n } from "vue-i18n";
import numberFormats from "./rules/numbers";
import ru from "./locales/ru.json";
import en from "./locales/en.json";
import uz from "./locales/uz.json";

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: { ru, en, uz },
  numberFormats,
  // runtimeOnly: false,
});
