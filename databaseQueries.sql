/*
Tạo database:
    1. Mở PostgreSQL (bằng trình duyệt) tạo 1 database tên là inventoryonlinedb
    2. Click phải vào database vừa tạo chọn Query Tool
    3. Chép Code sql bên dưới past vào query tool rồi chạy (bao phối bấm nút tam giác)
    4. Xong quay lại đây mở file .env bên backend, nhập user với mật khẩu của postgreSQL đang xài (của thằng nào nhập thằng đó)
        (Nếu ko biết user là gì mở Shell của postgreSQL lên, nhập \l rồi xem ở database vừa tạo cột owner là gì)
*/

CREATE TABLE CUSTOMER (
	customer_id varchar(20) PRIMARY KEY,
	email varchar(30) UNIQUE NOT NULL,
	password varchar(20) NOT NULL,
	fullName varchar(30) NOT NULL,
	birthday date,
	numberPhone varchar(12),
	available boolean DEFAULT true,
	isAdmin boolean DEFAULT false
);

CREATE TABLE WAREHOUSE(
	warehouse_id varchar(20) PRIMARY KEY,
	warehouseName varchar(30) NOT NULL,
	address varchar(50),
	description varchar(100),
	available boolean DEFAULT true,
	customer_id varchar(20) NOT NULL,
	CONSTRAINT WAREHOUSE_customer_id_fkey FOREIGN KEY (customer_id)
    REFERENCES CUSTOMER(customer_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE TYPE (
	type_id varchar(20) PRIMARY KEY,
	typename varchar(30) NOT NULL,
	available boolean DEFAULT true,
	warehouse_id varchar(20) NOT NULL,
	CONSTRAINT TYPE_warehouse_id_fkey FOREIGN KEY (warehouse_id)
    REFERENCES WAREHOUSE(warehouse_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE GOODS(
	goods_id varchar(20) PRIMARY KEY,
	goodsname varchar(30) NOT NULL,
	weight integer,
	description varchar(50),
	costprice bigint DEFAULT 0,
	sellingprice bigint DEFAULT 0,
	inventorynumber int NOT NULL,
	available boolean DEFAULT true,
	warehouse_id varchar(20) NOT NULL,
	CONSTRAINT GOODS_warehouse_id_fkey FOREIGN KEY (warehouse_id)
    REFERENCES WAREHOUSE(warehouse_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	type_id varchar(20),
	CONSTRAINT GOODS_type_id_fkey FOREIGN KEY (type_id)
    REFERENCES TYPE(type_id) MATCH SIMPLE
		ON DELETE NO ACTION
);

CREATE TABLE RECEIVEDNOTE(
	receivednote_id varchar(20) PRIMARY KEY,
	date timestamp NOT NULL,
	available boolean DEFAULT true,
	warehouse_id varchar(20) NOT NULL,
	CONSTRAINT RECEIVEDNOTE_warehouse_id_fkey FOREIGN KEY (warehouse_id)
    REFERENCES WAREHOUSE(warehouse_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE RECEIVEDNOTEDETAIL(
	receivednotedetail_id varchar(20) PRIMARY KEY,
	quantity int DEFAULT 0,
	costprice bigint DEFAULT 0,
	available boolean DEFAULT true,
	goods_id varchar(20) NOT NULL,
	CONSTRAINT RECEIVEDNOTEDETAIL_goods_id_fkey FOREIGN KEY (goods_id)
    REFERENCES GOODS(goods_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	receivednote_id varchar(20) NOT NULL,
	CONSTRAINT RECEIVEDNOTEDETAIL_receivednote_id_fkey FOREIGN KEY (receivednote_id)
    REFERENCES RECEIVEDNOTE(receivednote_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE DELIVERYNOTE(
	deliverynote_id varchar(20) PRIMARY KEY,
	date timestamp NOT NULL,
	available boolean DEFAULT true,
	warehouse_id varchar(20) NOT NULL,
	CONSTRAINT DELIVERYNOTE_warehouse_id_fkey FOREIGN KEY (warehouse_id)
    REFERENCES WAREHOUSE(warehouse_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE DELIVERYNOTEDETAIL(
	deliverynotedetail_id varchar(20) PRIMARY KEY,
	quantity int DEFAULT 0,
	sellingprice bigint DEFAULT 0,
	available boolean DEFAULT true,
	goods_id varchar(20) NOT NULL,
	CONSTRAINT DELIVERYNOTEDETAIL_goods_id_fkey FOREIGN KEY (goods_id)
    REFERENCES GOODS(goods_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	deliverynote_id varchar(20) NOT NULL,
	CONSTRAINT DELIVERYNOTEDETAIL_deliverynote_id_fkey FOREIGN KEY (deliverynote_id)
    REFERENCES DELIVERYNOTE(deliverynote_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

--INSERT INTO CUSTOMER (email, password, fullName, birthday, numberPhone) VALUES ('hieu', '123', 'Trinh Trung Hieu', '04/08/1998', '0947303707')

--DROP DATABASE inventoryonlinedb;
--DROP TABLE TYPE, CUSTOMER, WAREHOUSE, GOODS, DELIVERYNOTE, DELIVERYNOTEDETAIL, RECEIVEDNOTE, RECEIVEDNOTEDETAIL;