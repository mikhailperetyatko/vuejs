<template>
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
        <CartOrderBlock />
      </form>
    </section>
  </main>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import CartOrderBlock from '@/components/CartOrderBlock.vue';

export default {
  components: {
    Breadcrumbs,
    CartOrderBlock,
  },
  props: {
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
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
};
</script>
