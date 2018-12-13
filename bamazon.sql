DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  itemID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  dept_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL
);


INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("TV", "Electronics", "400.00", 4);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Dog Leash", "Pet Goods", 15.00, 15);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Wine Glasses", "Home Goods", 10.00, 20);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Guitar", "Instruments", 500.00, 3);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Decorative Pillows", "Home Goods", 30.00, 3);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Benefit Cheek Pallete", "Beauty", 45.00, 30);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("iPhone 10", "Electronics", "800.00", 10);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Garden House", "Home Goods", 40.00, 14);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Christmas Tree", "Seasonal", 80.00, 20);

INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("Shampoo", "Beauty", 5.00, 20);

SELECT * FROM products;
