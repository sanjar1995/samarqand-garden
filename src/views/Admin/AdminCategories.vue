<template>
  <div class="admin-main__categories">
    <div class="admin-main__categories-header">
      <div></div>
      <router-link
        to="/admin-panel/categories/add"
        class="admin-main__products-header-button"
      >
        <i class="fal fa-plus"></i>
      </router-link>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">ID</th>
          <th scope="col">Дата Создание</th>
          <th scope="col">Дата Изменении</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.name }}</th>
          <td>{{ category.id }}</td>
          <td>
            {{ new Date(category.created_at).toLocaleDateString() }}
          </td>
          <td>
            {{ new Date(category.updated_at).toLocaleDateString() }}
          </td>
          <td>
            <router-link
              :to="'/admin-panel/categories/edit/' + category.id"
              class="btn btn-primary"
              :click="'add'"
              ><i class="fal fa-pencil"></i
            ></router-link>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteCategory(category.id)">
              <i class="fal fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="admin-pagination">
      <vue-awesome-paginate
        :total-items="total"
        :items-per-page="limit"
        :max-pages-shown="2"
        v-model="page"
        :on-click="changePage"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useAdmCategory } from "@/stores/admCategory";
import { useRouter, useRoute } from "vue-router";
import { limit } from "@/static";
import swal from "sweetalert";
const categoriesStore = useAdmCategory();
const router = useRouter();
const route = useRoute();
const total = computed(() => categoriesStore.total);
let page = ref(+route.query.page || 1);
let offset = ref(limit * page.value - limit);
const changePage = (page_num) => {
  page.value = page_num;
  offset.value = limit * page_num - limit;
  if (page_num == 1) {
    router.push(`${route.path}`);
  } else {
    router.push(`${route.path}?page=${page_num}`);
  }
  categoriesStore.getCategories(offset.value);
};
let categories = computed(() => {
  return categoriesStore.categories;
});
const deleteCategory = (id) => {
  swal({
    title: "Вы уверены?",
    text: "После удаления вы не сможете восстановить эту категорию!",
    icon: "warning",
    buttons: ["Отменить", "Удалить"],
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      await categoriesStore.deleteCategory(id);
      await swal("Выбранная категория была удалена!", {
        icon: "success",
        buttons: "ОК",
      }).then((ok) => {
        if (ok) router.go();
      });
    } else {
      swal("Выбранная категория не была удалена!");
    }
  });
};
</script>
