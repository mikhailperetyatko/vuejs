export default (state, { productId, color }) => (
  state.cartProducts.find((item) => (
    item.productId === productId
    && (!item.color || item.color === color)
  ))
);
