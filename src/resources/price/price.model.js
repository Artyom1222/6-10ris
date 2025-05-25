export class Price {
  constructor({ scheduleId, priceValue, priceCurrency }) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.scheduleId = scheduleId;
    this.priceValue = priceValue;
    this.priceCurrency = priceCurrency;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(priceData) {
    this.priceValue = priceData.priceValue || this.priceValue;
    this.priceCurrency = priceData.priceCurrency || this.priceCurrency;
    this.updatedAt = new Date();
  }
}
