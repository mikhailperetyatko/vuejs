export default (state, { productId, color }) => (
  state.cartProducts.find((item) => (
    item.productId === productId
    && (!color || item.color === color)
  ))
);
