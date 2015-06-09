DROP TABLE stock;
CREATE TABLE stock (stockid INTEGER PRIMARY KEY ASC, name STRING, max INTEGER);
INSERT INTO stock (name, max) VALUES ("Crawler", 10);
INSERT INTO stock (name, max) VALUES ("Hoist", 20);
INSERT INTO stock (name, max) VALUES ("Mini Digger", 30);
INSERT INTO stock (name, max) VALUES ("Turn Table", 40);
INSERT INTO stock (name, max) VALUES ("Platform Lift", 50);
SELECT * FROM stock;

DROP TABLE users;
CREATE TABLE users (userid INTEGER PRIMARY KEY ASC, username STRING, fullname STRING);
INSERT INTO users (username) VALUES ("test");
SELECT * FROM users;

DROP TABLE sales;
CREATE TABLE sales (  saleid INTEGER PRIMARY KEY ASC,
                        userid INTEGER,
                        stockid INTEGER,
                        quantity INTEGER
                        );
                        
INSERT INTO sales (userid, stockid, quantity)  VALUES (1, 1, 8);
SELECT * FROM sales;

SELECT stock.stockid, stock.name as name, stock.max, SUM(sales.quantity) as sold, stock.max - SUM(sales.quantity) as available FROM sales JOIN stock ON(stock.stockid = sales.stockid)  GROUP BY stock.stockid;
