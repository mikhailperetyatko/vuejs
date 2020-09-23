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
        @submit.prevent="toOrder"
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
        <Loadable
          :auto-load="false"
          spinner-title="Загружаем данные корзины"
          :status="cartLoadStatus"
          :do-func="() => loadCart()"
        >
          <template v-slot:content>
            <CartOrderBlock
              :products="products"
              :total-price="totalPrice"
              :total-cart-items="totalCartItems"
              :total-cart-products="totalCartProducts"
            >
              <button
                class="cart__button button button--primery"
                type="submit"
                :disabled="status === 'pending'"
              >
                Оформить заказ
              </button>
              <Loadable
                :auto-load="false"
                spinner-title="Отправляем запрос"
                :status="status"
                spinner-color="white"
              >
                <template v-slot:content>
                  Заказ оформлен!
                </template>
              </Loadable>
            </CartOrderBlock>
          </template>
        </Loadable>
        <div
          v-show="formErrorMessage"
          class="cart__error form__error-block"
        >
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
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
import CartOrderBlock from '@/components/CartOrderBlock.vue';
import BaseFormInput from '@/components/BaseFormInput.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters, mapActions } from 'vuex';
import validate from '@/helpers/validate';
import numberFormat from '@/helpers/numberFormat';
import amountFormat from '@/helpers/amountFormat';

export default {
  components: {
    Breadcrumbs,
    BaseFormInput,
    BaseFormTextarea,
    Loadable,
    CartOrderBlock,
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
      formErrorMessage: '',
      httpSend: false,
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
          validateRule: 'required|string|min:3',
        },
        {
          title: 'Адрес доставки',
          placeholder: 'Введите ваш адрес',
          name: 'address',
          component: BaseFormInput,
          validateRule: 'required|string|min:5',
        },
        {
          title: 'Телефон',
          placeholder: 'Введите ваш телефон',
          name: 'phone',
          component: BaseFormInput,
          inputType: 'tel',
          validateRule: ['required', 'min:3', 'string', 'regex:^\\+?[0-9][-\\(]?\\d{3}\\)?-?\\d{3}-?\\d{2}-?\\d{2}$'],
        },
        {
          title: 'Email',
          placeholder: 'Введи ваш Email',
          name: 'email',
          component: BaseFormInput,
          inputType: 'email',
          validateRule: ['required', 'string', 'regex:^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'],
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
      order: 'order',
    }),
    status() {
      if (!this.httpSend) return null;
      return this.cartToOrderStatus;
    },
  },
  methods: {
    ...mapActions(['cartToOrder']),
    getValidate() {
      const errors = this.fields.map((item) => ({
        name: item.name,
        value: this.formData[item.name] || '',
        validateRule: item.validateRule,
      })).reduce((accum, item) => ({
        ...accum,
        [item.name]: validate(item.value, item.validateRule).join(', '),
      }), {});
      return {
        result: Object.values(errors).filter((error) => error.length).length === 0,
        errors,
      };
    },
    toOrder() {
      const validatedResult = this.getValidate();
      this.httpSend = false;
      if (validatedResult.result) {
        this.httpSend = true;
        this.cartToOrder(this.formData)
          .then(() => {
            this.formError = {};
            this.formErrorMessage = '';
            if (Object.keys(this.order.error).length) {
              this.formError = this.order.error.request ?? {};
              this.formErrorMessage = this.order.error.message;
            } else {
              this.$router.push({
                name: 'orderInfo',
                params: { id: this.order.data.id },
              });
            }
          });
      } else {
        this.formError = validatedResult.errors;
      }
    },
  },
};
</script>
