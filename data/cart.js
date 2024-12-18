export const cart = localStorage.getItem('cart') || [{
  itemId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
  quantity: 2 
},
{
  itemId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
  quantity: 1
}];

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
}
