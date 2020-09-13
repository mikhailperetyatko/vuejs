<template>
  <Loadable
    :auto-load="false"
    spinner-title="Загружаем корзину"
    :status="cartLoadStatus"
    :do-func="() => loadCart()"
  >
    <template v-slot:content>
      <main
        class="content container"
      >
        <link
          href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
          rel="stylesheet"
          type="text/css"
        >
        <div class="content__top">
          <Breadcrumbs
            :links="breadcrumbs"
          />
          <h1 class="content__title">
            Корзина
          </h1>
          <span class="content__info">
            Сейчас в корзине {{ $store.state.cartProducts.length | numberFormat | amountFormat }}
          </span>
        </div>
        <section
          v-if="itemsAmount"
          class="cart"
        >
          <form
            class="cart__form form"
            @submit="$router.push({ name: 'order' })"
          >
            <div class="cart__field">
              <transition-group
                tag="ul"
                name="custom-classes-transition"
                enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX"
              >
                <CartItem
                  v-for="item in products"
                  :key="`${item.product.id}`"
                  :item="item"
                />
              </transition-group>
              <BasePagination
                v-if="itemsPerPage < itemsAmount"
                v-model="page"
                :current-page="page"
                :per-page="itemsPerPage"
                :amount="itemsAmount"
              />
            </div>
            <div class="cart__block">
              <p class="cart__desc">
                Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
              </p>
              <p class="cart__price">
                Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
              </p>

              <button
                class="cart__button button button--primery"
                type="submit"
              >
                Оформить заказ
              </button>
            </div>
          </form>
        </section>
        <div v-else>
          Ваша корзина пуста :(
        </div>
      </main>
    </template>
  </Loadable>
</template>
<style>

</style>
<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import BasePagination from '@/components/BasePagination.vue';
import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';
import amountFormat from '@/helpers/amountFormat';
import numberFormat from '@/helpers/numberFormat';
import paginationsComputedFunction from '@/helpers/paginationsComputedFunction';
import Cartable from '@/components/Cartable.vue';
import Loadable from '@/components/Loadable.vue';

export default {
  components: {
    Breadcrumbs,
    CartItem,
    BasePagination,
    Loadable,
  },
  filters: {
    amountFormat,
    numberFormat,
  },
  extends: Cartable,
  data() {
    return {
      page: 1,
      itemsPerPage: 3,
      cartData: {},
    };
  },
  computed: {
    ...mapGetters({ productsInStore: 'cartDetailProducts', totalPrice: 'totalCartPrice' }),
    breadcrumbs() {
      return [
        {
          description: 'Каталог',
          data: { name: 'main' },
        },
        {
          description: 'Корзина',
          data: {},
        },
      ];
    },
    products() {
      return paginationsComputedFunction.products(this.productsInStore, this.page, this.itemsPerPage);
    },
    itemsAmount() {
      return paginationsComputedFunction.itemsAmount(this.productsInStore);
    },
  },
  watch: {
    products() {
      if (this.products.length === 0 && this.page > 1) this.page -= 1;
    },
  },
};
</script>
