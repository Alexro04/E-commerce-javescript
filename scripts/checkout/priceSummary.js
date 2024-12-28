import {cart} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js'
import { order } from '../../data/orders.js';

export async function renderPaymentSummary() {
  const allPrices = await calculatePrices(cart.cartItems);
  const cartQuantity = cart.getCartQuantity()

  const priceSummaryHTML = `
    <h3>Order Summary</h3>
    <div class="order-summary">
      <div class="items-shipping">
        <div class="order-cost">
          <p>items (${cartQuantity}):</p>
          <p>$${formatCurrency(allPrices.allItemsPriceCents)}</p>
        </div>
        <div class="order-cost">
          <p>Shipping & handling:</p>
          <p>$${formatCurrency(allPrices.allItemsShippingCents)}</p>
        </div>
      </div>
      <div class="tax-cost">
        <div class="order-cost">
          <p class="total-b4-tax">Total before tax:</p>
          <p class="overline">$${formatCurrency(allPrices.totalBeforeTaxCents)}</p>
        </div>
        <div class="order-cost">
          <p>Estimated tax (10%):</p>
          <p>$${formatCurrency(allPrices.taxCents)}</p>
        </div>
      </div>
    </div>
    <div class="order-cost order-total">
      <p>Order total:</p>
      <p>$${formatCurrency(allPrices.totalAfterTaxCents)}</p>
    </div>
    <button class="place-order-button js-place-order-button">Place your order</button>
  `
  const orderSummary = document.querySelector('.order-sumary-section');
  if (orderSummary) orderSummary.innerHTML = priceSummaryHTML;

  const placeOrder = document.querySelector('.js-place-order-button')
  if (placeOrder) {
    placeOrder.addEventListener('click', async () => {
      await order.generateOrder(cart.cartItems)
      cart.clearCart();
      window.location.href = 'orders.html';
    })
  }

}

async function calculatePrices(cartItems) {
  let allItemsPriceCents = 0;
  let allItemsShippingCents = 0;
  for (const cartItem of cartItems) {
    const product = await getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOption);
    const itemPriceCents = product.priceCents * cartItem.quantity;
    const itemShippingCents = deliveryOption.priceCents;
    
    allItemsPriceCents += itemPriceCents;
    allItemsShippingCents += itemShippingCents;
  };

  const totalBeforeTaxCents = allItemsPriceCents + allItemsShippingCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalAfterTaxCents = totalBeforeTaxCents + taxCents

  return {allItemsPriceCents, allItemsShippingCents, totalBeforeTaxCents, taxCents, totalAfterTaxCents}
}