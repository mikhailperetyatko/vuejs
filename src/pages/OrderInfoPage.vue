<template>
  <Loadable
    spinner-title="Загружаем данные о заказе"
    :do-func="loadOrder()"
    :status="orderInfoStatus"
    :error-message="order.error.message"
  >
    <template v-slot:content>
      <main class="content container">
        <div class="content__top">
          <Breadcrumbs
            :links="breadcrumbs"
          />
          <h1 class="content__title">
            Заказ оформлен <span>№ {{ orderInfo.id }}</span>
          </h1>
        </div>
        <section class="cart">
          <form class="cart__form form">
            <div class="cart__field">
              <p class="cart__message">
                Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа.
                Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
              </p>
              <ul class="dictionary">
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Получатель
                  </span>
                  <span class="dictionary__value">
                    {{ orderInfo.name }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Адрес доставки
                  </span>
                  <span class="dictionary__value">
                    {{ orderInfo.address }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Телефон
                  </span>
                  <span class="dictionary__value">
                    {{ orderInfo.phone }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Email
                  </span>
                  <span class="dictionary__value">
                    {{ orderInfo.email }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Способ оплаты
                  </span>
                  <span class="dictionary__value">
                    картой при получении
                  </span>
                </li>
              </ul>
            </div>
            <CartOrderBlock
              :products="order.data.basket.items"
            />
          </form>
        </section>
      </main>
    </template>
  </Loadable>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import CartOrderBlock from '@/components/CartOrderBlock.vue';
import { mapGetters, mapActions } from 'vuex';
import Loadable from '@/components/Loadable.vue';
import Cartable from '@/components/Cartable.vue';

export default {
  components: {
    Breadcrumbs,
    CartOrderBlock,
    Loadable,
  },
  extends: Cartable,
  computed: {
    ...mapGetters(['order']),
    orderInfo() {
      return this.order.data;
    },
    breadcrumbs() {
      return [
        {
          description: 'Каталог',
          data: { name: 'main' },
        },
        {
          description: 'Корзина',
          data: { name: 'cart' },
        },
        {
          description: 'Оформление заказа',
          data: {},
        },
      ];
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadOrderInfo(this.$route.params.id);
      },
    },
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
    loadOrder() {
      return () => {
        if (
          !this.order.data
          || this.order.data.id !== this.$route.params.id
        ) this.loadOrderInfo(this.$route.params.id);
      };
    },
  },
};
</script>
