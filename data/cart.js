class Cart {
  cartItems;

  constructor(localStorageKey) {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  }

  #saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
  }

  addToCart(productId) {
    let sameProduct;
    const selectElement = document.querySelector(`[data-select-product-id="${productId}"]`)
    const selectedQuantity = Number(selectElement.value)
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity += selectedQuantity;
        sameProduct = true;
      }
    });
  
    if (!sameProduct) {
      this.cartItems.push({
        productId,
        quantity: selectedQuantity,
        deliveryOption: '1'
      })
    }
    this.#saveToStorage()
  }

  removefromCart(productId){
    this.cartItems = this.cartItems.filter((cartItem) => {
      return cartItem.productId !== productId
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
      if (cartItem.productId === updateCartId) {
        cartItem.quantity = newQuantity;
      }
    })
    this.#saveToStorage()
  }

  updateDeliveryOption(productId, deliveryOption) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.deliveryOption = deliveryOption;
      }
    })
    this.#saveToStorage()
  }
}

export const cart = new Cart('cart')