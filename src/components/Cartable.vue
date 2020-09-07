<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    loadingInProgress() {
      return this.$store.getters.getStatus({ statusName: 'loadCart' }) === 'loading'
        || this.$store.getters.getStatus({ statusName: 'addProductToCart' }) === 'loading'
        || this.$store.getters.getStatus({ statusName: 'deleteProductCart' }) === 'loading';
    },
    loadFailed() {
      return this.$store.getters.getStatus({ statusName: 'loadCart' }) === 'faild';
    },
  },
  methods: {
    ...mapActions(['loadCart']),
  },
};
</script>
