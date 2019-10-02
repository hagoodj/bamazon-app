var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Product ID | Product Name | Department | Price | Stock")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
        }
        product();
    });
}

function product() {
    inquirer
        .prompt([{
            name: "productID",
            type: "number",
            message: "What is the ID of the product you would like to buy?",
        }, {
            name: "quantity",
            type: "number",
            message: "How many would you like?",
        }])
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE item_id =?", [parseInt(answer.productID)], function (err, res) {
                if (err) throw err;
                if (parseInt(answer.quantity) > res[0].stock_quantity) {
                    console.log("Insufficient Quantity")
                    console.log('*******************************************************************************************')
                    afterConnection();
                } else {
                    var newQuantity = res[0].stock_quantity - parseInt(answer.quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: answer.productID
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Successfully purchased " + answer.quantity + " " + res[0].product_name)
                            console.log('*******************************************************************************************')
                            afterConnection();
                        }
                    );
                }
            })
        });
}