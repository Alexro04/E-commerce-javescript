class Product {
  id
  image
  name
  rating
  priceCents

  constructor(productDetails) {
    this.id = productDetails.id
    this.image = productDetails.image
    this.name = productDetails.name
    this.rating = productDetails.rating
    this.priceCents = productDetails.priceCents
  }
  getStarRating() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `${(this.priceCents / 100).toFixed(2)}`
  }
}

export async function getProduct(productId) {
  let matchingProduct;
  await loadProductFetch();
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product
    }
  })
  return matchingProduct;
}

export let products;

export async function loadProductFetch() {
  if(!products) {
    try {
      const fetchProduct = await fetch('../backend/products.json')
      const data = await fetchProduct.json()
      
      products = data.map((product) => {
        return new Product(product)
      })

    } catch (error) {
      console.log('Data could not be fetched from backend', error)
    }
  }
}