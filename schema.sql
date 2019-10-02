DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price FLOAT(5,2) NULL,
  stock_quantity FLOAT(4,0) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vuvuzela", "Irrelevant", 6.63, 86);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Brass Raffle Drum", "Irrelevant", 166.80, 86);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Armor Sword Wall Hangers", "Irrelevant", 8.64, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Child", "Irrelevant", 143.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cow Bell", "Unnecessary", 13.99, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("American Flag Corn Hole Bags", "Unnecessary", 16.99, 1094);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ladies Pink Tool Set", "Unnecessary", 59.95, 1450);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Horse Decal Sticker", "Unnecessary", 27.99, 3259);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scrunchy: 8 Count", "VSCO Girl", 4.85, 2300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hydro Flask", "VSCO Girl", 44.95, 437);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fjallraven Backpack", "VSCO Girl", 79.03, 67);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Birkenstock Sandals", "VSCO Girl", 24.99, 1256);