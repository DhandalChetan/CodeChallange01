class PurchaseManager {
    constructor(priceTable) {
        this.priceTable = priceTable;
    }

    processPurchase(input) {
        const items = input.split(',').map(item => item.trim());
        const itemCount = {};

        items.forEach(item => {
            itemCount[item] = (itemCount[item] || 0) + 1;
        });

        const purchaseDetails = [];

        Object.keys(itemCount).forEach(item => {
            const quantity = itemCount[item];
            const price = this.calculatePrice(item, quantity);
            purchaseDetails.push({ item, quantity, price });
        });

        const totalPrice = purchaseDetails.reduce((acc, curr) => acc + curr.price, 0);
        const savedAmount = this.calculateSavedAmount(items);

        return { purchaseDetails, totalPrice, savedAmount };
    }
   

    calculatePrice(item, quantity) {
        const { unitPrice, salePrice } = this.priceTable.getItemInfo(item);
        if (salePrice && salePrice.quantity && salePrice.price) {
            const saleQuantity = Math.floor(quantity / salePrice.quantity);
            const remainingQuantity = quantity % salePrice.quantity;
            return saleQuantity * salePrice.price + remainingQuantity * unitPrice;
        }
        return quantity * unitPrice;
    }

    calculateSavedAmount(items) {
        let totalSaved = 0;
        items.forEach(item => {
            const { unitPrice, salePrice } = this.priceTable.getItemInfo(item);
            if (salePrice && salePrice.quantity && salePrice.price) {
                const saleQuantity = Math.floor(items.filter(i => i === item).length / salePrice.quantity);
                totalSaved += (items.filter(i => i === item).length - saleQuantity * salePrice.quantity) * unitPrice;
            }
        });
        return totalSaved;
    }
}

module.exports = PurchaseManager;
