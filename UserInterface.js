const readline = require('readline');

class UserInterface {
    constructor(purchaseManager, priceTable) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.purchaseManager = purchaseManager;
        this.priceTable = priceTable;
    }


    validateItems(items) {
        const invalidItems = [];
        items.forEach(item => {
            if (!this.priceTable.getItemInfo(item)) {
                invalidItems.push(item);
            }
        });
        return invalidItems;
    }

    promptInput() {
        this.rl.question('Please enter all the items purchased separated by a comma: ', (input) => {
            // Validate items
            const items = input.split(',').map(item => item.trim());
            const invalidItems = this.validateItems(items);
            if (invalidItems.length > 0) {
                console.log('Invalid items: ' + invalidItems.join(', '));
                this.rl.close();
                return;
            }

            const { purchaseDetails, totalPrice, savedAmount } = this.purchaseManager.processPurchase(input);
            this.displayReceipt(purchaseDetails, totalPrice, savedAmount);
            this.rl.close();
        });
    }

    displayReceipt(purchaseDetails, totalPrice, savedAmount) {
        console.log('\nItem     Quantity      Price');
        console.log('--------------------------------------');
        purchaseDetails.forEach(({ item, quantity, price }) => {
            console.log(`${item}      ${quantity}            $${price.toFixed(2)}`);
        });
        console.log('\nTotal price : $' + totalPrice.toFixed(2));
        console.log(`You saved $${savedAmount.toFixed(2)} today.`);
    }
}

module.exports = UserInterface;
