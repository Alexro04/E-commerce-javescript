import {renderOrderSummary, updatePage} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/priceSummary.js'
import {loadProductFetch} from '../data/products.js'

async function loadPage() {
  await loadProductFetch()

  updatePage()
  renderPaymentSummary()
  renderOrderSummary()
}

loadPage()




