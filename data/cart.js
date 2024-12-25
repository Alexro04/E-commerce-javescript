class Cart {
  cartItems;

  constructor(localStorageKey) {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  }

  #saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
  }

  addToCart(itemId) {
    let sameProduct;
    const selectElement = document.querySelector(`[data-select-product-id="${itemId}"]`)
    const selectedQuantity = Number(selectElement.value)
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.itemId === itemId) {
        cartItem.quantity += selectedQuantity;
        sameProduct = true;
      }
    });
  
    if (!sameProduct) {
      this.cartItems.push({
        itemId,
        quantity: selectedQuantity,
        deliveryOption: '1'
      })
    }
    this.#saveToStorage()
  }

  removefromCart(itemId){
    this.cartItems = this.cartItems.filter((cartItem) => {
      return cartItem.itemId !== itemId
    })
    this.#saveToStorage()
  }

  getCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    });
    return cartQuantity
  }

  updateItemQuantity(newQuantity, updateCartId) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.itemId === updateCartId) {
        cartItem.quantity = newQuantity;
      }
    })
    this.#saveToStorage()
  }

  updateDeliveryOption(productId, deliveryOption) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.itemId === productId) {
        cartItem.deliveryOption = deliveryOption;
      }
    })
    this.#saveToStorage()
  }
}

export const cart = new Cart('cart')