/*
Tạo database:
    1. Mở PostgreSQL (bằng trình duyệt) tạo 1 database tên là inventoryonlinedb
    2. Click phải vào database vừa tạo chọn Query Tool
    3. Chép Code sql bên dưới past vào query tool rồi chạy (bao phối bấm nút tam giác)
    4. Xong quay lại đây mở file .env bên backend, nhập user với mật khẩu của postgreSQL đang xài (của thằng nào nhập thằng đó)
        (Nếu ko biết user là gì mở Shell của postgreSQL lên, nhập \l rồi xem ở database vừa tạo cột owner là gì)
*/

CREATE TABLE CUSTOMER (
	customer_id serial PRIMARY KEY,
	email varchar(30) UNIQUE NOT NULL,
	password varchar(20) NOT NULL,
	fullname varchar(30) NOT NULL,
	birthday date,
	numberphone varchar(12),
	available boolean DEFAULT true,
	isAdmin boolean DEFAULT false
);

CREATE TABLE WAREHOUSE(
	warehouse_id serial PRIMARY KEY,
	warehousename varchar(30) NOT NULL,
	address varchar(50),
	description varchar(100),
	available boolean DEFAULT false,
	customer_id integer NOT NULL,
	CONSTRAINT WAREHOUSE_customer_id_fkey FOREIGN KEY (customer_id)
    REFERENCES CUSTOMER(customer_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE TYPE (
	type_id serial PRIMARY KEY,
	typename varchar(30) NOT NULL,
	available boolean DEFAULT false
);

CREATE TABLE GOODS(
	goods_id serial PRIMARY KEY,
	goodsname varchar(30) NOT NULL,
	weight integer,
	description varchar(50),
	costprice bigint DEFAULT 0,
	sellingprice bigint DEFAULT 0,
	inventorynumber int NOT NULL,
	warehouse_id integer NOT NULL,
	CONSTRAINT GOODS_warehouse_id_fkey FOREIGN KEY (warehouse_id)
    REFERENCES WAREHOUSE(warehouse_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	type_id integer NOT NULL,
	CONSTRAINT GOODS_type_id_fkey FOREIGN KEY (type_id)
    REFERENCES TYPE(type_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE RECEIVEDNOTE(
	receivednote_id serial PRIMARY KEY,
	date timestamp NOT NULL,
	warehouse_id integer NOT NULL,
	CONSTRAINT RECEIVEDNOTE_warehouse_id_fkey FOREIGN KEY (warehouse_id)
    REFERENCES WAREHOUSE(warehouse_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE RECEIVEDNOTEDETAIL(
	receivednotedetail_id serial PRIMARY KEY,
	quantity int DEFAULT 0,
	sellingprice bigint DEFAULT 0,
	goods_id integer NOT NULL,
	CONSTRAINT RECEIVEDNOTEDETAIL_goods_id_fkey FOREIGN KEY (goods_id)
    REFERENCES GOODS(goods_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE DELIVERYNOTE(
	deliverynote_id serial PRIMARY KEY,
	quantity int NOT NULL,
	date timestamp NOT NULL,
	warehouse_id integer NOT NULL,
	CONSTRAINT DELIVERYNOTE_warehouse_id_fkey FOREIGN KEY (warehouse_id)
    REFERENCES WAREHOUSE(warehouse_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	goods_id integer NOT NULL,
	CONSTRAINT DELIVERYNOTE_goods_id_fkey FOREIGN KEY (goods_id)
    REFERENCES GOODS(goods_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE DELIVERYNOTEDETAIL(
	deliverynotedetail_id serial PRIMARY KEY,
	quantity int DEFAULT 0,
	sellingprice bigint DEFAULT 0,
	goods_id integer NOT NULL,
	CONSTRAINT RECEIVEDNOTEDETAIL_goods_id_fkey FOREIGN KEY (goods_id)
    REFERENCES GOODS(goods_id) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

--DROP TABLE TYPE, CUSTOMERS, WAREHOUSE, GOODS, DELIVERYNOTE, DELIVERYNOTEDETAIL, RECEIVEDNOTE, RECEIVEDNOTEDETAIL;