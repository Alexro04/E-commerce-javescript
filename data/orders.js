class Order {
  orders
  #localStorageKey

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey
    this.orders = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  #saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orders))
  }

  addToOrders(order) {
    this.orders.unshift(order);
    this.#saveToStorage();
  }

  async generateOrder(cartItems) {
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart: cartItems
      })
    })

    const data = await response.json()
    this.addToOrders(data)
    console.log(this.orders)
  }
}

export const order = new Order('order')