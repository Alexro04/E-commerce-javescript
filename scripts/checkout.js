import {renderOrderSummary, updatePage} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/priceSummary.js'
import {loadProducts, loadProductFetch} from '../data/products.js'

Promise.all([
 loadProductFetch(),
]).then(() => {
  updatePage()
  renderPaymentSummary()
  renderOrderSummary()
})



