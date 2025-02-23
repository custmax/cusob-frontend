declare module Price {
  type PriceItem = {
    id: number,
    createTime: string,
    updateTime: string,
    name: string,
    contactCapacity: number,
    emailCapacity: number,
    currency: number,
    priceUSD: number,
    discountUSD: number,
    amountUSD: number,
    priceEUR: number,
    discountEUR: number,
    amountEUR: number,
    priceHKD: number,
    discountHKD: number,
    amountHKD: number,
    priceJPY: number,
    discountJPY: number,
    amountJPY: number,
    months: number,
    isAvailable: number,
  }
}