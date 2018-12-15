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
    connection.query("SELECT itemID, product_name, dept_name, price, quantity FROM ??", ["products"], (err, data) => {
        if (err) throw err;
        console.table(data);
        takeOrder();
    });
}

function takeOrder() {
    inquirer.prompt([
        {// The first should ask them the ID of the product they would like to buy.
            name: "itemID",
            message: "What is the item ID of your desired purchase?",
            type: "input",
        }, {// The second message should ask how many units of the product they would like to buy.
            name: "quantity",
            message: "How many would you like to purchase?",
            type: "input"
        }
    ]).then((answer) => {
        connection.query("SELECT quantity FROM products WHERE itemID = ?", [answer.itemID], (err, data) => {
            if (err) throw err;
            console.log(data[0])
            if (data[0].quantity > answer.quantity) {
                var total = (answer.quantity * data[0].itemID.price);
                console.log(`Your transaction is complete! Your total is ${total}`);
                var updateQ = (data[0].quantity - answer.quantity);
                // console.log(updateQ);
                connection.query(`UPDATE products SET quantity = ? WHERE itemID = ?;`, [updateQ, answer.itemID], (err, data) => {
                    if (err) throw err;
                    else {
                        takeOrder();
                    }
                });

            } else if (data[0].quantity < answer.quantity) {
                console.log(`Sorry! We only have ${data[0].quantity} in stock.`)
                takeOrder();
            }

        })

    })
}