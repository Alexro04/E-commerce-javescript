export const deliveryOptions = [{
  id: '1',
  days: 7,
  priceCents: 0
},
{
  id: '2',
  days: 3,
  priceCents: 599
},
{
  id: '3',
  days: 1,
  priceCents: 1099
}]

export function getDeliveryOption(deliveryOptionId) {
  let matchingOption;
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId) {
      matchingOption = deliveryOption
    }
  })
  return matchingOption;
}