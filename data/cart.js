export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

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
      quantity: selectedQuantity,
      deliveryOption: '1'
    })
  }
  saveToStorage()
}

export function removefromCart(itemId){
  cart = cart.filter((cartItem) => {
    return cartItem.itemId !== itemId
  })
  saveToStorage()
}

export function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  });
  return cartQuantity
}

export function updateItemQuantity(newQuantity, updateCartId) {
  cart.forEach((cartItem) => {
    if (cartItem.itemId === updateCartId) {
      cartItem.quantity = newQuantity;
    }
  })
  saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOption) {
  cart.forEach((cartItem) => {
    if (cartItem.itemId === productId) {
      cartItem.deliveryOption = deliveryOption;
    }
  })
  saveToStorage()
}
