DROP TABLE stock; 
CREATE TABLE stock (
    stockid INTEGER PRIMARY KEY ASC, -- ASC = Ascending, starts at 1 and goes up each time 
    name STRING, 
    max INTEGER
);
INSERT INTO stock (name, max) VALUES ("Crawler", 10); -- We let the ASC bit workout the stockid for us
INSERT INTO stock (name, max) VALUES ("Hoist", 20);
INSERT INTO stock (name, max) VALUES ("Mini Digger", 30);
INSERT INTO stock (name, max) VALUES ("Turn Table", 40);
INSERT INTO stock (name, max) VALUES ("Platform Lift", 50);

DROP TABLE users;
CREATE TABLE users (
    userid INTEGER PRIMARY KEY ASC, 
    username STRING, 
    fullname STRING
);
INSERT INTO users (username) VALUES ("test", "Mr Trevor Test");

DROP TABLE sales;
CREATE TABLE sales (  saleid INTEGER PRIMARY KEY ASC,
    userid INTEGER,
    stockid INTEGER,
    quantity INTEGER
    );
                        
INSERT INTO sales (userid, stockid, quantity)  VALUES (1, 1, 8);

