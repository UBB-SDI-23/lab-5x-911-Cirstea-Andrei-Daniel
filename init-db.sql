ALTER USER postgres WITH PASSWORD 'postgres';

\c mpp;

CREATE TABLE user_role(
    roleid SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE user_table(
    userid SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    username VARCHAR(255),
    enabled BOOLEAN,
    role_roleid BIGINT
);

CREATE TABLE user_profile(
    user_profileid SERIAL PRIMARY KEY,
    birthday TIMESTAMP(6),
    description VARCHAR(255),
    gender VARCHAR(255),
    location VARCHAR(255),
    phone_number VARCHAR(255),
    user_id BIGINT
);

CREATE TABLE car_model (
    carid SERIAL PRIMARY KEY,
    description VARCHAR(255),
    fuel_consumption BIGINT,
    manufacture_year BIGINT,
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    price BIGINT,
    userid_fk BIGINT
);

CREATE TABLE customer (
    customerid SERIAL PRIMARY KEY,
    email_address VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    priority VARCHAR(255),
    telephone_number VARCHAR(255),
    userid_fk BIGINT
);

CREATE TABLE distributor(
    distributorid SERIAL PRIMARY KEY,
    category VARCHAR(255),
    contact_email VARCHAR(255),
    cooperation_start_date TIMESTAMP(6),
    country VARCHAR(255),
    name VARCHAR(255),
    userid_fk BIGINT
);

CREATE TABLE purchase(
    purchaseid_pk SERIAL PRIMARY KEY,
    date TIMESTAMP(6),
    pay_method VARCHAR(255),
    status VARCHAR(255),
    customerid_fk BIGINT,
    userid_fk BIGINT
);

CREATE TABLE shipment(
    shipmentid SERIAL PRIMARY KEY,
    arrival TIMESTAMP(6),
    expected_arrival TIMESTAMP(6),
    total_price INT,
    distributorid_fk BIGINT,
    userid_fk BIGINT
);

CREATE TABLE cars_on_purchase(
    cars_on_purchaseid SERIAL PRIMARY KEY,
    count INT,
    priority INT,
    car_modelid_fk BIGINT,
    purchaseid_fk BIGINT,
    userid_fk BIGINT
);

CREATE TABLE entries_per_page(
    entries_per_page_id SERIAL PRIMARY KEY,
    value INT
);


CREATE SEQUENCE car_model_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE cars_on_purchase_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE distributor_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE entries_per_page_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE customer_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE purchase_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE shipment_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE user_profile_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE user_role_seq START WITH 51 INCREMENT BY 50;
CREATE SEQUENCE user_table_seq START WITH 1 INCREMENT BY 50;

INSERT INTO entries_per_page VALUES(0, 10);
INSERT INTO user_role VALUES (0, 'ROLE_REGULAR'), (1, 'ROLE_MODERATOR'), (2, 'ROLE_ADMIN');
INSERT INTO user_table VALUES
                           (30000, 'andrei1@gmail.com', '$2a$10$mdzJjengqmtMd2nv4wr39uv0/HGIzZEx7wYPKIBOLVGeaXk7iwD0.', 'Andrei1', TRUE, 0),
                           (30001, 'andrei2@gmail.com', '$2a$10$Gltz6dsmYRPZsz1eM2SdeeNPPja9WQcnOlZkYEDhDmqs8luWmhOHG', 'Andrei2', TRUE, 1);
                           (30002, 'andrei3@gmail.com', '$2a$10$LaczdTMJOIM187rdEAeOL.LocJ2Cfbm8WaxTWZt/fshZSTykS3tQi', 'Andrei3', TRUE, 2);