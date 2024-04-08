class PriceTable {
    constructor() {
        this.items = {
            'milk': { unitPrice: 3.97, salePrice: { quantity: 2, price: 5.00 } },
            'bread': { unitPrice: 2.17, salePrice: { quantity: 3, price: 6.00 } },
            'banana': { unitPrice: 0.99 },
            'apple': { unitPrice: 0.89 }
        };
    }

    getItemInfo(item) {
        return this.items[item];
    }

    displayPriceChart() {
        console.log('Item     Unit Price        Sale Price');
        console.log('--------------------------------------');
        Object.keys(this.items).forEach(item => {
            const { unitPrice, salePrice } = this.items[item];
            let saleInfo = '';
            if (salePrice && salePrice.quantity && salePrice.price) {
                saleInfo = `(${salePrice.quantity} for $${salePrice.price.toFixed(2)})`;
            }
            console.log(`${item}      $${unitPrice.toFixed(2)}            ${saleInfo}`);
        });
    }
}

module.exports = PriceTable;
