create table stock (stockid INTEGER PRIMARY KEY ASC, name STRING, max INTEGER, taken INTEGER);
insert into stock (name, max, taken) VALUES ("Crawler", 10, 0);
insert into stock (name, max, taken) VALUES ("Hoist", 20, 0);
insert into stock (name, max, taken) VALUES ("Mini Digger", 30, 0);
insert into stock (name, max, taken) VALUES ("Turntable", 40, 0);
insert into stock (name, max, taken) VALUES ("Platform Lift", 50, 0);
select * from stock;
