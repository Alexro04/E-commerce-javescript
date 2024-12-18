export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(itemId) {
  let sameProduct;
  const selectElement = document.querySelector(`[data-select-product-id="${itemId}"]`)
  const selectedQuantity = Number(selectElement.value)

  cart.forEach((cartItem) => {
    if (cartItem.itemId === itemId) {
      cartItem.quantity += selectedQuantity;
      sameProduct = true;
    }
  });

  if (!sameProduct) {
    cart.push({
      itemId,
      quantity: selectedQuantity
    })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function removefromCart(itemId){
  cart = cart.filter((cartItem) => {
    return cartItem.itemId !== itemId
  })
  localStorage.setItem('cart', JSON.stringify(cart))
}
