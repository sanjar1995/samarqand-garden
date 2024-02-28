<template>
  <div class="admin-main__categories">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" style="color: #308d5e">Кол-во новых заказов</th>
          <th scope="col" style="color: #308d5e">Сумма новых заказов</th>
          <th scope="col" style="color: #0d6efd">Кол-во завершенных заказов</th>
          <th scope="col" style="color: #0d6efd">Сумма завершенных заказов</th>
          <th scope="col" style="color: #dc3545">Кол-во отмененыз заказов</th>
          <th scope="col" style="color: #dc3545">Сумма отмененых заказов</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="color: #308d5e">{{ newOrderCount }}</td>
          <td style="color: #308d5e; font-size: 16px">
            {{ newOrderSum.toLocaleString() }} сум
          </td>
          <td style="color: #0d6efd">{{ completedOrderCount }}</td>
          <td style="color: #0d6efd; font-size: 16px">
            {{ completedOrderSum.toLocaleString() }} сум
          </td>
          <td style="color: #dc3545">{{ cancelledOrderCount }}</td>
          <td style="color: #dc3545; font-size: 16px">
            {{ cancelledOrderSum.toLocaleString() }} сум
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-hover mt-5 admin-main__products-main">
      <thead>
        <tr>
          <th scope="col">Клиент</th>
          <th scope="col">Телефон</th>
          <th scope="col">Дата Заказа</th>
          <th scope="col">Статус Заказа</th>
          <th scope="col">Метод Оплаты</th>
          <th scope="col">Статус Оплаты</th>
          <th scope="col">Общая сумма</th>
        </tr>
      </thead>
      <template v-for="order in orders" :key="order.id">
        <tbody>
          <tr class="table-tr">
            <th scope="row" class="table-name">{{ order.client_name }}</th>
            <td>{{ order.client_phone }}</td>
            <td scope="col">
              {{ new Date(order.created_at).toLocaleDateString() }}
            </td>
            <td>{{ order.order_status }}</td>
            <td>
              <img style="width: 100px" src="@/assets/img/payme.png" alt="" />
            </td>
            <td>Не Оплачен</td>
            <td>{{ order.total.toLocaleString() }} сум</td>
            <td>
              <button
                class="btn btn-danger"
                :disabled="order.order_status != 'New'"
                @click="
                  orderStore.completedOrCancelledOrder(order.id, 'Cancelled')
                "
              >
                <i class="fal fa-trash-alt"></i>
              </button>
            </td>
            <td>
              <button
                class="btn btn-primary"
                :disabled="order.order_status != 'New'"
                @click="
                  orderStore.completedOrCancelledOrder(order.id, 'Completed')
                "
              >
                <i class="fal fa-check"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
    <div class="admin-pagination">
      <vue-awesome-paginate
        :total-items="totalCount"
        :items-per-page="limit"
        :max-pages-shown="2"
        v-model="page"
        :on-click="changePage"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useAdmOrder } from "@/stores/admOrder";
import { useRoute, useRouter } from "vue-router";
import { limit } from "@/static";
const orderStore = useAdmOrder();
const orders = computed(() => orderStore.orders);
const totalCount = computed(() => orderStore.totalCount);
const newOrderCount = computed(() => orderStore.newOrderCount);
const newOrderSum = computed(() => orderStore.newOrderSum);
const completedOrderCount = computed(() => orderStore.completedOrderCount);
const completedOrderSum = computed(() => orderStore.completedOrderSum);
const cancelledOrderCount = computed(() => orderStore.cancelledOrderCount);
const cancelledOrderSum = computed(() => orderStore.cancelledOrderSum);
const route = useRoute();
const router = useRouter();
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
  orderStore.getOrders(offset.value);
};
</script>
