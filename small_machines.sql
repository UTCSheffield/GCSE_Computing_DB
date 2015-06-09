CREATE OR REPLACE TABLE stock (stockid INTEGER PRIMARY KEY ASC, name STRING, max INTEGER);
INSERT INTO stock (name, max, taken) VALUES ("Crawler", 10);
INSERT INTO stock (name, max, taken) VALUES ("Hoist", 20);
INSERT INTO stock (name, max, taken) VALUES ("Mini Digger", 30);
INSERT INTO stock (name, max, taken) VALUES ("Turn Table", 40);
INSERT INTO stock (name, max, taken) VALUES ("Platform Lift", 50);
SELECT * FROM stock;

CREATE OR REPLACE TABLE users (userid INTEGER PRIMARY KEY ASC, username STRING, fullname STRING);
INSERT INTO users (username) VALUES ("test");
SELECT * FROM users;

CREATE OR REPLACE TABLE sales (  saleid INTEGER PRIMARY KEY ASC,
                        userid INTEGER,
                        stockid INTEGER,
                        quantity INTEGER
                        );
                        
INSERT INTO sales (userid, stockid, quantity)  VALUES (1, 1, 8);

SELECT * FROM sales;

SELECT stockid, stock.name as name, stock.max, SUM(sale.quantity) as sold, stock.max - SUM(booking.quantity) as available FROM sales JOIN stock ON stockid;   
