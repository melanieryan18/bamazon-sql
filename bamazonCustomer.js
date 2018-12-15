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
            console.log(answer.itemID)
            console.log(answer.quantity)
            if (data.quantity > answer.quantity) {
                purchase();
            } else if (data.quantity < answer.quantity) {
                console.log("Sorry! We only have " + data.quantity + "left.");
            }

        })
    })
}
        // function purchase() {
        //     var total = data.price * answer.item.quantity;
        //     console.log("Your purchase is complete! Your total balance is " + total);
        //     connection.query("UPDATE products WHERE item ID = ? quantity ?",
        //     if (err) throw err;
        //     [
        //         {
        //             quantity: answer.quantity
        //         },
        //         {
        //             id: answer.itemID
        //         }
        //     ],
