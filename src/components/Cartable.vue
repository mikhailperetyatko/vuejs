<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    cartLoadStatus() {
      return this.$store.getters.getStatus('loadCart');
    },
    addProductToCartStatus() {
      return this.$store.getters.getStatus('addProductToCart');
    },
    updateProductCartStatus() {
      return this.$store.getters.getStatus('updateProductCart');
    },
    deleteProductCartStatus() {
      return this.$store.getters.getStatus('deleteProductCart');
    },
    cartProductAmount() {
      return this.$store.getters.cartDetailProducts.length;
    },
  },
  methods: {
    ...mapActions(['loadCart']),
  },
};
</script>
