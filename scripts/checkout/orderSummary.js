import {cart, removefromCart, getCartQuantity, updateItemQuantity, updateDeliveryOption} from '../../data/cart.js'
import {products} from '../../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions} from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js'
import { renderPaymentSummary } from './priceSummary.js'

export function updatePage() {
  if (cart.length === 0) {
    document.querySelector('.js-main-checkout-section').innerHTML = '<h1>No Item in Your Cart</h1>'
  }

  const cartQuantity = getCartQuantity();
  document.querySelector('.js-total-ckeckout-quantity')
  .innerHTML = cartQuantity === 1? `${cartQuantity} item` : `${cartQuantity} items`;
}

export function renderOrderSummary() {
  let checkoutSummaryHTML = '';

  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (cartItem.itemId === product.id) {
        checkoutSummaryHTML += `<div class="product-container js-product-container-${product.id}">
          <h2>Delivery date: ${getSelectedDelivery(cartItem.deliveryOption)}</h2>
          <div class="product-grid">
            <div class="image-container">
              <img src='${product.image}' alt="" />
            </div>
            <div class="product-info-container">
              <h3>${product.name}</h3>
              <p class="product-price">$${formatCurrency(product.priceCents)}</p>
              <div class="quantity-container">
                <div class='item-quantity'>
                  <p>Quantity: <p>
                  <p class='current-item-quantity js-current-quantity-${product.id}'>${cartItem.quantity}</p>
                </div>
                <button class='js-update-button quantity-container-button' data-update-id=${product.id}>Update</button>
                <div class="update-quantity-container js-update-quantity-${product.id}">
                  <input type="text" class="update-quantity js-input-quantity-${product.id}" min="1" value=${cartItem.quantity} max='10'/>
                  <button class="js-save-button quantity-container-button" data-save-id=${product.id}>Save</button>
                </div>
                <button class='js-delete-item-button quantity-container-button' data-delete-item=${product.id}>Delete</button>
              </div>
            </div>
            <div class="delivery-options">
              <h4>Choose a delivery option:</h4>
              ${generateDeliveryOptions(product.id, cartItem.deliveryOption)}
              </div>
            </div>
          </div>
        </div>`
      }
    })
  });
    if (checkoutSummaryHTML) {
    document.querySelector('.all-products-container')
      .innerHTML = checkoutSummaryHTML;
  }

  document.querySelectorAll('.js-delete-item-button')
  .forEach((deleteButton) => {
    const itemId = deleteButton.dataset.deleteItem
    deleteButton.addEventListener('click', () => {
      removefromCart(itemId)
      document.querySelector(`.js-product-container-${itemId}`).remove()
      updatePage()
      renderPaymentSummary()
    })
  })

  document.querySelectorAll('.js-update-button')
  .forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const updateId = updateButton.dataset.updateId;
      const updatePanel = document.querySelector(`.js-update-quantity-${updateId}`);
      const currentQuantity = document.querySelector(`.js-current-quantity-${updateId}`);

      updatePanel.classList.add('show-update-panel')
      updateButton.classList.add('hide-quantity-update')
      currentQuantity.classList.add('hide-quantity-update')
    })
  })

  document.querySelectorAll('.js-save-button')
  .forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const saveId = saveButton.dataset.saveId;
      const updatePanel = document.querySelector(`.js-update-quantity-${saveId}`);
      const currentQuantity = document.querySelector(`.js-current-quantity-${saveId}`);
      const updateButton = document.querySelector(`[data-update-id="${saveId}"]`)
      const newQuantity = Number(document.querySelector(`.js-input-quantity-${saveId}`).value);
      
      updatePanel.classList.remove('show-update-panel')
      updateButton.classList.remove('hide-quantity-update')
      currentQuantity.classList.remove('hide-quantity-update')

      if (!isNaN(newQuantity)) updateItemQuantity(newQuantity, saveId);
      updatePage()
      renderOrderSummary();
      renderPaymentSummary()
    })
  })

  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOption} = element.dataset;
      updateDeliveryOption(productId, deliveryOption)
      renderOrderSummary()
      renderPaymentSummary()
    })
  });
}

function getSelectedDelivery(deliveryOption) {
  const checkoutDay = dayjs()
  let dateString;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOption) {
      const deliveryDate = checkoutDay.add(option.days, 'day')
      dateString = deliveryDate.format('dddd, MMMM D')
    }
  })
  
  return dateString;
}

function generateDeliveryOptions(itemId, selectedOption) {
  const checkoutDay = dayjs()
  let deliveryOptionsHTML = '';

  deliveryOptions.forEach((option) => {
    const deliveryDate = checkoutDay.add(option.days, 'day')
    const dateString = deliveryDate.format('dddd, MMMM D')
    deliveryOptionsHTML += `
      <div 
      class="delivery-option js-delivery-option"
      data-product-id="${itemId}"
      data-delivery-option="${option.id}">
        <input type="radio" id="" name="delivery-date-${itemId}" ${option.id === selectedOption ? 'checked' : ''}/>
        <label for="">
          <p class="date">${dateString}</p>
          <p>${option.priceCents === 0 ? 'FREE -' : `$${formatCurrency(option.priceCents)} -`} Shipping</p>
        </label>
      </div>
    `
  });
  return deliveryOptionsHTML;
}