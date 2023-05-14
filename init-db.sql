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
    is_enabled BOOLEAN,
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

INSERT INTO entries_per_page VALUES(0, 10);
INSERT INTO user_role VALUES (0, 'ROLE_REGULAR'), (1, 'ROLE_MODERATOR'), (2, 'ROLE_ADMIN');