export default (state, { productId }) => (
  state.cartProducts.find((item) => (
    item.productId === productId
  ))
);
