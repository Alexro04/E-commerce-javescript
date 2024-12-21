import {cart, getCartQuantity} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js'

export function renderPaymentSummary() {
  const allPrices = calculatePrices();
  const cartQuantity = getCartQuantity()

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
    <button class="place-order-button">Place your order</button>
  `
  const orderSummary = document.querySelector('.order-sumary-section');
  if (orderSummary) orderSummary.innerHTML = priceSummaryHTML;

}

function calculatePrices() {
  let allItemsPriceCents = 0;
  let allItemsShippingCents = 0;
  cart.forEach(cartItem => {
    const product = getProduct(cartItem.itemId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOption);
    const itemPriceCents = product.priceCents * cartItem.quantity;
    const itemShippingCents = deliveryOption.priceCents;
    
    allItemsPriceCents += itemPriceCents;
    allItemsShippingCents += itemShippingCents;
  });

  const totalBeforeTaxCents = allItemsPriceCents + allItemsShippingCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalAfterTaxCents = totalBeforeTaxCents + taxCents

  return {allItemsPriceCents, allItemsShippingCents, totalBeforeTaxCents, taxCents, totalAfterTaxCents}
}