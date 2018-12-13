var inquirer = require("inquirer");
var mysql = require("mysql");
require('console.table');


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

function takeOrder() {
    inquirer.prompt([
        {// The first should ask them the ID of the product they would like to buy.
            name: "item",
            message: "What is the item ID of your desired purchase?",
            type: "input",
        }, {// The second message should ask how many units of the product they would like to buy.
            name: "quantity",
            message: "How many would you like to purchase?",
        }
    ]).then((res) => {
        console.log(res);
        // Retrieve quantity from products in sql & compare to customer request
        // If in stock, fulfill customer order / update SQL database to reflect the remaining quantity
        connection.query("SELECT quantity FROM products WHERE product_name = ?", [res.item], (res, data) => {
            if (data.quantity > res.quantity) {
                console.log("Your order has been fulfilled!");
            } // If insufficient quantity!, prevent order
            else if (data.quantity < res.quantity) {
                console.log("Sorry! We only have " + data.quantity + "left.");
            }
            // Once the update goes through, show the customer the total cost of their purchase
            // connection.end();
        })
    })
};


