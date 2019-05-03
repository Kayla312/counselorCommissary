DROP DATABASE IF EXISTS commissary_db;
CREATE database commissary_db;

USE commissary_db;

CREATE TABLE products (
  ID INT AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100)NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (10) NOT NULL,
  PRIMARY KEY (ID)
);

-- ALTER TABLE products,
-- DROP index;
SELECT * FROM  products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
 ("Trail Mix", "Snacks", 1.50, 100),
 ("Sun Screen", "First Aid", 9.89, 35),
 ("Water Bottle", "Essentials", 15.00, 40),
 ("Pencils", "Utensils", 0.50, 500), 
 ("Cards Home", "Utensils", 1.50, 130), 
 ("Back Pack", "Essentials", 35.55, 20),
 ("Bandages", "First Aid", 0.10, 1000), 
 ("Tweezers", "First Aid", 2.00, 20),
 ("Hairl Ties", "Utensils", 2.00, 15), 
 ("Stickers", "Essentials", 0.10, 5000);