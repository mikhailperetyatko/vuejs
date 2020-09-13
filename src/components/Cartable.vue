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
  },
  methods: {
    ...mapActions(['loadCart']),
  },
};
</script>
