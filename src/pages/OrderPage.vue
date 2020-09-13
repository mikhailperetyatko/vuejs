<template>
  <main class="content container">
    <div class="content__top">
      <Breadcrumbs
        :links="breadcrumbs"
      />
      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartProductAmount | numberFormat | amountFormat }}
      </span>
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
              :extClass="field.extClass"
            />
          </div>
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order">
              <h3>Смартфон Xiaomi Redmi Note 7 Pro 6/128GB</h3>
              <b>18 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Гироскутер Razor Hovertrax 2.0ii</h3>
              <b>4 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>
              <b>8 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>37 970 ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
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
import BaseFormInput from '@/components/BaseFormInput.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import numberFormat from '@/helpers/numberFormat';
import amountFormat from '@/helpers/amountFormat';

export default {
  components: {
    Breadcrumbs,
    BaseFormInput,
    BaseFormTextarea,
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
          name: 'comments',
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
  },
};
</script>
