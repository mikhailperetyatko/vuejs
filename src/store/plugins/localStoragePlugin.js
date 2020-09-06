export default (store) => (
  store.subscribe((state, mutation) => (
    localStorage.setItem('cartProducts', JSON.stringify(mutation.cartProducts ?? {}))
  ))
);
