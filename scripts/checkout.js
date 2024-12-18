import {cart} from '../data/cart.js'
import {products} from '../data/products.js'

let checkoutSummaryHTML;

cart.forEach((cartItem) => {
  products.forEach((product) => {
    if (cartItem.itemId === product.id) {
    checkoutSummaryHTML += `<div class="product-container">
      <h2>Delivery date: Tuesday, June 21</h2>
      <div class="product-grid">
        <div class="image-container">
          <img src='${product.image}' alt="" />
        </div>
        <div class="product-info-container">
          <h3>${product.name}</h3>
          <p class="product-price">$10.90</p>
          <div class="quantity-container">
            <p>Quantity: ${cartItem.quantity}</p>
            <button>Update</button>
            <button>Delete</button>
          </div>
        </div>
        <div class="delivery-options">
          <h4>Choose a delivery option:</h4>
          <div class="delivery-option">
            <input type="radio" id="" name="delivery-date-${product.id}"/>
            <label for="">
              <p class="date">Tuesday, June 21</p>
              <p>FREE Shipping</p>
            </label>
          </div>
          <div class="delivery-option">
            <input type="radio" id="" name="delivery-date-${product.id}"/>
            <label for="">
              <p class="date">Tuesday, June 21</p>
              <p>FREE Shipping</p>
            </label>
          </div>
          <div class="delivery-option">
            <input type="radio" id="" name="delivery-date-${product.id}"/>
            <label for="">
              <p class="date">Tuesday, June 21</p>
              <p>FREE Shipping</p>
            </label>
          </div>
        </div>
      </div>
    </div>`
}
})

});
console.log(checkoutSummaryHTML)

document.querySelector('.all-products-container').innerHTML = checkoutSummaryHTML; 
