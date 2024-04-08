const PriceTable = require('./PriceTable');
const PurchaseManager = require('./PurchaseManager');
const UserInterface = require('./UserInterface');

// Usage
const priceTable = new PriceTable();
priceTable.displayPriceChart();

const purchaseManager = new PurchaseManager(priceTable);

const ui = new UserInterface(purchaseManager, priceTable);

ui.promptInput();
