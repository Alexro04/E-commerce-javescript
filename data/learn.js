export function loadProductFetch() {
  const fetchProduct = fetch('../').then((response) => {
    return response.json()
  }).then((data) => {
    products = data.map((productDetails) => {
      return new Product(productDetails)
    });
  })

  return fetchProduct
}

export function loadProducts(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      return new Product(productDetails)
    });
    func()
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products')
  xhr.send()
}