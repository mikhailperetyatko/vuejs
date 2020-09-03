<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    loadingInProgress() {
      return this.$store.getters.getStatus({ statusName: 'loadCart' }).statuses.loading
        || this.$store.getters.getStatus({ statusName: 'addProductToCart' }).statuses.loading
        || this.$store.getters.getStatus({ statusName: 'deleteProductCart' }).statuses.loading;
    },
    loadFailed() {
      return this.$store.getters.getStatus({ statusName: 'loadCart' }).statuses.failed;
    },
  },
  methods: {
    ...mapActions(['loadCart']),
  },
};
</script>
