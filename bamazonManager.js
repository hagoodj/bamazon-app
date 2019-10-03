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
    inquirer
        .prompt({
            name: "managerChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add Product", "Quit"]
        })
        .then(function (answer) {
            if (answer.managerChoice === "View Products for Sale") {
                viewProducts();
            } else if (answer.managerChoice === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.managerChoice === "Add to Inventory") {
                addToInventory();
            } else if (answer.managerChoice === "Add Product") {
                addProduct();
            } else {
                console.log("Thanks!")
                connection.end();
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
        });
        table.push(
            ['Product ID', 'Product', 'Department', 'Price', 'Quanity']
        );
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            )
        }
        console.log(table.toString());
        afterConnection();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
        });
        table.push(
            ['Product ID', 'Product', 'Department', 'Price', 'Quanity']
        );
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                table.push(
                    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
                )
            }
        }
        console.log(table.toString());
        afterConnection();
    });
}

function addToInventory() {
    inquirer
        .prompt([{
            name: "productID",
            type: "number",
            message: "What is the ID of the product you would like to add inventory?",
        }, {
            name: "quantity",
            type: "number",
            message: "How much would you like to add to the inventory?",
        }])
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE item_id =?", [parseInt(answer.productID)], function (err, res) {
                if (err) throw err;

                var newQuantity = res[0].stock_quantity + parseInt(answer.quantity);
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
                        console.log("Successfully Added " + answer.quantity + " to " + res[0].product_name + " stock.")
                        afterConnection();
                    }
                );

            })
        });
}

function addProduct() {
    inquirer
        .prompt([{
            name: "product",
            type: "input",
            message: "What is the name of the product you would like to add?",
        }, {
            name: "department",
            type: "list",
            message: "What department does this item belong in?",
            choices: ["Irrelevant", "Unnecessary", "VSCO Girl"]
        }, {
            name: "price",
            type: "number",
            message: "What is the price of this product?",
        }, {
            name: "stock",
            type: "number",
            message: "How many are in the inventory?",
        }])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: answer.product,
                  department_name: answer.department,
                  price: answer.price,
                  stock_quantity: answer.stock
                },
                function(err) {
                  if (err) throw err;
                  console.log("Your product was added successfully!");
                  afterConnection();
                }
              );
        });
}