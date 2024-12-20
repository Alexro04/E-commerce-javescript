import {cart, addToCart, getCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js'

let allProducts = '';

function updateCartQuantity() {
  const cartQuantity = getCartQuantity();
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity===0 ? '' : cartQuantity;

}

updateCartQuantity();

products.forEach((product) => {
  allProducts += `
    <div class="store-item">
      <div class="store-item-info">
        <div class="item-image-container">
          <img src=${product.image} alt="" class="item-image">
        </div>
        <p class="item-name">${product.name}</p>
        <div class="rating">
          <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="">
          <p>${product.rating.count}</p>
        </div>
        <p class="item-cost">$${(product.priceCents / 100).toFixed(2)}</p>
        <select name="" id="" class="select-number js-product-quantity" data-select-product-id=${product.id}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="add-to-cart-section">
        <div class="added-to-cart" data-added-product-id=${product.id}>
          <img src="images/icons/check-icon.png" alt="added to cart">
          <p>Added to cart</p>
        </div>
        
        <button class="add-to-cart js-add-to-cart" data-product-id=${product.id}>Add to cart</button>
      </div>
    </div>
  `
});

document.getElementById('js-products-grid').innerHTML = allProducts;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.productId;
      const addedToCart = document.querySelector(`[data-added-product-id="${itemId}"]`)
      
      addToCart(itemId)
      updateCartQuantity()

      addedToCart.classList.add('display-added')
      setTimeout(() => {
        addedToCart.classList.remove('display-added')
      }, 800)
    })
  })

