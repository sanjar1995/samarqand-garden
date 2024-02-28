<!-- <template>
  <div class="admin-main__header">
    <select
      v-model="selectOption"
      class="form-select"
      aria-label="Default select example"
    >
      <option value="">Все Категории</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
    <button class="admin-main__add-button">
      <i class="fal fa-th-large" />
      Add Category
    </button>
  </div>
</template>
<script setup>
import AdminSearch from "@/components/Admin/AdminSearch.vue";
import { ref } from "vue";
import { useСategories } from "@/stores/categories";
const categoriesStore = useСategories();
const categories = categoriesStore.categories;
const inputPlaceholder = ref("Search Category");
const selectOption = ref("");
</script> -->
