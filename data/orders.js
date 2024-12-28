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
    try {
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

    } catch (error) {
      console.log('Could not generate the order', error)
    }
  }

  getOrder(orderId) {
    let matchingOrder;
    this.orders.forEach((currentOrder) => {
      if (currentOrder.id === orderId) {
        matchingOrder = currentOrder
      }
    });
    return matchingOrder
  }

  formatDateString(date) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const deliveryDate = new Date(date)
    return `${months[deliveryDate.getMonth()]} ${deliveryDate.getDay()}`
  }
}

export const order = new Order('order');