<template>
  <main class="content container">
    <div class="content__top">
      <Breadcrumbs
        :links="breadcrumbs"
      />
      <h1 class="content__title">
        Корзина
      </h1>
      <Loadable
        :auto-load="false"
        spinner-title="Загружаем данные корзины"
        :status="cartLoadStatus"
        :do-func="() => loadCart()"
      >
        <template v-slot:content>
          <span class="content__info">
            {{ cartProductAmount | numberFormat | amountFormat }}
          </span>
        </template>
      </Loadable>
    </div>
    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <div class="cart__data">
            <Component
              :is="field.component"
              v-for="field in fields"
              :key="field.name"
              v-model="formData[field.name]"
              :title="field.title"
              :placeholder="field.placeholder"
              :input-type="field.inputType"
              :error="formError[field.name]"
              :ext-сlass="field.extClass"
            />
          </div>
          <div class="cart__options">
            <h3 class="cart__title">
              Доставка
            </h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  >
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  >
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>
            <h3 class="cart__title">
              Оплата
            </h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  >
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  >
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart__block">
          <Loadable
            :auto-load="false"
            spinner-title="Загружаем данные корзины"
            :status="cartLoadStatus"
            :do-func="() => loadCart()"
            spinner-color="white"
          >
            <template v-slot:content>
              <ul class="cart__orders">
                <CartOrderItem
                  v-for="item in products"
                  :key="item.product.id"
                  :item="item"
                />
              </ul>
              <div class="cart__total">
                <p>Доставка: <b>500 ₽</b></p>
                <p>Итого: <b>{{ totalCartItems | amountFormat(['позиция', 'позиции', 'позиций']) }}</b> ({{ totalCartProducts | amountFormat }}) на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
              </div>
              <button
                class="cart__button button button--primery"
                type="submit"
              >
                Оформить заказ
              </button>
            </template>
          </Loadable>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Cartable from '@/components/Cartable.vue';
import Loadable from '@/components/Loadable.vue';
import CartOrderItem from '@/components/CartOrderItem.vue';
import BaseFormInput from '@/components/BaseFormInput.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import numberFormat from '@/helpers/numberFormat';
import amountFormat from '@/helpers/amountFormat';
import { mapGetters } from 'vuex';

export default {
  components: {
    Breadcrumbs,
    BaseFormInput,
    BaseFormTextarea,
    Loadable,
    CartOrderItem,
  },
  filters: {
    numberFormat,
    amountFormat,
  },
  extends: Cartable,
  data() {
    return {
      formData: {},
      formError: {},
    };
  },
  computed: {
    fields() {
      return [
        {
          title: 'ФИО',
          placeholder: 'Введите ваше полное имя',
          name: 'name',
          component: BaseFormInput,
        },
        {
          title: 'Адрес доставки',
          placeholder: 'Введите ваш адрес',
          name: 'address',
          component: BaseFormInput,
        },
        {
          title: 'Телефон',
          placeholder: 'Введите ваш телефон',
          name: 'phone',
          component: BaseFormInput,
          inputType: 'tel',
        },
        {
          title: 'Email',
          placeholder: 'Введи ваш Email',
          name: 'email',
          component: BaseFormInput,
          inputType: 'email',
        },
        {
          title: 'Комментарий к заказу',
          placeholder: 'Ваши пожелания',
          name: 'comment',
          component: BaseFormTextarea,
          extClass: 'form__input--area',
        },
      ];
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
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'totalCartPrice',
      totalCartItems: 'totalCartItems',
      totalCartProducts: 'totalCartProducts',
    }),
  },
};
</script>
