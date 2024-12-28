import { order } from '../data/orders.js'
import { getProduct } from '../data/products.js'
import { formatCurrency } from '../scripts/utils/money.js'
import { cart } from '../data/cart.js'

updateCartQuantity()
renderOrders(order.orders)

async function renderOrders(orders) {
  let allOrdersHTML = '';

  for (const singleOrder of orders) {
    const productHTML = await generateProducts(singleOrder.products, singleOrder.id)
    allOrdersHTML += `
      <div class="order-placed-container">
        <div class="orders-info-container">
          <div class="date-and-total">
            <div class="orders-info">
              <p class="title">Order Placed:</p>
              <p>${order.formatDateString(singleOrder.orderTime)}</p>
            </div>
            <div class="orders-info">
              <p class="title">Total:</p>
              <p>${formatCurrency(singleOrder.totalCostCents)}</p>
            </div>
          </div>
          <div class="orders-info">
            <p class="title">Order ID:</p>
            <p>${singleOrder.id}</p>
          </div>
        </div>

        <div class="order-detail-grid">
          ${productHTML}
        </div>
      </div>
    `
  }

  document.querySelector('.js-all-orders-container')
    .innerHTML = allOrdersHTML;

  document.querySelectorAll('.js-buy-again-button')
    .forEach((buyAgainButton) => {
      buyAgainButton.addEventListener('click', () => {
        const productId = buyAgainButton.dataset.productId;
        cart.addToCart(productId, 1);
        updateCartQuantity();
        window.location.href = `checkout.html#${productId}`;
      })
    })
}


async function generateProducts(products, orderId) {
  let allProductsHTML = '';

  for (const product of products) {
    const productItem = await getProduct(product.productId);
    allProductsHTML += `
      <div class="products-container">
        <div class="product-image-container">
          <img src="${productItem.image}" alt="">
        </div>
        <div class="product-info-container">
          <div class="product-info">
            <h2 class="product-name">${productItem.name}</h2>
            <p class="product-arrival-date">
              Estimated Arrival on: ${order.formatDateString(product.estimatedDeliveryTime)}
            </p>
            <p class="product-quantity">Quantity: ${product.quantity}</p>
            <button class="buy-again-button js-buy-again-button" data-product-id=${product.productId}>
              <img src="images/icons/buy-again.png" alt="">
              Buy it again
            </button>
          </div>
          <a href='tracking.html?orderId=${orderId}&productId=${product.productId}'>
            <button class="track-package-button">Track package</button>
          </a>
        </div>
      </div>
    `;
  }
  return allProductsHTML;
}

function updateCartQuantity() {
  const cartQuantity = cart.getCartQuantity();
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity===0 ? '' : cartQuantity;

}