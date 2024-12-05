let allProducts = '';

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
        <select name="" id="" class="select-number js-product-quantity" data-product-id=${product.id}>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>
      </div>

      <div class="add-to-cart-section">
        <p class="added-to-cart">Added to cart</p>
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
      let sameProduct;

      cart.forEach((product) => {
        if (product.itemId === itemId) {
          product.quantity += 1;
          sameProduct = true;
        }
      });

      if (!sameProduct) {
        cart.push({
          itemId,
          quantity: 1
        })
      }
      console.log(cart)

      let cartQuantity = 0;
      cart.forEach((product) => {
        cartQuantity += product.quantity
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity


    })
  })