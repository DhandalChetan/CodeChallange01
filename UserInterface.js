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

    promptInput() {
        this.rl.question('Please enter all the items purchased separated by a comma: ', (input) => {
            const items = input.split(',').map(item => item.trim());

            // Validate items
            const invalidItems = this.validateItems(items);
            if (invalidItems.length > 0) {
                console.log('Invalid items: ' + invalidItems.join(', '));
                this.rl.close();
                return;
            }
            this.purchaseManager.processPurchase(input);
            this.rl.close();
        });
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
}

module.exports = UserInterface;
