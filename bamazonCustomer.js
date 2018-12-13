var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayInventory();
});


// first display all of the items available for sale. Include the ids, names, and prices of products for sale.
function displayInventory() {
    connection.query("SELECT itemID, product_name, dept_name, price, quantity FROM ??", ["products"], (err, res) => {
        if (err) throw err;
        console.table(res);
        takeOrder();
    });
}

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function takeOrder() {
    inquirer.prompt([
        {
            name: "item",
            message: "What is the item ID of your desired purchase?",
            type: "input",
        }, {
            name: "quantity",
            message: "How many would you like to purchase?",
        }
    ]).then((res) => {
        console.log(res);
    }
    )
};

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.