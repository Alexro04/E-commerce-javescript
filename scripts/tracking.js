import { getProduct } from "../data/products.js";
import { order } from '../data/orders.js';
import { cart } from '../data/cart.js'

const presentUrl = new URL(window.location.href);
const orderId = presentUrl.searchParams.get('orderId');
const productId = presentUrl.searchParams.get('productId');

updateCartQuantity()
loadPage()

async function loadPage() {
  const product = await getProduct(productId)
  const currentOrder = order.getOrder(orderId)
  let quantity;

  currentOrder.products.forEach(currentProduct => {
    if (currentProduct.productId === product.id) {
      quantity = currentProduct.quantity
    }
  });

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${order.formatDateString(currentOrder.orderTime)}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      <img class="product-image" src="${product.image}">
    </div>

    <div class="product-info">
      Quantity: ${quantity}
    </div>
    
    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `

  document.querySelector('.order-tracking')
    .innerHTML = trackingHTML;

}

function updateCartQuantity() {
  const cartQuantity = cart.getCartQuantity();
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity===0 ? '' : cartQuantity;

}
