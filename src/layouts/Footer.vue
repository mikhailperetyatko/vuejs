<template>
  <footer class="footer">
    <div class="footer__wrapper container">
      <ul class="footer__links">
        <li>
          <router-link
            class="footer__link"
            :to="{ name: 'main' }"
          >
            Каталог
          </router-link>
        </li>
        <li>
          <a
            class="footer__link"
            href="tel:88006009009"
          >
            8 800 600 90 09
          </a>
        </li>
        <li>
          <a
            class="footer__link"
            href="mailto:hi@technozavrrr.com"
          >
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <router-link
            class="footer__link"
            :to="{ name: 'main' }"
          >
            Распродажа
          </router-link>
        </li>
        <li>
          <router-link
            class="footer__link"
            :to="{ name: 'main' }"
          >
            Заказать звонок
          </router-link>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <router-link
            class="social__link"
            aria-label="Вконтакте"
            :to="{ name: 'main' }"
          >
            <svg
              width="20"
              height="11"
              fill="currentColor"
            >
              <use xlink:href="#icon-vk" />
            </svg>
          </router-link>
        </li>
        <li class="social__item">
          <router-link
            class="social__link"
            aria-label="Инстаграм"
            :to="{ name: 'main' }"
          >
            <svg
              width="17"
              height="17"
              fill="currentColor"
            >
              <use xlink:href="#icon-insta" />
            </svg>
          </router-link>
        </li>
        <li class="social__item">
          <router-link
            class="social__link"
            aria-label="Facebook"
            :to="{ name: 'main' }"
          >
            <svg
              width="17"
              height="17"
              fill="currentColor"
            >
              <use xlink:href="#icon-facebook" />
            </svg>
          </router-link>
        </li>
        <li class="social__item">
          <router-link
            class="social__link"
            aria-label="Twitter"
            :to="{ name: 'main' }"
          >
            <svg
              width="17"
              height="14"
              fill="currentColor"
            >
              <use xlink:href="#icon-twitter" />
            </svg>
          </router-link>
        </li>
        <li class="social__item">
          <router-link
            class="social__link"
            aria-label="Telegram"
            :to="{ name: 'main' }"
          >
            <svg
              width="19"
              height="17"
              fill="currentColor"
            >
              <use xlink:href="#icon-telegram" />
            </svg>
          </router-link>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на материалы, находящиеся на сайте, охраняются в соответствии
        с законодательством РФ,
        в том числе об авторском праве и смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a
            class="footer__link"
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
          >
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a
            class="footer__link"
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
          >
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2020 Технозавррр
      </span>
    </div>
  </footer>
</template>
<script>
export default {
};
</script>
